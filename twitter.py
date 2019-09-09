.import tweepy
.from textblob import TextBlob
import json

class Twitter:

    def __init__(self):
        consumer_key = 'S3WpeqF9HAE0QKTqNvlqEJySB'
        consumer_secret = 'BA3RlQ46m9OYLML9SDqfoOTlD3YYwDdkl9eisx1tYS3rbDK5hu'
        access_token = '1098658852650795010-oBMeX78D0muMesm23HC7Ny4vqyH8yN'
        access_token_secret = 'tF7dDYIhVMZl3BVIZLZMeb3tIG4285mFlzKq0Af2UXJT1'
        try:
            auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
            auth.set_access_token(access_token, access_token_secret)
            self.api = tweepy.API(auth)
            self.query = 'Twitter'
            self.count = 10
        except:
            print("Error: Authentication Failed")

    #return a collection of tweets specified by search query
    def search(self):
        try:
            tweets = self.api.search(self.query, count=self.count)
            if not tweets:
                return 'No Tweets Found'
            return tweets
        except tweepy.TweepError as e:
            print("Error : " + str(e))

    def setQuery(self, query):
        self.query = query

    def setCount(self, count):
        self.count = count

    def analysisTweet(self, tweet):
            analysis = TextBlob(tweet.text)
            return {'tweet': ''.join([x for x in tweet.text if ord(x) < 128]),
                    'polarity': self.getStatusOnPolarity(analysis.sentiment.polarity),
                    'subjectivity': analysis.sentiment.subjectivity}

    def getStatusOnPolarity(self, polarity):
        if polarity > 0:
            return 'Positive'
        elif polarity == 0:
            return 'Neutral'
        else:
            return 'Negative'
