from flask import jsonify
from ..model.user_model import User
from ..model.model import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token


class UserService:
    @staticmethod
    def register_user(email, password):
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "Email already in use"}), 400

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        new_user = User(email=email, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

    @staticmethod
    def login_user(email, password):
        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            return jsonify({"error": "Bad username or password"}), 401

        access_token = create_access_token(identity=user.id)

        return jsonify({"message": "Login successful", "user_id": user.id, "access_token": access_token}), 200