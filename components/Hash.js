import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { login, logout } from '../reducers/user';
import { addCount } from '../reducers/count';

import { useEffect } from 'react';
import Tweet from './Tweet';
import Hashtag from './Hashtags';



function Hash(props) {

  const [tweets, setTweets] = useState([]);
  const [newTweetValue, setNewTweetValue] = useState('')
  const [characterCount, setCharacterCount] = useState(0)
  const [hashtags, setHashtags] = useState([])
  // const [fetchTweet, setFetchTweet] = useState(0)

  console.log(tweets);
  const count = useSelector((state) => state.count.value);


  useEffect(() => {
   (() => {fetch(`https://hackatweet-backend-drab.vercel.app/tweets/tweets/${props.hashtag}`)
    .then(response=> response.json())
    .then(data=> {
      setTweets(data)
    })})();
  },[props,count])

  let arrayTweet = tweets.map((singleTweet, index) => {
    // console.log(singleTweet.creato r);
    return <Tweet {...singleTweet} key={index} />;
  });

  const user = useSelector((state) => state.user.value);
  const router = useRouter()
  const dispatch = useDispatch()


  const handleLogOut = () => {
    dispatch(logout())
    router.push('/')
  }

  const handleChange = (e) => {
    setNewTweetValue(e.target.value);
    setCharacterCount(e.target.value.length)
  }

  const handleNewTweet = () => {
    fetch(`https://hackatweet-backend-drab.vercel.app/tweets/creation/${user.token}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({content: newTweetValue}),
		})
			.then(response => response.json())
      .then(() => {
        setNewTweetValue('')
        setCharacterCount(0)
      })
      .then(() => {
        dispatch(addCount())
      })}

      useEffect(() => {
        (() => {fetch('https://hackatweet-backend-drab.vercel.app/tweets/allHashtags')
         .then(response=> response.json())
         .then(data=> {
           data.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));
           setHashtags(data)
         })})();
       },[count])
    
       let hashtag = hashtags.map((ht, index) => {
        // console.log(singleTweet.creato r);
        return <Hashtag {...ht} key={index} />;
      });

      function hashadd (str1,str2) {
            return str1.concat(str2)
      }

  return (
    <div className={styles.container}>

        <div className={styles.containerLeft}>
          <img className={styles.logo} src='../Twitter.png' />
          <div className={styles.profileLogOut}>
            <div className={styles.profile}>
              <img className={styles.avatar} src={user.avatar} />
              <div className={styles.names}>
                <div className={styles.firstName}>{user.firstname}</div>
                <div className={styles.username}>@{user.username}</div>
              </div>
            </div>
            <div className={styles.logout}>
            <button className={styles.logoutBtn} onClick={() => handleLogOut()}>Log Out</button>
            </div>
          </div>
        </div>

        <div className={styles.containerMiddle}>
          <div className={styles.topBlock}>
              <p className={styles.home}>Hashtag</p>
              <div className={styles.newTweet}> 
                <input className={styles.newInput} type="text" placeholder={hashadd("#",props.hashtag)} id="newTweet" onChange={handleChange} value={newTweetValue}/>
              </div>

          </div>
          <div className={styles.tweetContain}>
        {arrayTweet}
          </div>
        </div>

        <div className={styles.containerRight}>
        <p className={styles.trends}>Trends</p>

            {hashtag}
        </div>
    </div>
  );
}

export default Hash;
