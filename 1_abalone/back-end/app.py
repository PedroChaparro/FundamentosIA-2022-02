from flask import Flask, jsonify
import abalone_controllers

app = Flask(__name__)

# Routes

@app.route("/histogram/<string:column>")
def histograms(column):
    # Parse to json format
    base64_plot = abalone_controllers.generateHistogramFromColum(column)
    return_dict = {
        "image": "{}".format(base64_plot)
    }

    return jsonify(return_dict)

@app.route("/boxplot/<string:column>")
def box_plots(column):
    # Parse to json format
    base64_plot = abalone_controllers.generateBoxPlotFromColumn(column)

    return_dict = {
        "image": "{}".format(base64_plot)
    }

    return jsonify(return_dict)

@app.route("/normplot/<string:column>")
def norm_plots(column):
    # Parse to json format
    base64_plot = abalone_controllers.generateNormPlotFromColumn(column)
    
    return_dict = {
        "image": "{}".format(base64_plot)
    }

    return jsonify(return_dict)

@app.route("/scatter")
def scatter_plots():
    return abalone_controllers.generateHistogramFromColum()

if __name__ == "__main__":
    app.run(debug=True)