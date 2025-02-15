import { FormEvent, useState } from 'react';

import Logo from '../../assets/img/logo.svg';
import Pablo from '../../assets/img/pablo-sign-in.svg';

import styles from './LoginPage.module.scss';

import { useAuthStore } from '../../store/useAuthStore';

// TODO: Adjust layout

const LoginPage = () => {
  const { login, loading, setState } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setState({ loading: true });

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      // TODO: move error message to constants
      setState({ loading: false, error: 'Credentials required' });
      // TODO: show toast with validation messages
      return;
    }

    await login(email, password);
  } 

  return (
    <div className='full-height flex'>

      <div className={`${styles.imageWrapper} flex-center`}>
        <img src={Logo} alt='Lendsqr logo' className={styles.logo} />
        <img src={Pablo} alt='Pablo walks through the door' className={styles.pablo} width={'600px'}/>
      </div>

      <div className={styles.formWrapper}>
        <form onSubmit={handleLogin}>
          <div className={styles.formHeader}>
            <span className='fw-700'>Welcome!</span>
            <span className='d-block'>Enter details to login.</span>
          </div>

          <div className={styles.formBody}>
            <div className={styles.inputGroup}>
              <input type='text' placeholder='Email' name='email'/>
            </div>

            <div className={`${styles.inputGroup} mt-5`}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                name='password'
              />
              <span
                className={`${styles.togglePassword} text-xs fw-600 select-none letter-spacing`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </span>
            </div>
            
            {/* TODO: show toast with 'coming soon' message */}
            <a 
              href='#' 
              className='text-xs d-block mt-5 text-primary uppercase fw-600 letter-spacing decoration-none'
            >
              Forgot Password?
            </a>

          </div>

          <div className={styles.formFooter}>
            {/* TODO: Move to separate component and add spinner*/}
            <button type='submit' className={`login-button border-0 ${loading ? 'disabled' : ''}`}>
              {loading ? 'Loading...' : 'LOG IN'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage;