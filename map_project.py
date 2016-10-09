from flask import Flask, render_template, jsonify, request
#from flask_googlemaps import GoogleMaps
#from flask_googlemaps import Map

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder="templates")
db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/showroom'

from sql_declarative import Showroom
"""app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
  """     

@app.route("/")
def mapview():
	query = "all"
	return render_template('index.html' ) 

@app.route("/db_details", methods=["POST","GET"])
def get_places(request="all"):
	if request is None:
		return []
	#requesting all shopping places in the db
	result = []
	#showroom = Showroom.query.all()
	#for place in showroom:
	#	result.append(place.serialize())
	#return jsonify(result = result)
	return jsonify(result=[i.serialize for i in Showroom.query.all()])
 

#@app.route('/<place.placeId>')
#def details(place):
#	return render_template(details.html, place=place)
#	#return(HTML_TEMPLATE.substitute(place_name=place_name))


if __name__ == "__main__":
	db.create_all()
	db.session.commit()
	app.run(debug=True)
