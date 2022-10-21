from flask import Flask
from flask_restful import Api

from config import Config


app = Flask(__name__)
app.config.from_object(Config)

api = Api(app)

from app.api import api # 執行 app.api.__init__.py
from app.view import main as view_bp

app.register_blueprint(view_bp)