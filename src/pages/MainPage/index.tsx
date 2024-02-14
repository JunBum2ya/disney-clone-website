import Banner from '../../components/Banner';
import Category from '../../components/Category';
import Container from '../../components/Container';
import NavigationBar from '../../components/NavigationBar';
import RowGroup from '../../components/Row';

const MainPage = () => {
  return (
    <Container>
      <NavigationBar />
      <Banner />
      <Category />
      <RowGroup />
    </Container>
  );
};

export default MainPage;
