import pandas as pd
import numpy as np
import base64
import os
from scipy import stats

import matplotlib
import matplotlib.pyplot as plot

matplotlib.use("Agg")  # Fix main thread error

# import numpy as np
# from scipy import stats

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


def encode_last_generated_to_base64():
    encoded_string = ""

    # Parse to base64 and return the string
    with open("./cache/last_generated.jpg", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())

    # Remove the tempfile
    os.remove("./cache/last_generated.jpg")

    return encoded_string


def generateHistogramFromColum(column):
    if column.upper() in columns:
        # Create the histogram
        plot.hist(
            x=data_frame[column.upper()],
            density=True,
            color="#C1E7FC",
            edgecolor="black",
        )

        # Save in the new folder
        plot.savefig("./cache/last_generated.jpg")

        # Encode
        encoded_string = encode_last_generated_to_base64()
        return encoded_string
    else:
        return "Column does not exists"


def generateBoxPlotFromColumn(column):
    if column.upper() in columns:
        # Create the boxplot
        plot.boxplot(x=data_frame[column.upper()])

        # Save in the new folder
        plot.savefig("./cache/last_generated.jpg")

        # Encode
        encoded_string = encode_last_generated_to_base64()
        return encoded_string
    else:
        return "Column does not exists"


def generateNormPlotFromColumn(column):
    if column.upper() in column:

        print("Hi")
    else:
        print("Bye")


def generateScatterPlotFromColumns(column1, column2):
    if column1.upper() in columns and column2.upper() in columns:
        # Create the boxplot
        plot.scatter(
            np.array(data_frame[column1.upper()]),
            np.array(data_frame[column2.upper()]),
            edgecolor="black",
        )

        # Save in the new folder
        plot.savefig("./cache/last_generated.jpg")

        # Encode
        encoded_string = encode_last_generated_to_base64()
        return encoded_string
    else:
        return "One (or both) of the columns doest not exits"
