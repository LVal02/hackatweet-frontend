import styles from '../styles/Login.module.css';
import {useState} from 'react';
import {Modal} from 'antd';
import Signin from './Signin';
import Signup from './Signup';


function Login() {

    const [isModalSignInVisible, setIsModalSignInVisible] = useState(false);
    const [isModalSignUpVisible, setIsModalSignUpVisible] = useState(false);


    const handleCancel = () => {
        setIsModalSignInVisible(false);
      };

      const handleCancelSignUp = () => {
        setIsModalSignUpVisible(false);
      };

  return (
    <div>
      <main className={styles.container}>
        
        <div className={styles.contentleft}>
</div>

        {isModalSignInVisible && <div id="react-modals">
				<Modal   className={styles.modal} visible={isModalSignInVisible} onCancel={handleCancel}footer={null}>
                <Signin />
				</Modal>
			</div>}
            {isModalSignUpVisible && <div id="react-modals">
				<Modal   className={styles.modal} visible={isModalSignUpVisible} onCancel={handleCancelSignUp}footer={null}>
                <Signup />
				</Modal>
			</div>}
            <div className={styles.contentright}>
                <img className={styles.logo} src='./Twitter.png' />
                <h1 className={styles.title}>Be part of the brand new social media.</h1>
            <button className={styles.signUpBtn} onClick={() => setIsModalSignUpVisible(!isModalSignUpVisible)}>Sign Up</button>
            <h4 className={styles.accountQ}>Already have an account?</h4>
            <button className={styles.signInBtn} onClick={() => setIsModalSignInVisible(!isModalSignInVisible)}>Sign In</button>

            </div>

      </main>
    </div>
  );
}

export default Login;
