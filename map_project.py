from flask import Flask, render_template, jsonify, request

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder="templates")

from sql_declarative import db, Showroom

from apiclient.discovery import build

from flask_cache import Cache

cache = Cache(app, config={'CACHE_TYPE': 'redis'})

from config import FB_KEY, GOOGLE_KEY
   
import facebook, json

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


"""
 This is view function for details page
 Here are collected all posts from Facebook API and serialized to list of jsons to pass them to the client side 
"""
@app.route("/<showroom_id>")
def details(showroom_id):

	di = get_posts(showroom_id)

	#search for showroom db record with specified id, choose the last
	item = Showroom.query.filter(Showroom.placeId == showroom_id).first()

	return render_template('details.html', place=item.serialize, posts=map(json.dumps, di) ) 


@app.route("/about", methods=["GET"])
def about_page():
	return render_template('about.html' ) 

"""
In this function collected all posts from Facebook API response, got translations with get_translations()
and created list of jsons with posts info
The function cached to redis with Flask-Cache for 24h
"""
@cache.memoize(timeout=86400) # 24 h
def get_posts(showroom):
	#requesting facebook API for showroom posts with message, link, full_picture
	posts = graph.get_object(id='/'+showroom+'/', fields="posts.limit(12){message,link,full_picture}")
	di = []

	#if request failed return empty dictionary
	if u'error' in posts:
	#need to add logging
		return di

	#if the key data is not empty, traverse all the posts inside
	for post in posts[u'posts'][u'data']:
		post_message_trans = ''
		post_message = ''
		post_picture = ''

		if u'message' in post:
			post_message = post[u'message']
			post_message_trans = get_translation(post_message,'en')
		

		if u'full_picture' in post:
			post_picture = post[u'full_picture']
		#if there is no link in post, item is being skipped
		if u'link' in post:
			item = {
			'message'       : post_message,
			'message_trans' : post_message_trans,
			'link'          : post[u'link'],
			'id'            : post[u'id'],
			'full_picture'  : post_picture,
		}

		di.append(item)

	return di


"""
This method implements requesting to GOOGLE translate API to get English of Ukrainian and Russuian post messages
"""
def get_translation(message,target_language):
	
	service = build('translate','v2',developerKey=GOOGLE_KEY)
	collection = service.translations()
	request = collection.list(q=message, target=target_language)
	response = request.execute()
	post_message_trans = (response['translations'][0])['translatedText']

	return post_message_trans

if __name__ == "__main__":
	db.create_all()
	db.session.commit()
	app.run(host='0.0.0.0', debug=True)
