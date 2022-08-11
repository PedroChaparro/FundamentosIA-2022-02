import pandas as pd
import numpy as np
import base64
import os
from scipy import stats
import matplotlib
import matplotlib.pyplot as plot

matplotlib.use("Agg")  # Fix main thread error

# Read csv file
columns = [
    "SEX",
    "LENGTH",
    "DIAMETER",
    "HEIGHT",
    "WHOLE_WEIGHT",
    "SHUCKED_WEIGHT",
    "VISCERA_WEIGHT",
    "SHELL_WEIGHT",
    "RINGS",
]

data_frame = pd.read_csv("abalone.csv", names=columns)

# -------------------------
# Helpers
# -------------------------


def encode_last_generated_to_base64():
    encoded_string = ""

    # Parse to base64 and return the string
    with open("./cache/last_generated.jpg", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())

    # Remove the tempfile
    os.remove("./cache/last_generated.jpg")

    return encoded_string


def filter_data(data, column, alpha):
    if column.upper() in columns:

        q1 = data[column.upper()].quantile(0.25)
        q3 = data[column.upper()].quantile(0.75)

        lower_limit = q1 - 1.5 * float(alpha)
        upper_limit = q3 + 1.5 * float(alpha)

        filtered_data_frame = data[
            (data[column.upper()] < upper_limit) & (data[column.upper()] > lower_limit)
        ]

        return filtered_data_frame
    else:
        return data_frame


# -------------------------
# Controllers
# -------------------------


def generateHistogramFromColum(column, atypical_toggle, atypical_alpha):

    filtered_data_frame = data_frame

    if column.upper() in columns:

        if atypical_toggle:
            filtered_data_frame = filter_data(data_frame, column, atypical_alpha)

        # Create the histogram
        plot.hist(
            x=filtered_data_frame[column.upper()],
            density=True,
            color="#C1E7FC",
            edgecolor="black",
        )

        plot.title("{} HISTOGRAM".format(column.upper()))
        plot.xlabel(column.upper())
        plot.ylabel("Frequency")

        # Save in the new folder
        plot.savefig("./cache/last_generated.jpg")
        plot.clf()

        # Encode
        encoded_string = encode_last_generated_to_base64()
        return encoded_string
    else:
        return "Column does not exists"


def generateBoxPlotFromColumn(column, atypical_toggle, atypical_alpha):

    filtered_data_frame = data_frame

    if column.upper() in columns:

        if atypical_toggle:
            filtered_data_frame = filter_data(data_frame, column, atypical_alpha)

        # Create the boxplot
        plot.boxplot(x=filtered_data_frame[column.upper()])
        plot.title("{} BOXPLOT".format(column.upper()))

        # Save in the new folder
        plot.savefig("./cache/last_generated.jpg")
        plot.clf()

        # Encode
        encoded_string = encode_last_generated_to_base64()
        return encoded_string
    else:
        return "Column does not exists"


def generateNormPlotFromColumn(column, atypical_toggle, atypical_alpha):

    filtered_data_frame = data_frame

    if column.upper() in columns:

        if atypical_toggle:
            filtered_data_frame = filter_data(data_frame, column, atypical_alpha)

        # Normal probability plot
        normal_prob_figure = plot.figure()

        ax = normal_prob_figure.add_subplot(111)  # One data type

        stats.probplot(
            filtered_data_frame[column.upper()],
            dist=stats.norm,
            sparams=(6, 1),  # Media de 6, desviación estándar de 1
            plot=ax,
        )

        plot.title("{} NORMAL PROBABILITY PLOT".format(column.upper()))

        plot.savefig("./cache/last_generated.jpg")
        plot.clf()

        # Encode
        encoded_string = encode_last_generated_to_base64()
        return encoded_string
    else:
        return "Column does not exists"


def generateScatterPlotFromColumns(column1, column2, atypical_toggle, atypical_alpha):

    filtered_data_frame = data_frame

    if column1.upper() in columns and column2.upper() in columns:

        if atypical_toggle:
            filtered_data_frame = filter_data(data_frame, column1, atypical_alpha)
            filtered_data_frame = filter_data(
                filtered_data_frame, column2, atypical_alpha
            )

        # Create the boxplot
        plot.scatter(
            np.array(filtered_data_frame[column1.upper()]),
            np.array(filtered_data_frame[column2.upper()]),
            edgecolor="black",
        )
        plot.title("{} vs {} SCATTER PLOT".format(column1.upper(), column2.upper()))
        plot.xlabel(column1.upper())
        plot.ylabel(column2.upper())

        # Save in the new folder
        plot.savefig("./cache/last_generated.jpg")
        plot.clf()

        # Encode
        encoded_string = encode_last_generated_to_base64()
        return encoded_string
    else:
        return "One (or both) of the columns doest not exits"


def generateStatistics(atypical_toggle, atypical_alpha):

    filtered_data_frame = data_frame

    if atypical_toggle:
        for column in columns:
            if column != "SEX":
                filtered_data_frame = filter_data(
                    filtered_data_frame.copy(), column, atypical_alpha
                )

    # Generate values
    mean = filtered_data_frame.mean(numeric_only=True)
    median = filtered_data_frame.median(numeric_only=True)
    mode = filtered_data_frame.mode()
    kurtosis = filtered_data_frame.kurtosis(numeric_only=True)

    # Organize values
    dictionary = {}

    for i in columns:
        dictionary[i] = {
            "mean": mean[i] if i != "SEX" else None,
            "median": median[i] if i != "SEX" else None,
            "mode": mode[i][0],
            "kurtosis": kurtosis[i] if i != "SEX" else None,
        }

    return dictionary
