import './App.scss';
import Banner from './components/Banner';
import Category from './components/Category';
import Container from './components/Container';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <Container>
      <NavigationBar />
      <Banner />
      <Category />
    </Container>
  );
}

export default App;
