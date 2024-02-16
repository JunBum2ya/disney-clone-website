import imageOne from '../../images/cta-logo-one.png';
import imageTwo from '../../images/cta-logo-two.png';
import bgImage from '../../images/login-background.jpg';
import '../../scss/LoginPage.scss';

const LoginPage = () => {
  return (
    <section className="login-section">
      <div className="content">
        <div className="center">
          <img className="logo-one" src={imageOne} alt="logo1" />
          <a className="sign-up-link">지금 가입</a>
          <p className="description">
            영화에 대한 프리미엄 액세스를 얻으십시오. 디즈니 플러스 가격은 다음
            주 부터 1000원 인상합니다.
          </p>
          <img className="logo-two" src={imageTwo} alt="logo2" />
        </div>
        <div className="bg-image"></div>
      </div>
    </section>
  );
};

export default LoginPage;
