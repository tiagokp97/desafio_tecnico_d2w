from ..model.item_model import Item
from ..model.model import db
from ..utils.time import time_now


class ItemService:
    @staticmethod
    def create_item(title, user_id, description=None):
        item = Item(title=title, user_id=user_id, description=description)
        db.session.add(item)
        db.session.commit()
        return item

    @staticmethod
    def get_all_items(user_id: int):
        return Item.query.filter(Item.deleted_at.is_(None), Item.user_id == user_id).all()

    @staticmethod
    def get_item_by_id(item_id):
        return Item.query.filter_by(id=item_id, deleted_at=None).first()

    @staticmethod
    def update_item(item, title, description=None, completed=0):
        updated_fields = {}

        if title != item.title:
            item.title = title
            updated_fields['title'] = title

        if description != item.description:
            item.description = description
            updated_fields['description'] = description

        if completed != item.completed:
            item.completed = completed
            updated_fields['completed'] = completed


        item.updated_at = time_now()
        db.session.commit()

        return updated_fields

    @staticmethod
    def update_item_status(item, completed):
        updated_field = {}

        if completed != item.completed:
            item.completed = completed
            updated_field['completed'] = completed
            
        item.finished_at = time_now()
        db.session.commit()
        return updated_field

    @staticmethod
    def soft_delete_item(item):
        item.deleted_at = time_now()
        db.session.commit()
