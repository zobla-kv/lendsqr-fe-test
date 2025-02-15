import { FormEvent, useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { toastMessages } from '../../constants/constants';

import Logo from '../../assets/img/logo.svg';
import Pablo from '../../assets/img/pablo-sign-in.svg';

import styles from './LoginPage.module.scss';

import AsyncButton from '../../components/AsyncButton/AsyncButton';

import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

// TODO: Adjust layout

const LoginPage = () => {
  const { login, loading, isAuthenticated, error, setState } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(toastMessages.loggedIn);
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      console.log('error', error);
      toast.error(error);
    }
  }, [error]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setState({ loading: true });

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setState({ loading: false, error: toastMessages.credentialsRequired });
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
            
            <a 
              href='#' 
              className='text-xs d-block mt-5 text-primary uppercase fw-600 letter-spacing decoration-none'
              onClick={() => toast.error(toastMessages.comingSoon)}
            >
              Forgot Password?
            </a>

          </div>

          <div className={styles.formFooter}>
            <AsyncButton 
              className='btn-primary border-0 login-button' 
              type='submit'
              isLoading={loading}
            >
              LOG IN
            </AsyncButton>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage;