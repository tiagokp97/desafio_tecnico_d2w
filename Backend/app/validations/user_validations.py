from typing import Union, Dict, Tuple
import re

def validate_email(field: str, value: str) -> Union[None, Tuple[Dict[str, str], int]]:
    if value is None:
        return {"error": f"The {field} field must be provided"}, 400

    email_regex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"

    if not re.match(email_regex, value):
        return {"error": f"{field} is not a valid email address"}, 400

    return None

def validate_password_size(field: str, value: str, min_size: int) -> Union[None, Tuple[Dict[str, str], int]]:
    if value is None:
        return {"error": f"The {field} field must be provided"}, 400

    if not isinstance(value, str):
        return {"error": f"{field} must be a string"}, 400

    if len(value) < min_size:
        return {"error": f"{field} must be at least {min_size} characters long"}, 400

    return None

def validate_register(data: Dict[str, str]) -> Union[None, Tuple[Dict[str, str], int]]:
    email = data.get('email')
    password = data.get('password')

    error = validate_email("Email", email)
    if error:
        return error

    error = validate_password_size("Password", password, 8)
    if error:
        return error

    return None

def validate_login(data: Dict[str, str]) -> Union[None, Tuple[Dict[str, str], int]]:
    email = data.get('email')
    password = data.get('password')

    error = validate_email("Email", email)
    if error:
        return error

    error = validate_password_size("Password", password, 8)
    if error:
        return error
    
    return None
    