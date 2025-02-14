import { useState } from 'react';

import Logo from '../../assets/img/logo.svg';
import Pablo from '../../assets/img/pablo-sign-in.svg';

import styles from './LoginPage.module.scss';

// TODO: Adjust layout

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='full-height flex'>

      <div className={`${styles.imageWrapper} flex-center`}>
        <img src={Logo} alt='Lendsqr logo' className={styles.logo} />
        <img src={Pablo} alt='Pablo walks through the door' className={styles.pablo} width={'600px'}/>
      </div>

      <div className={styles.formWrapper}>
        <form>
          <div className={styles.formHeader}>
            <span className='fw-700'>Welcome!</span>
            <span className='d-block'>Enter details to login.</span>
          </div>

          <div className={styles.formBody}>
            <div className={styles.inputGroup}>
              <input type='email' placeholder='Email' required/>
            </div>

            <div className={`${styles.inputGroup} mt-5`}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                required
              />
              <span
                className={`${styles.togglePassword} text-xs fw-600 select-none letter-spacing`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </span>
            </div>
            
            {/* TODO: show 'coming soon' message */}
            <a 
              href='#' 
              className='text-xs d-block mt-5 text-primary uppercase fw-600 letter-spacing decoration-none'
            >
              Forgot Password?
            </a>

          </div>

          <div className={styles.formFooter}>
            <button type='submit' className='border-0'>LOG IN</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage;