import {
  ChangeEvent,
  MouseEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import logoImage from '../images/logo.svg';
import '../scss/NavigationBar.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '../hooks/CustomHooks';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { error } from 'console';
import { initializeApp } from 'firebase/app';
import app from '../firebase';

const NavigationBar = () => {
  const searchTerm = useQuery();
  const [show, setShow] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }, []);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/main');
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    navigate(`../search?q=${e.target.value}`);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  const handleShow = (status: boolean) => {
    setShow(() => status);
  };

  return (
    <nav className={'navigation-wrapper' + (show ? ' show' : '')}>
      <a className="logo" onClick={() => navigate(`/main`)}>
        <img src={logoImage} alt="Disney Plus Logo" />
      </a>
      {pathname === '/' ? (
        <Login onClick={handleAuth} />
      ) : (
        <Input
          ref={inputRef}
          value={searchTerm.get('q') ?? ''}
          onChange={handleChange}
        />
      )}
    </nav>
  );
};

const Login = (props: LoginProps) => {
  return (
    <a className="login" onClick={props.onClick}>
      로그인
    </a>
  );
};

interface LoginProps {
  onClick: MouseEventHandler<HTMLAnchorElement>;
}

const Input = (props: InputProps) => {
  const { ref, value, onChange } = props;

  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      className="nav__input"
      type="text"
      placeholder="영화를 입력해주세요"
    />
  );
};

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  ref: RefObject<HTMLInputElement>;
}

export default NavigationBar;
