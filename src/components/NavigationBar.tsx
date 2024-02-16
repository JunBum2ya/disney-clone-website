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
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import app from '../firebase';

const NavigationBar = () => {
  const searchTerm = useQuery();
  const [show, setShow] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
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
        setUserData(result.user);
        localStorage.setItem('userData', JSON.stringify(userData));
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === '/') {
          navigate('/main');
        }
      } else {
        navigate('/');
      }
    });
  }, [auth, navigate, pathname]);

  const handleShow = (status: boolean) => {
    setShow(() => status);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData(undefined);
        localStorage.setItem('userData', JSON.stringify({}));
      })
      .catch((error) => console.error(error));
  };

  return (
    <nav className={'navigation-wrapper' + (show ? ' show' : '')}>
      <a className="logo" onClick={() => navigate(`/main`)}>
        <img src={logoImage} alt="Disney Plus Logo" />
      </a>
      {pathname === '/' ? (
        <Login onClick={handleAuth} />
      ) : (
        <>
          <Input
            ref={inputRef}
            value={searchTerm.get('q') ?? ''}
            onChange={handleChange}
          />
          <div className="sign-out">
            <img
              className="user-img"
              src={
                userData?.photoURL ??
                JSON.parse(localStorage.getItem('userData') ?? '{}')['photoURL']
              }
              alt={
                userData?.displayName ??
                JSON.parse(localStorage.getItem('userData') ?? '{}')[
                  'displayName'
                ]
              }
            />
            <div className="drop-down">
              <span onClick={handleSignOut}>Sign Out</span>
            </div>
          </div>
        </>
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
