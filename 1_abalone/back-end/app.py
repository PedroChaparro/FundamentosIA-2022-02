from flask import Flask, jsonify
import ABALONE_CONTROLLER

app = Flask(__name__)

# Routes

@app.route("/histogram/<string:column>")
def histograms(column):
    # Parse to json format
    base64_plot = ABALONE_CONTROLLER.generateHistogramFromColum(column)
    return_dict = {
        "image": "{}".format(base64_plot)
    }

    return jsonify(return_dict)

@app.route("/boxplot/<string:column>")
def box_plots(column):
    # Parse to json format
    base64_plot = ABALONE_CONTROLLER.generateBoxPlotFromColumn(column)

    return_dict = {
        "image": "{}".format(base64_plot)
    }

    return jsonify(return_dict)

@app.route("/normplot/<string:column>")
def norm_plots(column):
    # Parse to json format
    base64_plot = ABALONE_CONTROLLER.generateNormPlotFromColumn(column)
    
    return_dict = {
        "image": "{}".format(base64_plot)
    }

    return jsonify(return_dict)

@app.route("/scatter")
def scatter_plots():
    return ABALONE_CONTROLLER.generateHistogramFromColum()

if __name__ == "__main__":
    app.run(debug=True)