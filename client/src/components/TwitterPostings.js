import React, {useEffect, useState } from 'react';



const TwitterPostings = ({ tweets }) => {

   const postings = tweets.map(tweet => {
      return (
         <div className='card'>
            <h3>Status: {tweet.polarity}</h3>
            <p>subjectivity: { tweet.subjectivity}</p>
            <p>Tweet:  { tweet.tweet}</p>
         </div>
      )
   })

   return (
      <div>
         <h3>Tweets</h3>
         <div style={{overflow: 'scroll', height: '600px', marginBottom: '5%'}}className=''>
            {postings}
         </div>
      </div>
   )
}

export default TwitterPostings;
