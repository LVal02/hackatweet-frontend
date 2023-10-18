import React, { useState, useEffect } from 'react';
import user from '../reducers/user';
import styles from '../styles/Hashtag.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import count from '../reducers/count';
import { addCount } from '../reducers/count';
import Moment from 'react-moment';
import { useRouter } from 'next/router'



function Hashtag(props) {
    const router = useRouter()
    const count = useSelector((state) => state.count.value);
    const dispatch = useDispatch()

   const handleRedirection = () => {
         dispatch(addCount())
        router.push(`/hashtag/${props.hashtag.slice(1)}`)
        
    }

    function plurial (count) {
            if(count > 1){return "tweets"} else {return "tweet"}
        }

    return (
        <div className={styles.htContainer} onClick={() => handleRedirection()}>
            <div className={styles.ht}>{props.hashtag}</div>
            <div className={styles.count}>{props.count} {plurial(props.count)}</div>
        </div>
    )
}

export default Hashtag
