from flask import *

app = Flask(__name__, static_folder="templates/static", template_folder="templates")


@app.route('/')
def default():
	return home()


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

if __name__ == "__main__":
  app.run()
