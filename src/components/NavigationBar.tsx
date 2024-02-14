import {
  ChangeEvent,
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

const NavigationBar = () => {
  const searchTerm = useQuery();
  const [show, setShow] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }, []);

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
      <a className="logo" href="#none">
        <img src={logoImage} alt="Disney Plus Logo" />
      </a>
      {pathname === '/' ? (
        <Login />
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

const Login = () => {
  return <a className="login">로그인</a>;
};

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
