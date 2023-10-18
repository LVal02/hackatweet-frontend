import React, { useState, useEffect } from 'react';
import user from '../reducers/user';
import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import count from '../reducers/count';
import { addCount } from '../reducers/count';
import Moment from 'react-moment';





function Tweet(props) {
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false); // Ajout de l'état local pour la gestion de la classe CSS

    const name = props.creator.firstname
    const username = props.creator.username
    const avatar = props.creator.avatar
    const content = props.content
    const arrLike = props.likes

    console.log("likes", props.likes)

    const [timeDiff, setTimeDiff] = useState('');

    useEffect(() => {
      const tweetTime = new Date(props.created_at);
      const currentTime = new Date();
      const diffInMs = currentTime - tweetTime;
      const diffInSec = Math.round(diffInMs / 1000);
      const diffInMin = Math.round(diffInSec / 60);
      const diffInHr = Math.round(diffInMin / 60);
  
      let diffText = '';
      if (diffInHr > 0) {
        diffText = `${diffInHr}h ago`;
      } else if (diffInMin > 0) {
        diffText = `${diffInMin}m ago`;
      } else {
        diffText = `Few seconds ago`;
      }
  
      setTimeDiff(diffText);
    }, [count]);

    const handleAnimation = () => {
        !liked ? setLiked(true) : setLiked(false) // Mettre à jour l'état local pour ajouter la classe CSS
    }

    const [userId, setuserId] = useState('');
    const user = useSelector((state) => state.user.value);
    const count = useSelector((state) => state.count.value);
    const [isLiked, setIsLiked] = useState(false)


    function handleLikeDislike(){
        console.log(props._id)
        fetch(`https://hackatweet-backend-drab.vercel.app/tweets/like/${user.token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tweetToken: props.token}),
        })
        .then(response=> response.json())
        .then(data => console.log(data))
        .then(() => {
            dispatch(addCount())
          })    }

    function handleDeleteTweet () {
        fetch('https://hackatweet-backend-drab.vercel.app/tweets/delete', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tweetToken: props.token })
          })
          .then(response=> response.json())
          .then(deletedData => console.log(deletedData))
          .then(() => {
            dispatch(addCount())
          })
        }
        useEffect(() => {
            (() => {fetch(`https://hackatweet-backend-drab.vercel.app/tweets/ifLiked/${user.token}`,
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tweetToken: props.token })
              })
             .then(response=> response.json())
             .then(data=> {
               if(data.result) {setIsLiked(true)} else {setIsLiked(false)}
             })})();
           },[count])


    return (
        <div className={styles.tweetContainer}>
            <div className={styles.tweetHeader}>
                <img className={styles.avatar} src={avatar} />
                <div className={styles.firstName}>{name}</div>
                <div className={styles.username}>@{username}</div>
                <div className={styles.time}>
                <Moment fromNow>{props.created_at}</Moment>

                    </div>

            </div>
            <div className={styles.tweetContent}>
                {content}
            </div>
            <div className={styles.tweetBottom}>
            {isLiked ? <div><FontAwesomeIcon  icon={faHeart} className={styles.heartLike} onClick={() => handleLikeDislike()}/>
            <span className={styles.likeCount}>{arrLike.length}</span></div> 
            : <div><FontAwesomeIcon  icon={faHeart} className={styles.heart} onClick={() => handleLikeDislike()}/>
            <span className={styles.likeCount}>{arrLike.length}</span></div> }
           { props.creator.token == user.token ? <FontAwesomeIcon  icon={faTrash} onClick={() => handleDeleteTweet()} className={styles.trash}/> : ""}

            </div>
        </div>
    )
}

export default Tweet
