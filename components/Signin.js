import styles from '../styles/Sign.module.css';
import { login, logout } from '../reducers/user';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'

function Signin() {
    const dispatch = useDispatch()

    const router = useRouter()

// const [signUpPassword, setSignUpPassword] = useState('');
const [signInUsername, setSignInUsername] = useState('');
const [signInPassword, setSignInPassword] = useState('');

const [errorMessage, setErrorMessage] = useState(''); // Ajout de la variable d'état pour le message d'erreur



  
const handleConnection = () => {
        fetch('https://hackatweet-backend-drab.vercel.app/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signInUsername, password: signInPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({  firstname: data.firstname, username: data.username, token: data.token, avatar: data.avatar }))
                    router.push('/home');
                }else {
					setErrorMessage('Invalid username or password'); // Mise à jour de la variable d'état avec le message d'erreur
				  }
				})
				.catch(error => {
				  console.error(error);
				  setErrorMessage('An error occurred while trying to sign in'); // Mise à jour de la variable d'état avec le message d'erreur
				});
	};
  

  return (
    <div className={styles.signinContainer}>
       <img className={styles.logo}src='./Twitter.png' />
       <input className={styles.connectionInput} type="text" placeholder="Your Username" id="username_signin" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername}/>
       <input className={styles.connectionInput} type="password" placeholder="Your Password" id="password_signin" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword}/>
      <button className={styles.connectionBtn} onClick={() => handleConnection()}>Sign In</button>
	  {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} {/* Affichage du message d'erreur s'il y en a un */}
  </div>
  );
}

export default Signin;