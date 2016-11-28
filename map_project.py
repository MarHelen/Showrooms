from flask import Flask, render_template, jsonify, request

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder="templates")
from sql_declarative import db, Showroom
"""app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
  """     

@app.route("/")
def mapview():
	query = "all"
	return render_template('index.html' ) 

"""building showroom list according to called request""" 
@app.route("/db_details", methods=["POST","GET"])
def get_places(request="all"):
	if request is None:
		return []
	
	#requesting all shopping places in the db
	if request == "all":
	    showroom = Showroom.query.all() #.order_by(Showroom.placeId)
	else: 
	    showroom = NULL

	return jsonify(result=[i.serialize for i in showroom])
 
  
 #rendering a detaills page for called placeId 
 
@app.route('/<showroom_id>')
def details(showroom_id):
	#search for showroom db record with specified id, choose the last
	item = Showroom.query.filter(Showroom.placeId == showroom_id).first()
	#calling for serialization method
        if (item):
            item = item.serialize

	return render_template('details.html', place=item) #, fb_key=)


if __name__ == "__main__":
	db.create_all()
	db.session.commit()
	app.run(host='0.0.0.0', debug=True)
