from flask import Flask
from .model.model import db
from .controller.controller import main
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from flask_migrate import Migrate  

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES', 3600))
    
    db.init_app(app)  
    jwt = JWTManager(app)  

    Migrate(app, db)  

    app.register_blueprint(main)  
    CORS(app) 

    return app
