import { useEffect, useState } from 'react';
import logoImage from '../images/logo.svg';
import '../scss/NavigationBar.scss';

const NavigationBar = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);
  const handleShow = (status: boolean) => {
    setShow(() => status);
  };

  return (
    <nav className={'navigation-wrapper' + (show ? ' show' : '')}>
      <a className="logo" href="#none">
        <img src={logoImage} alt="Disney Plus Logo" />
      </a>
    </nav>
  );
};

export default NavigationBar;
