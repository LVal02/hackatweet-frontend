import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { login, logout } from '../reducers/user';
import { addCount } from '../reducers/count';

import { useEffect } from 'react';
import Tweet from './Tweet';
import Hashtag from './Hashtags';



function Home() {

  const [tweets, setTweets] = useState([]);
  const [newTweetValue, setNewTweetValue] = useState('')
  const [characterCount, setCharacterCount] = useState(0)
  const [hashtags, setHashtags] = useState([])
  const [isLiked, setIsLiked] = useState(false)

  // const [fetchTweet, setFetchTweet] = useState(0)

  console.log(tweets);
  const count = useSelector((state) => state.count.value);


  useEffect(() => {
   (() => {fetch('https://hackatweet-backend-drab.vercel.app/tweets/all')
    .then(response=> response.json())
    .then(data=> {
      data.sort((a, b) => parseFloat(new Date(b.created_at).getTime()) - parseFloat(new Date(a.created_at).getTime()));
      setTweets(data)
    })})();
  },[count])

  let arrayTweet = tweets.map((singleTweet, index) => {
    // console.log(singleTweet.creato r);
    return <Tweet {...singleTweet} key={index} isLiked={isLiked} />;
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

     

  return (
    <div className={styles.container}>

        <div className={styles.containerLeft}>
          <img className={styles.logo} src='./Twitter.png' />
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
              <p className={styles.home}>Home</p>
              <div className={styles.newTweet}> 
                <input className={styles.newInput} type="text" placeholder="What's on your mind?" id="newTweet" onChange={handleChange} value={newTweetValue}/>
                <div className={styles.countAndBtn}>
                  <div className={styles.characterCount}>{characterCount}/280</div>
                  { characterCount<=280 ? <button className={styles.tweetBtn} onClick={() => handleNewTweet()}>Tweet</button>
                  : <button className={styles.fakeBtn}>Tweet</button>}
                </div>
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

export default Home;
