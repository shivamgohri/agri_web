from __future__ import division, print_function
import sys
import os
import glob
import re
import numpy as np
from PIL import Image
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer
import cv2
import numpy
import time
from matplotlib import pyplot as plt
import pylab
from scipy import ndimage
from flask import *
import pyrebase
from flask_mail import Mail, Message


#firebase configuration
config = {
	"apiKey": "AIzaSyBQVW2cu5Pq0XOMCw-fp3bgN5J6RUqccIQ",
    "authDomain": "smart-agriculture-deloitte.firebaseapp.com",
    "databaseURL": "https://smart-agriculture-deloitte.firebaseio.com",
    "projectId": "smart-agriculture-deloitte",
    "storageBucket": "smart-agriculture-deloitte.appspot.com",
    "messagingSenderId": "160791402712",
    "appId": "1:160791402712:web:62f160343cf6058fa8dfad",
    "measurementId": "G-55EWCWWDVJ"
}

#firebase init
firebase = pyrebase.initialize_app(config)

#flask init
app = Flask(__name__)

#Flask-mail setup
app.config.update(
    DEBUG=True,
    #EMAIL SETTINGS
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME = 'smartagriculturedeloitte@gmail.com',
    MAIL_PASSWORD = 'deloitteintelliJ'
    )
mail = Mail(app)

#port init
port = int(os.getenv('PORT', 8000))



####################ROUTES####################################


@app.route('/')
def default():
	return home()


#ERROR HANDLER
@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html")


@app.errorhandler(500)
def page_error(e):
    return render_template("500.html")

@app.route('/favicon.ico')
def send_icon():
    return app.send_static_file("favicon.ico")


#Static routes
@app.route('/live')
def live():
    return render_template("live.html")

@app.route('/home')
def home():
	return render_template("home.html")

@app.route('/login')
def login():
	return render_template("login.html")

@app.route('/logs')
def logs():
	return render_template("logs.html")

@app.route('/weather')
def weather():
	return render_template("weather.html")

@app.route('/guides')
def guides():
	return render_template("guides.html")


#mail route
@app.route('/sendmail', methods=['GET', 'POST'])
def send_mail():
    if request.method == 'POST':
        mailId = request.args.get('id')
        #message body
        msg = Message("Logs Data : Smart AGRI !",
              sender = "smartagriculturedeloitte@gmail.com",
              recipients = [mailId, "smartagriculturedeloitte@gmail.com"])
        msg.body = "Hey {}, \n \nAttached pdf consists of all the Logs Data as requested by you. \nWe are really happy to connect with you. Have a great day. \n \nIf you are encountering any issue, please write to us at smartagriculturedeloitte@gmai.com \n \nRegards, \nSmart AGRI".format(mailId)  
        curr = os.getcwd()
        response = download_pdf()

        if response == 0:
            result = {
                'success': 0
            }
            return result

        with open(curr+"/files/logs.pdf",'rb') as p:
            msg.attach(filename="logs.pdf",disposition="attachment",content_type="application/pdf",data=p.read())       
        mail.send(msg)

        ans = {
            'success': 1
        }
        return ans
    return None

#weed routes
@app.route('/weed', methods=['GET'])
def weedindex():
    return render_template('weedIndex.html')


@app.route('/predictweed', methods=['GET', 'POST'])
def weedupload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'weed_uploads', secure_filename(f.filename))
        f.save(file_path)
        print(file_path)

        # Make prediction
        preds = weed(file_path)
        print(preds)

        # Process your result for human
        # pred_class = preds.argmax(axis=-1)            # Simple argmax
        #pred_class = decode_predictions(preds, top=1)   # ImageNet Decode
        #result = str(pred_class[0][0][1])               # Convert to string
        return preds
    return None


#pests routes
@app.route('/pest', methods=['GET'])
def pestindex():
    return render_template('pestIndex.html')


@app.route('/predictpest', methods=['GET', 'POST'])
def pestupload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'pest_uploads', secure_filename(f.filename))
        f.save(file_path)
        print(file_path)

        # Make prediction
        preds = detect_pest(file_path)

        # Process your result for human
        # pred_class = preds.argmax(axis=-1)            # Simple argmax
        #pred_class = decode_predictions(preds, top=1)   # ImageNet Decode
        #result = str(pred_class[0][0][1])               # Convert to string
        return preds
    return None


#testcases routes
@app.route('/pesttest', methods=['GET'])
def getpestresult():
    if request.method == 'GET':
        number = request.args.get('id')
        path = r'static/pest_testcases/{}.jpg'.format(number)
        preds = detect_pest(path)
        return preds
    return None


@app.route('/weedtest', methods=['GET'])
def getweedresult():
    if request.method == 'GET':
        number = request.args.get('id')
        path = r'static/weed_testcases/{}.jpg'.format(number)
        preds = weed(path)
        return preds
    return None


#data routes
@app.route('/getdata', methods=['POST'])
def getData():
	if request.method == 'POST':
		label = request.args.get('data')
		if label == "air":
			airqualitydata = firebase.database().child("Air-Quality").get()
			ans = airqualitydata.val()
			return ans

		if label == "ph":
			phdata = firebase.database().child("Soil-pH").get()
			ans = phdata.val()
			return ans

		if label == "moisture":
			moisturedata = firebase.database().child("Soil-Moisture").get()
			ans = moisturedata.val()
			return ans

		if label == "temperature":
			temperaturedata = firebase.database().child("Temperature").get()
			ans = temperaturedata.val()
			return ans

		if label == "humidity":
			humiditydata = firebase.database().child("Humidity").get()
			ans = humiditydata.val()
			return ans

		if label == "date":
			datedata = firebase.database().child("Date-Time").get()
			ans = datedata.val()
			return ans

		if label == "disease":
			diseasedata = firebase.database().child("Camera-Data-Analysis").child("Disease-Detection").get()
			ans = diseasedata.val()
			return ans

		if label == "texture":
			texturedata = firebase.database().child("Camera-Data-Analysis").child("Soil-Texture").get()
			ans = texturedata.val()
			return ans

		if label == "weed":
			weeddata = firebase.database().child("Camera-Data-Analysis").child("Weed&PestsDetection").get()
			ans = weeddata.val()
			return ans

		if label == "yield":
			yielddata = firebase.database().child("Camera-Data-Analysis").child("Yield-Prediction").get()
			ans = yielddata.val()
			return ans
	return None



#####################FUNCTIONS##################################


#weed functions
def detect_weed(img_path):
    img = cv2.imread(img_path)
    width, height = Image.open(img_path).size
    total_pixels = width*height
    #cv2_imshow(img)
    gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    #cv2_imshow(gray_image)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    #cv2_imshow(hsv)
    mask = cv2.inRange(hsv,(36, 0, 0), (86, 255, 255) )
    #cv2_imshow(mask)
    arr = numpy.ones([5,5],numpy.uint8)
    img_erosion = cv2.erode(mask, arr, iterations=1)
    #cv2_imshow(img_erosion)
    img_dilation = cv2.dilate(img_erosion, arr, iterations=1)
    n_white_pix = numpy.sum(img_dilation == 255)
    print('Number of white pixels:', n_white_pix)
    if n_white_pix >= 15000:
        asd=1
    else:
        asd=0
    return [asd, n_white_pix, total_pixels]


def weed(img_path):
    x = detect_weed(img_path); time.sleep(3)
    y=detect_weed(img_path); time.sleep(3)
    suma=[x[0]+y[0],max(x[1],y[1]), max(x[2], y[2])]

    if suma[0]>=1:
        res={
        'num': int(suma[1]),
        'text':"Presence of weed found",
        'total' : int(suma[2])
        }
    else:
        res={
        'num': int(suma[1]),
        'text':"Weed not found",
        'total': int(suma[2])
        }

    print(res)
    return res


#pests functions
def conversion(img_path):
    #os.system()
    image = cv2.imread(img_path)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    cv2.imwrite('gray_image.png',gray_image)
    #cv2_imshow(image)
    #cv2_imshow(gray_image)
    cv2.waitKey(0)                 # Waits forever for user to press any key
    cv2.destroyAllWindows()

def gaussian():
    image = cv2.imread('gray_image.png')
    cv2.getGaussianKernel(9,9)
    blur= cv2.GaussianBlur(image,(5,5),0)
    cv2.imwrite('blur.png',blur)
    #cv2_imshow(blur)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def averagefilter():
    image=cv2.imread('blur.png')
    kernel=np.ones((5,5),np.float32)/25
    dst= cv2.filter2D(image,-1,kernel)
    #plt.subplot(121),plt.imshow(image),plt.title('blur')
    #plt.xticks([]), plt.yticks([])
    #plt.subplot(122),plt.imshow(dst),plt.title('averaged')
    #plt.xticks([]), plt.yticks([])
    #plt.show()
    cv2.imwrite('averaged.png',dst)

def segmentation():
    image = cv2.imread('averaged.png')
    gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(gray,0,255,cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
    cv2.imwrite('thresh_image.jpg',thresh)
    #cv2_imshow(thresh)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

     # noise removal
    kernel = np.ones((3,3),np.uint8)
    opening = cv2.morphologyEx(thresh,cv2.MORPH_OPEN,kernel, iterations = 3)
    #cv2_imshow(thresh)
    cv2.waitKey(0)                 # Waits forever for user to press any key
    cv2.destroyAllWindows()


    # sure background area
    sure_bg = cv2.dilate(opening,kernel,iterations=3)
    #cv2_imshow(sure_bg)
    cv2.waitKey(0)                 # Waits forever for user to press any key
    cv2.destroyAllWindows()
    print ("No. of pests in the image: ")
    labelarray, particle_count = ndimage.measurements.label(sure_bg)
    print (particle_count)
    return particle_count


def detect_pest(img_path):
    conversion(img_path)
    array = detect_weed(img_path)
    gaussian()
    averagefilter()
    count = segmentation()

    res = {
        'text': "No. of Pest Detected ",
        'count': int(count),
        'num': int(array[1]),
        'total': int(array[2])
    }

    return res

#mail function
def download_pdf():
    storage = firebase.storage()
    curr = os.getcwd()
    try:
        storage.child('logs.pdf').download( curr + "/files/logs.pdf")
        return 1
    except:
        return 0


####################INITIALIZE###########################

if __name__ == "__main__":
  app.run(port=port, debug=False, threaded=False)
