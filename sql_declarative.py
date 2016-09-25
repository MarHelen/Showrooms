from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from map_project import db

app = Flask(__name__)
app.config.from_pyfile('config.py')

from sqlalchemy import create_engine, Column, Integer, String
 
from sqlalchemy.ext.declarative import declarative_base
 
from sqlalchemy.orm import sessionmaker, scoped_session

engine = create_engine('postgresql://helen:password@localhost:5432/showroom')
 
#Declare an instance of the Base class for mapping tables
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()



#GoogleMaps(app)

class Showroom(db.Model):
    __tablename__ = 'showrooms'
    id = db.Column('showroom_id', db.Integer, primary_key=True)
    #showroom description field
    title = db.Column('title',db.String(60))
    description = db.Column('description', db.String)
    pourpose_type = db.Column('pourpose_type', db.String(15)) #choise from 'mixed', 'men' 'women' 'children', 'decor/design'
    #location block
    address = db.Column('address', db.String(100))
    location_lat = db.Column(db.Float)
    location_lng = db.Column(db.Float)
    #placeID is sufficient identifier for place location, we dont need coordinates any more
    placeId = db.Column('placeId', db.String(450))
    #working hours
    open_hour = db.Column('Open_hours', db.String(15)) #need rework
    close_hour = db.Column('Close_hours', db.String(15)) #need rework

    #social links block
    link_fb = db.Column(db.String(100))
    link_inst = db.Column(db.String(100))
    link_vk = db.Column(db.String(100))

    def __init__(self, title, text, pourpose, address, lat, lng, open_h, close_h, fb, inst, vk, placeid=None ):
        self.title = title
        self.description = text
        self.pourpose_type = pourpose
        self.address = address
        self.location_lat = lat
        self.location_lng = lng
        self.open_hour = open_h
        self.close_hour = close_h
        self.link_fb = fb
        self.link_inst = inst
        self.link_vk = vk
        self.placeId = placeid


    @property
    def serialize(self):
       """Return object data in easily serializeable format"""
       return {
           'title'         : self.title,
           'description'   : self.description,
           'pourpose_type' : self.pourpose_type,
           'address'       : self.address,
           'location_lat'  : self.location_lat,
           'location_lng'  : self.location_lng,
           'open_h'        : self.open_hour,
           'close_h'       : self.close_hour,
           'link_fb'       : self.link_fb,
           'link_inst'     : self.link_inst,
           'link_vk'       : self.link_vk,
           'placeId'       : self.placeId
       }

def init_db():
    Base.metadata.create_all(bind=engine)
    s = Showroom('Nameli', 'Showroom Nameli', 'women', 'Bohdana Khmelnytskoho vulytsia, 50, Kyiv, Ukraine', '50.447599', '30.5066', '12:00PM', '9:00PM', 
        'https://www.facebook.com/namelishowroom/', 'http://instagram.com/nameli_showroom', '-',
        'ChIJe-0xrljO1EAR-Hb4yXbXoNM')
    db.session.add(s)
    db.session.commit()
 