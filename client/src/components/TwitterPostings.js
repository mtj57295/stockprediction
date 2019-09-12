import React, {useEffect, useState } from 'react';



const TwitterPostings = ({ tweets, type }) => {

   const postings = tweets.map(tweet => {
      return (
         <div className='card'>
            <h3>Status: {tweet.polarity}</h3>
            <p><a href={tweet.url} target="_blank">Twitter Post</a></p>
            <p>subjectivity: { tweet.subjectivity}</p>
            <p>Tweet:  { tweet.tweet}</p>
         </div>
      )
   })

   const postings2 = tweets.map(tweet => {
      return (
         <div className='card'>
            <h3>Date: {tweet.created_at}</h3>
            <p><a href={tweet.url} target="_blank">Twitter Post</a></p>
            <p>Tweet:  { tweet.text}</p>
         </div>
      )
   })

   return (
      <div>
         <h3>Tweets</h3>
         <div style={{overflow: 'scroll', height: '600px', marginBottom: '5%'}}className=''>
            {type === 'feed' ? postings : postings2}
         </div>
      </div>
   )
}

export default TwitterPostings;
