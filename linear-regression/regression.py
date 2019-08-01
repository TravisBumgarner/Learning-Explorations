import pandas as pd
import Quandl
import pa
df = Quandl.get('WIKI/GOOGL')

print(df.head)