import '../scss/Category.scss';
import disneyImage from '../images/viewers-disney.png';
import marvelImage from '../images/viewers-marvel.png';
import marvelVideo from '../images/viewers-marvel.png';
import pixarImage from '../images/viewers-pixar.png';
import pixarVideo from '../images/viewers-pixar.png';
import starwarsImage from '../images/viewers-starwars.png';
import starwarsVideo from '../images/viewers-starwars.png';
import nationalImage from '../images/viewers-national.png';
import nationalVideo from '../images/viewers-national.png';

const Category = () => {
  return (
    <div className="category">
      <Wrapper
        imagePath={disneyImage}
        videoPath="/static/media/videos/disney.mp4"
      />
      <Wrapper imagePath={marvelImage} videoPath={marvelVideo} />
      <Wrapper imagePath={pixarImage} videoPath={pixarVideo} />
      <Wrapper imagePath={starwarsImage} videoPath={starwarsVideo} />
      <Wrapper imagePath={nationalImage} videoPath={nationalVideo} />
    </div>
  );
};

const Wrapper = (props: WrapperProps) => {
  return (
    <div className="wrapper">
      <img src={props.imagePath} alt="" />
      <video autoPlay loop muted>
        <source src={props.videoPath} type="video/mp4" />
      </video>
    </div>
  );
};

interface WrapperProps {
  imagePath: string;
  videoPath: string;
}

export default Category;
