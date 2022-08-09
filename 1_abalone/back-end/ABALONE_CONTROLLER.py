import pandas as pd
import matplotlib.pyplot as plot
import base64
import os
from scipy import stats

#import numpy as np
#from scipy import stats

# Read csv file
columns=[
    "SEX", "LENGTH", "DIAMETER", 
    "HEIGHT", "WHOLE_WEIGHT", "SHUCKED_WEIGHT", 
    "VISCERA_WEIGHT", "SHELL_WEIGHT", "RINGS"
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
    if(column.upper() in columns):
        # Create the histogram
        plot.hist(
            x = data_frame[column.upper()], 
            density=True, 
            color="#C1E7FC", 
            edgecolor="black"
        )

        # Save in the new folder
        plot.savefig("./cache/last_generated.jpg")

        #Encode
        encoded_string = encode_last_generated_to_base64()
        return encoded_string
    else: 
        return "Column does not exists"

def generateBoxPlotFromColumn(column):
    if(column.upper() in columns):
        # Create the boxplot
        plot.boxplot(x = data_frame[column.upper()])

        # Save in the new folder
        plot.savefig("./cache/last_generated.jpg")

        #Encode
        encoded_string = encode_last_generated_to_base64()
        return encoded_string
    else: 
        return "Column does not exists"

def generateNormPlotFromColumn(column):
    if(column.upper() in columns):
        # Create the normplot
        normal_prob_figure = plot.figure()

        ax = normal_prob_figure.add_subplot(111) # One data type
        
        res = stats.probplot(
            data_frame[column.upper()], 
            dist=stats.norm, 
            sparams=(6, ), # Media de 6, desviación estándar de 1
            plot=ax
        )
        plot.subplots()

        # Save in the new folder
        plot.savefig("./cache/last_generated.jpg")

        #Encode
        encoded_string = encode_last_generated_to_base64()
        return encoded_string
    else: 
        return "Column does not exists"