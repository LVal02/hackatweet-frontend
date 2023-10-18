import styles from '../styles/Sign.module.css';
import {useState} from 'react';
import { login, logout } from '../reducers/user';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';


function Signup() {
    const dispatch = useDispatch()
    const router = useRouter()

    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpFirstname, setSignUpFirstname] = useState('');


    const handleSubscription = () => {



        fetch('https://hackatweet-backend-drab.vercel.app/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signUpUsername, password: signUpPassword, firstname: signUpFirstname  }),
        }).then(response => response.json())
            .then(data => {
                console.log('data',data);
                if (data.result) {
                    dispatch(login({  firstname: data.firstname, username: data.username, token: data.token, avatar: data.avatar }))
                    router.push('/home');
                }else console.log('aleady Created')
            });
    };

  return (
    <div className={styles.signinContainer}>
       <img className={styles.logo}src='./Twitter.png' />
       <input className={styles.connectionInput} type="text" placeholder="Your Username" id="username_signup" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername}/>
       <input className={styles.connectionInput} type="text" placeholder="Your FirstName" id="password_signup" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname}/>
       <input className={styles.connectionInput} type="password" placeholder="Your Password" id="password_signup" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword}/>  
    <button className={styles.connectionBtn} onClick={() => handleSubscription()}>Sign Up</button>
  </div>
  );
}

export default Signup;
