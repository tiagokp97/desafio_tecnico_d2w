from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity
from ..service.user_service import *
from ..service.item_service import *
main = Blueprint('main', __name__)
from flask_jwt_extended import jwt_required, unset_jwt_cookies
from typing import Tuple, Union
from ..validations.item_validations import  validate_id, validate_item_creation, validate_userId_from_body
from ..validations.user_validations import validate_register, validate_login

@main.route('/')
def hello():
    return {'working': 'true'}

@main.route('/register', methods=['POST'])
def register(): 
    data = request.get_json() 
    email = data.get('email')
    password = data.get('password')

    validation_error = validate_register(data)
    if validation_error:
        return validation_error

    return UserService.register_user(email, password)

@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    validation_error = validate_login(data)
    if validation_error:
        return validation_error

    return UserService.login_user(email, password)

@main.route('/logout', methods=['POST'])
def logout():
    resp = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(resp)
    return resp, 200

@main.route('/items', methods=['GET'])
@jwt_required()  
def get_items() -> Tuple[str, int]:
    current_user_id = get_jwt_identity()
    items = ItemService.get_all_items(user_id=current_user_id)

    return jsonify([item.as_dict() for item in items]), 200

@main.route('/items/<int:item_id>', methods=['GET'])
@jwt_required()  
def get_item(item_id: int) -> Tuple[str, int]:
    item = ItemService.get_item_by_id(item_id)
    if item is None:
        return jsonify({"error": "Item not found"}), 404
    return jsonify(item.as_dict()), 200

@main.route('/items', methods=['POST'])
@jwt_required()  
def create_new_item() -> Tuple[str, int]:
    data = request.get_json()
    title = data.get('title')
    user_id = data.get('userId')
    description = data.get('description')

    user_validation = validate_id(data)
    if user_validation:
        return jsonify(user_validation[0]), user_validation[1]

    validation_error = validate_item_creation(data)
    if validation_error:
        return validation_error
    
    item = ItemService.create_item(title, user_id, description)
    return jsonify(item.as_dict()), 201

@main.route('/items/<int:item_id>', methods=['PUT'])
@jwt_required()  
def update_existing_item(item_id) -> Tuple[str, int]:
    item = ItemService.get_item_by_id(item_id)
    if item is None:
        return jsonify({"error": "Item not found"}), 404
    data = request.get_json()

    user_validation = validate_userId_from_body(item)
    if user_validation:
        return jsonify(user_validation[0]), user_validation[1]
    
    validation_error = validate_item_creation(data)
    if validation_error:
        return validation_error

    title = data.get('title')
    description = data.get('description')
    completed = data.get('completed')
    updated_fields = ItemService.update_item(item, title, description, completed)

    if updated_fields:
        return jsonify(updated_fields), 200
    else:
        return jsonify({"message": "No fields were updated"}), 200

@main.route('/items_status/<int:item_id>', methods=['PATCH'])
@jwt_required()  
def update_status(item_id) -> Tuple[str, int]:
    item = ItemService.get_item_by_id(item_id)
    if item is None:
        return jsonify({"error": "Item not found"}), 404

    data = request.get_json()
    updated_field = ItemService.update_item_status(item, data)
    if updated_field:
        return jsonify(updated_field), 200
    else:
        return jsonify({"message": "No fields were updated"}), 200

@main.route('/items/<int:item_id>', methods=['DELETE'])
@jwt_required()  
def delete_existing_item(item_id: int) -> Union[jsonify, Tuple[jsonify, int]]:
    item = ItemService.get_item_by_id(item_id)
    if item is None:
        return jsonify({"error": "Item not found"}), 404
    ItemService.soft_delete_item(item)
    return jsonify({"message": "Item deleted successfully"}), 204

@main.route('/error')
def error_page():
    raise ValueError("This is a value error.")

@main.errorhandler(404)
def page_not_found(e):
    return jsonify({"error": "404 - Page not found"}), 404

@main.errorhandler(500)
def internal_server_error(e):
    return jsonify({"error": "500 - Internal Server Error"}), 500

@main.errorhandler(ValueError)
def handle_value_error(e):
    return jsonify({"error": str(e)}), 400



