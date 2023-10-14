from typing import Union, Dict, Tuple
from flask_jwt_extended import get_jwt_identity


def validate_id(data: Dict[str, str]) -> Union[None, Tuple[Dict[str, str], int]]:
    
    user_id_from_request = data.get('userId')
    current_user_id = get_jwt_identity()

    if not user_id_from_request or not isinstance(user_id_from_request, str):
        return {"error": "The user_id parameter is required."}, 400
    
    if str(current_user_id) != str(user_id_from_request):
        return {"error": "User ID from token does not match User ID in the request"}, 401

    return None

def validate_userId_from_body(data: Dict[str, str]) -> Union[None, Tuple[Dict[str, str], int]]:
    
    current_user_id = get_jwt_identity()
    print('userid', data.user_id)

    if not data.user_id or not isinstance(data.user_id, int):
        return {"error": "The user_id parameter is required."}, 400
    
    if str(current_user_id) != str(data.user_id):
        return {"error": "User ID from token does not match User ID in the request"}, 401

    return None



def validate_string_size(field: str, value: str, max_size: int, min_size: int = None) -> Union[None, Tuple[Dict[str, str], int]]:
    if value:
        if len(value) > max_size:
            return {"error": f"{field} exceeds {max_size} characters"}, 400
        if min_size is not None and len(value) < min_size:
            return {"error": f"{field} must be at least {min_size} characters"}, 400
    return None

def validate_item_creation(data: Dict[str, str]) -> Union[None, Tuple[Dict[str, str], int]]:
    title = data.get('title')
    description = data.get('description')
    completed = data.get('completed')

    if title is None:
        return {"error": "The title parameter is required."}, 400

    if not isinstance(title, str) or len(title) > 100 or len(title) < 3:
        return {"error": "Invalid title. It must be a string between 3 and 100 characters."}, 400

    if description and (not isinstance(description, str) or len(description) > 500):
        return {"error": "Invalid description. It must be a string with maximum 500 characters."}, 400

    if completed is not None and completed not in [0, 1]:
        return {"error": "Invalid completed status. It must be either 0 or 1."}, 400

    error = validate_string_size("Title", title, 100, min_size=3)
    if error:
        return error

    error = validate_string_size("Description", description, 500)
    if error:
        return error

    return None

