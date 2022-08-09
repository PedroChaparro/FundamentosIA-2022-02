# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
# Introducción gráficos con Python 
# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

# Packages
import pandas as pd
import numpy as np
import matplotlib.pyplot as plot
from scipy import stats

# Read csv file
colnames=[
    "Sex", "Length", "Diameter", 
    "Height", "Whole weight", "Shucked weight", 
    "Viscera weight", "Shell weight", "Rings"
    ] 

dataframe = pd.read_csv("abalone.csv", names=colnames)

# Check dataframe
# print(dataframe.head())

# Create an histogram
plot.hist(x = dataframe["Length"], 
          density=True, 
          color="#C1E7FC", 
          edgecolor="black")

plot.title("Length Histogram")
plot.xlabel("Values")
plot.ylabel("Cantidad")

# Create a box plot
plot.subplots() # Create a new plot
plot.boxplot(x = dataframe["Length"])
plot.title("Length BoxPlot")

# Normal probability plot
normal_prob_figure = plot.figure()

ax = normal_prob_figure.add_subplot(111) # One data type

res = stats.probplot(
    dataframe["Length"], 
    dist=stats.norm, 
    sparams=(6, ), # Media de 6, desviación estándar de 1
    plot=ax
    )

plot.subplots()

# Gráfica de relación: Qué tan relacionada está una variable con la otra

# Scatter plot
plot.scatter(
    np.array(dataframe["Length"]), 
    np.array(dataframe["Diameter"]),
    edgecolor="black"
    )

# También se puede ver la relación de forma numérica
correlacion = dataframe.corr()
print(correlacion)

# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
# Buscar acerca de la gráfica de correlación
# Buscar cómo eliminar los datos atípicoss
# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@