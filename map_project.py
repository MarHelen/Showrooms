from flask import Flask, render_template, jsonify, request
import json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder="templates")
from sql_declarative import db, Showroom

from apiclient.discovery import build

from flask_cache import Cache

cache = Cache(app, config={'CACHE_TYPE': 'redis'})

from config import FB_KEY, GOOGLE_KEY

"""app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
  """     
import facebook

graph = facebook.GraphAPI(access_token=FB_KEY, version="2.7")


@app.route("/")
@cache.cached(timeout=600) # 10 minutes
def mapview():
	query = "all"
	return render_template('index.html' ) 

"""building showroom list according to called request""" 
@app.route("/db_details", methods=["POST","GET"])
@cache.cached(timeout=600) # 10 minutes
def get_places(request="all"):
	if request is None:
		return []
	
	#requesting all shopping places in the db
	if request == "all":
	    showroom = Showroom.query.all() #.order_by(Showroom.placeId)
	else: 
	    showroom = NULL

	return jsonify(result=[i.serialize for i in showroom])


 #rendering a details page for called placeId 
@app.route('/<showroom_id>')
@cache.cached(timeout=86400) # 24 h
def details(showroom_id):
	#collecting recent posts from the page facebook


	posts_json = graph.get_object(id='/'+showroom_id+'/', fields="posts.limit(12){message,link,full_picture}")
	di = []

    #Google translation block
	target_language = 'en'
	service = build('translate','v2',developerKey=GOOGLE_KEY)
	collection = service.translations()

	for post in posts_json[u'posts'][u'data']:
		request = collection.list(q=post[u'message'], target=target_language)
		response = request.execute()
		item = {
		'message'       : post[u'message'],
		'message_trans' : (response['translations'][0])['translatedText'],
		'link'          : post[u'link'].encode('utf-8'),
		'id'            : post[u'id'].encode('utf-8'),
		'full_picture'  : post[u'full_picture'].encode('utf-8'),
		}

		print (response['translations'][0])['translatedText']

		di.append(item)

	#search for showroom db record with specified id, choose the last
	item = Showroom.query.filter(Showroom.placeId == showroom_id).first()
	#calling for serialization method
	#if item:
	#	item = item.serialize


	return render_template('details.html', place=item.serialize, posts=map(json.dumps, di) ) 


if __name__ == "__main__":
	db.create_all()
	db.session.commit()
	app.run(host='0.0.0.0', debug=True)
