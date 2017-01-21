from flask import Flask, render_template, jsonify, request
import json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder="templates")
from sql_declarative import db, Showroom

#from flask_oauth import OAuth

"""app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
  """     
import facebook

#from facebook import GraphAPI, get_connections

graph = facebook.GraphAPI(access_token='314614308897367|pd6XzgFTKRFPb7kP_Zzu9v_0wbk', version="2.7")


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
 
class Post:
	def __init__(self, message, link):
		self.message = message
		self.link = link


 #rendering a detaills page for called placeId 
@app.route('/<showroom_id>')
def details(showroom_id):
	#collecting recent posts from the page facebook
	#profile = graph.get_object(showroom_id)
	#shop_details = graph.get_connections(id='/namelishowroom/', connection_name='posts')
	posts_json = graph.get_object(id='/'+showroom_id+'/', fields="posts.limit(12){message,link,full_picture}")
	#posts = json.loads(posts_json).keys()[0]
	di = []
	print (posts_json)

	for post in posts_json[u'posts'][u'data']:
		print post
		item = {
		'message'      : post[u'message'],
		'link'         : post[u'link'].encode('utf-8'),
		'id'           : post[u'id'].encode('utf-8'),
		'full_picture' : post[u'full_picture'].encode('utf-8'),
		}
		#json.dumps(item)
		#print item
		#print post[u'message']
		di.append(item)
	#print di
	#search for showroom db record with specified id, choose the last
	item = Showroom.query.filter(Showroom.placeId == showroom_id).first()
	#calling for serialization method
	if item:
		item = item.serialize
    #fb_url = '/' + Showroom.placeId + '/';
    #posts = graph.get_connections(Showroom.placeId, 'posts.limit(21){message,link}')
	return render_template('details.html', place=item, posts=map(json.dumps, di) ) #, fb_key=)


if __name__ == "__main__":
	db.create_all()
	db.session.commit()
	app.run(host='0.0.0.0', debug=True)
