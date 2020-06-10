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
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
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

#picId declare
pestPicId = 0
weedPicId = 0



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

#disease routes
@app.route('/disease')
def disease():
    return "Will be added soon"

#weed routes
@app.route('/weed', methods=['GET'])
def weed():
    return render_template('weedIndex.html')


@app.route('/predictweed', methods=['GET', 'POST'])
def weedupload():
    if request.method == 'POST':
        global weedPicId
        weedPicId += 1

        if weedPicId!=1:
            tempId = weedPicId - 1
            path = 'static/results'
            tempname = 'w_graph_{}.jpg'.format(tempId)
            os.remove(os.path.join(path , tempname))

        f = request.files['file']
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'weed_uploads', secure_filename(f.filename))
        f.save(file_path)
        preds = weed(file_path)
        os.remove(file_path)
        return jsonify(preds)
    return None


#pests routes
@app.route('/pest', methods=['GET'])
def pest():
    return render_template('pestIndex.html')


@app.route('/predictpest', methods=['GET', 'POST'])
def pestupload():
    if request.method == 'POST':
        global pestPicId
        pestPicId += 1

        if pestPicId!=1:
            tempid = pestPicId - 1
            path = 'static/results'
            tempname1 = 'p_graph_{}.jpg'.format(tempid)
            tempname2 = 'p_subplot_{}.jpg'.format(tempid)
            os.remove(os.path.join(path , tempname2))
            os.remove(os.path.join(path , tempname1))

        f = request.files['file']
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'pest_uploads', secure_filename(f.filename))
        f.save(file_path)
        preds = detect_pest(file_path)
        os.remove(file_path)
        return preds
    return None


#testcases routes
@app.route('/pesttest', methods=['GET'])
def getpestresult():
    if request.method == 'GET':
        global pestPicId
        pestPicId += 1

        if pestPicId!=1:
            tempid = pestPicId - 1
            path = 'static/results'
            tempname1 = 'p_graph_{}.jpg'.format(tempid)
            tempname2 = 'p_subplot_{}.jpg'.format(tempid)
            os.remove(os.path.join(path , tempname2))
            os.remove(os.path.join(path , tempname1))

        number = request.args.get('id')
        path = r'static/pest_testcases/{}.jpg'.format(number)
        preds = detect_pest(path)
        return preds
    return None


@app.route('/weedtest', methods=['GET'])
def getweedresult():
    if request.method == 'GET':
        global weedPicId
        weedPicId += 1

        if weedPicId!=1:
            tempId = weedPicId - 1
            path = 'static/results'
            tempname = 'w_graph_{}.jpg'.format(tempId)
            os.remove(os.path.join(path , tempname))

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
    gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv,(36, 0, 0), (86, 255, 255) )
    arr = numpy.ones([5,5],numpy.uint8)
    img_erosion = cv2.erode(mask, arr, iterations=1)
    img_dilation = cv2.dilate(img_erosion, arr, iterations=1)
    n_white_pix = numpy.sum(img_dilation == 255)

    if n_white_pix >= 15000:
        asd=1
    else:
        asd=0
    return [asd, n_white_pix, total_pixels]


def weed(img_path):
    global weedPicId
    x = detect_weed(img_path); time.sleep(3)
    y=detect_weed(img_path); time.sleep(3)
    suma=[x[0]+y[0],max(x[1],y[1]), max(x[2], y[2])]

    print(suma)

    y_units=[suma[1],suma[2]]
    x_units=[1,2]
    labels=['White pixels','Total pixels']
    plt.bar(x_units,y_units,tick_label=labels,width=0.4,align='center',color=['blue','green'])
    plt.xlabel('x - axis')
    plt.ylabel('Number of pixels')
    path = 'static/results'
    name = 'w_graph_{}.jpg'.format(weedPicId)
    plt.savefig(os.path.join(path , name),bbox_inches='tight')
    plt.clf()
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    if suma[0]>=1:
        res={
            'id': int(weedPicId),
            'num': int(suma[1]),
            'text':"Presence of weed found",
            'total' : int(suma[2])
        }
    else:
        res={
            'id': int(weedPicId),
            'num': int(suma[1]),
            'text':"Weed not found",
            'total': int(suma[2])
        }

    print(res)
    return res


#pests functions
def conversion(img_path):
    image = cv2.imread(img_path)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    cv2.waitKey(0)                 
    cv2.destroyAllWindows()
    return gray_image

def gaussian(gray_image):
    cv2.getGaussianKernel(9,9)
    blur= cv2.GaussianBlur(gray_image,(5,5),0)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    return blur

def averagefilter(blur):
    kernel=np.ones((5,5),np.float32)/25
    dst= cv2.filter2D(blur,-1,kernel)
    path = 'static/results'
    cv2.imwrite(os.path.join(path , 'averaged.jpg'), dst)

def segmentation():
    global pestPicId
    path = 'static/results'
    image = cv2.imread(os.path.join(path , 'averaged.jpg'))
    width,height=Image.open(os.path.join(path , 'averaged.jpg')).size
    total=width*height
    gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(gray,0,255,cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
    os.remove(os.path.join(path , 'averaged.jpg'))

    plt.subplot(121),plt.imshow(image),plt.title('Grayscale\nImage')
    plt.xticks([]), plt.yticks([])
    plt.subplot(122),plt.imshow(thresh),plt.title('Processed\nImage')
    plt.xticks([]), plt.yticks([])
    name = 'p_subplot_{}.jpg'.format(pestPicId)
    plt.savefig(os.path.join(path , name),bbox_inches='tight')
    plt.clf()
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    kernel = np.ones((3,3),np.uint8)
    opening = cv2.morphologyEx(thresh,cv2.MORPH_OPEN,kernel, iterations = 3)
    cv2.waitKey(0)                   
    cv2.destroyAllWindows()
    sure_bg = cv2.dilate(opening,kernel,iterations=3)
    num=np.sum(sure_bg == 255)
    cv2.waitKey(0)                 
    cv2.destroyAllWindows()
    y_units=[num,total]
    x_units=[1,2]
    labels=['White pixels','Total pixels']
    plt.bar(x_units,y_units,tick_label=labels,width=0.4,align='center',color=['blue','green'])
    plt.xlabel('x - axis')
    plt.ylabel('Number of pixels')
    name = 'p_graph_{}.jpg'.format(pestPicId)
    plt.savefig(os.path.join(path , name),bbox_inches='tight')
    plt.clf()
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    labelarray, particle_count = ndimage.measurements.label(sure_bg)
    return [particle_count,num,total]

def detect_pest(img_path):
    gray_image = conversion(img_path)
    blur = gaussian(gray_image)
    averagefilter(blur)
    array=segmentation()
    global picId
    res = {
        'id': int(pestPicId),
        'text': "No. of Pest Detected ",
        'count': int(array[0]),
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
