import './App.scss';
import Banner from './components/Banner';
import Container from './components/Container';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <Container>
      <NavigationBar />
      <Banner />
    </Container>
  );
}

export default App;
