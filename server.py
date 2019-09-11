import sys
sys.dont_write_bytecode = True
from Intrinio import Intrinio
from twitter import Twitter
from stock import Stock
import os
from flask import Flask, request, render_template, jsonify
import json
from dateutil.relativedelta import relativedelta
from datetime import date, timedelta, datetime
import copy

app = Flask(__name__)

intrinio = Intrinio()
twitter = Twitter()
stock = Stock()

@app.route('/')
def index():
    return jsonify({'msg': 'Server'})

@app.route('/test')
def test():
    data =  intrinio.search_security_api('IBM', '1980-01-01', '2018-01-01', frequency='yearly')
    print data
    return jsonify({'data': data})

@app.route('/tweets', methods= ['POST'])
def tweets():
    data = request.get_json()
    print data
    twitter.setQuery(data['company'])
    twitter.setCount(1000)
    tweets = twitter.search()

    tweetArray = []
    positive = 0
    negative = 0
    neutral = 0
    subjectivityAvg = 0

    for tweet in tweets:
        object = twitter.analysisTweet(tweet)
        tweetArray.append(object)
        subjectivityAvg += float(object['subjectivity'])
        if object['polarity'] == 'Positive':
            positive += 1
        elif object['polarity'] == 'Negative':
            negative += 1
        else:
            neutral += 1

    data = {
        'tweets': tweetArray,
        'count' : len(tweetArray),
        'positive': positive,
        'negative': negative,
        'neutral': neutral,
        'subjectivityAvg': subjectivityAvg / len(tweetArray)
    }

    return jsonify({'data': data})

@app.route('/stockprices', methods= ['POST'])
def stock_prices():

    data1 = request.get_json()
    today = date.today()
    startDate = None

    if data1['frequency'] == 'daily':
        startDate = today - timedelta(days=100)
    elif data1['frequency'] == 'monthly':
        startDate = today - relativedelta(months=100)
    else:
        startDate = today - relativedelta(years=100)

    data = intrinio.search_security_api(data1['company_ticker'], startDate, today,
    page_size=100, frequency=data1['frequency'])

    stock.fetch_data(data)
    fittedData = stock.fit_data()

    data = {
        'company_ticker': data.security.ticker,
        'name': data.security.name,
        'predictionData': fittedData
    }
    return jsonify({'data': data})

@app.route('/findCompanies', methods= ['POST'])
def findCompanies():
    data = request.get_json()
    companies = intrinio.search_company_api(data['company'])
    if len(companies.companies) != 0:
        data = {
            'company_ticker': companies.companies[0].ticker,
            'name': companies.companies[0].name
        }
        return jsonify({'data': data})
    return jsonify({'data': 'None'})

@app.route('/predictprices', methods= ['POST'])
def predictprices():
    data = request.get_json()
    startDate = datetime.strptime(data['startDate'], '%Y-%m-%d')
    endDate = datetime.strptime(data['endDate'], '%Y-%m-%d')

    delta = endDate - startDate
    dates = []
    for i in range(delta.days + 1):
        dates.append(startDate + timedelta(days=i))
    dates_format = copy.deepcopy(dates)
    prices = stock.predict_price(dates)
    data = {
        'prices': prices,
        'dates': dates_format
    }

    return jsonify({'data': data})


if __name__ == '__main__':
    #app.run(host='calm-oasis-94316.herokuapp.com')

    app.run(host='0.0.0.0', port=os.environ.get('PORT', 8000), debug=True)
