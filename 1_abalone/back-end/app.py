from flask import Flask, request, jsonify
import abalone_controllers

app = Flask(__name__)

# Routes
@app.route("/histogram", methods=["POST"])
def histograms():
    # Get json data
    request_data = request.json
    return_dict = {}

    if "column" in request_data:
        base64_plot = abalone_controllers.generateHistogramFromColum(
            request_data["column"]
        )

        return_dict = {
            "image": "{}".format(base64_plot),
            "error": False,
            "message": "Base64 image was sucessfully created",
        }

    else:
        return_dict = {
            "image": "",
            "error": True,
            "message": "column key was not provided on JSON payload",
        }

    # Parse to json format
    return jsonify(return_dict)


@app.route("/boxplot", methods=["POST"])
def box_plots():
    # Get json data
    request_data = request.json
    return_dict = {}

    if "column" in request_data:
        base64_plot = abalone_controllers.generateBoxPlotFromColumn(
            request_data["column"]
        )

        return_dict = {
            "image": "{}".format(base64_plot),
            "error": False,
            "message": "Base64 image was sucessfully created",
        }

    else:
        return_dict = {
            "image": "",
            "error": True,
            "message": "column key was not provided on JSON payload",
        }

    # Parse to json format
    return jsonify(return_dict)


@app.route("/normplot", methods=["POST"])
def norm_plots():
    # Get json data
    request_data = request.json
    return_dict = {}

    if "column" in request_data:
        base64_plot = abalone_controllers.generateNormPlotFromColumn(
            request_data["column"]
        )

        return_dict = {
            "image": "{}".format(base64_plot),
            "error": False,
            "message": "Base64 image was sucessfully created",
        }

    else:
        return_dict = {
            "image": "",
            "error": True,
            "message": "column key was not provided on JSON payload",
        }

    # Parse to json format
    return jsonify(return_dict)


@app.route("/scatter", methods=["POST"])
def scatter_plots():
    # Get json data
    request_data = request.json
    return_dict = {}

    if "column1" in request_data and "column2" in request_data:
        base64_plot = abalone_controllers.generateScatterPlotFromColumns(
            request_data["column1"], request_data["column2"]
        )

        return_dict = {
            "image": "{}".format(base64_plot),
            "error": False,
            "message": "Base64 image was sucessfully created",
        }

    else:
        return_dict = {
            "image": "",
            "error": True,
            "message": "One or both columns key (col1, col2) was not provided on JSON payload",
        }

    # Parse to json format
    return jsonify(return_dict)


if __name__ == "__main__":
    app.run(debug=True)
