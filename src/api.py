from flask import Blueprint
from flask import request, jsonify,render_template
from .db import get_all_stations, get_station_detailed, get_fare

bp = Blueprint("api", __name__, url_prefix="/api/v1")


@bp.route("/")
def api_index():
    return "API index"


@bp.route("/stations")
def stations_list():
    return get_all_stations()


@bp.route("/station/<string:station_code>")
def stations_detail(station_code: str):
    station = get_station_detailed(station_code)
    if station is None:
        return jsonify({"status": "error", "message": "Station not found"}), 404
    return {"status": "success", **station}


@bp.route("/fare")
def get_fare_details():
    from_station = request.args.get("from")
    to_station = request.args.get("to")

    # Check if both URL parameters are passed
    if from_station is None or to_station is None:
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "'from' or 'to' query parameter is missing",
                }
            ),
            400,
        )

    fare = get_fare(from_station, to_station)
    if fare is None:
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "Invalid station code",
                }
            ),
            400,
        )
    return {"status": "success", "fare": fare}

@bp.route("/station")
def station():
    return render_template("station.html")