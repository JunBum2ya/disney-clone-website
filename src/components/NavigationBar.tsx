import logoImage from '../images/logo.svg';

const NavigationBar = () => {
  return (
    <nav className="Navigation-wrapper">
      <a className="logo" href="#none">
        <img src={logoImage} alt="Disney Plus Logo" />
      </a>
    </nav>
  );
};

export default NavigationBar;
