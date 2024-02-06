import '../scss/Category.scss';
import disneyImage from '../images/viewers-disney.png';
import marvelImage from '../images/viewers-marvel.png';
import pixarImage from '../images/viewers-pixar.png';
import starwarsImage from '../images/viewers-starwars.png';
import nationalImage from '../images/viewers-national.png';

const Category = () => {
  return (
    <div className="category">
      <Wrapper imagePath={disneyImage} videoPath="/videos/disney.mp4" />
      <Wrapper imagePath={marvelImage} videoPath="/videos/marvel.mp4" />
      <Wrapper imagePath={pixarImage} videoPath="/videos/pixar.mp4" />
      <Wrapper imagePath={starwarsImage} videoPath="/videos/star-wars.mp4" />
      <Wrapper
        imagePath={nationalImage}
        videoPath="/videos/national-geographic.mp4"
      />
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
