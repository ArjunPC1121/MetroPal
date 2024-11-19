import os
from flask import Flask, send_from_directory
from . import api


def create_app() -> Flask:
    app: Flask = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(SECRET_KEY="dev")

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route("/")
    def index():
        return send_from_directory(os.path.join(app.root_path, "static"), "index.html")

    app.register_blueprint(api.bp)
    return app
