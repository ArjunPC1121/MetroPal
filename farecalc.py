import pandas as pd
dataset= pd.read_csv('FareCalculator - Sheet1.csv')
src=input("Enter source station\n")
dest=input("Enter Destination\n")
src=src.lower()
dest=dest.lower()
x= dataset.loc[(dataset.Source==src)&(dataset.Destination==dest),'Price']
if x.empty:
    x= dataset.loc[(dataset.Source==dest)&(dataset.Destination==src),'Price']
if not x.empty: #Handle other combination of src and dest
    print("Price = {}".format(x.values[0]))
else:
    print("Invalid stations")