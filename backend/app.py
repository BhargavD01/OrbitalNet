from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "message": "OrbitalNet Satellite Operations API Running"
    })

@app.route("/satellites")
def satellites():
    with open("satellites.json", "r") as file:
        data = json.load(file)

    return jsonify(data)

@app.route("/alerts")
def alerts():

    with open("satellites.json", "r") as file:
        satellites = json.load(file)

    alerts = []

    for sat in satellites:

        if sat["battery"] < 30:
            alerts.append(
                f"{sat['name']} Battery Critical"
            )

        if sat["temperature"] > 60:
            alerts.append(
                f"{sat['name']} Temperature Critical"
            )

        if sat["signal"] < 50:
            alerts.append(
                f"{sat['name']} Weak Signal"
            )

    return jsonify(alerts)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)