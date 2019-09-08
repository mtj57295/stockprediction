import csv
from Intrinio import Intrinio
import numpy as np
from sklearn.svm import SVR
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
import matplotlib.dates as matdates
import datetime
import copy

class Stock:

    def __init__(self):
        self.svr_rbf = None
        self.dates = []
        self.prices = []
        self.dates_format = []

    def fetch_data(self, data):
        self.dates = []
        self.prices = []
        self.dates_format = []
        self.svr_rbf = SVR(kernel= 'rbf', C= 1e3, gamma= 0.1)
        for stock in data.stock_prices:
            self.dates.append(stock.date)
            self.prices.append(stock.close)

    def to_value(self, dt_time, min_year):
        date = (dt_time.year - min_year) * 12
        date += dt_time.month
        date += float(dt_time.day)/30
        return float(date)

    def fit_data(self):
        dates = self.dates
        prices = self.prices
        dates_format = self.dates_format

        dates_format = copy.deepcopy(dates)
        dates.reverse()
        prices.reverse()

        year = 0
        for i in range(len(dates)):
            if i == 0:
                year = dates[i].year
            dates[i] = self.to_value(dates[i], year)

        dates = np.reshape(dates, (len(dates), 1))
        self.svr_rbf.fit(dates, prices) # fitting the data points in the models
        array = self.svr_rbf.predict(dates).tolist()
        return {'x': dates_format, 'y': prices, 'line': array}

    def predict_price(self, dates):
        year = 0
        for i in range(len(dates)):
            if i == 0:
                year = dates[i].year
            dates[i] = self.to_value(dates[i], year)
        dates = np.reshape(dates, (len(dates), 1))
        return self.svr_rbf.predict(dates).tolist()
