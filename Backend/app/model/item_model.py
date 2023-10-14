from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from .model import db   
from sqlalchemy.dialects.mysql import TINYINT
from datetime import datetime
from typing import List, TypedDict
from sqlalchemy import DateTime
import pytz


def current_time():
    sao_paulo_tz = pytz.timezone('America/Sao_Paulo')
    return datetime.now(sao_paulo_tz)

class ItemDict(TypedDict):
    id: int
    title: str
    description: str
    completed: int
    user_id: int

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False) 
    description = db.Column(db.String(500))  
    completed = db.Column(TINYINT(1) , default=0)  
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    created_at = db.Column(DateTime, default=current_time)
    updated_at = db.Column(DateTime, default=current_time, onupdate=current_time)
    finished_at = db.Column(DateTime, default=current_time, onupdate=current_time)
    deleted_at = db.Column(DateTime)

    def __init__(self, title, user_id, description=None, ):
        self.title = title
        self.user_id = user_id
        self.description = description

    def as_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'finished_at': self.finished_at,
            'user_id': self.user_id
        }


