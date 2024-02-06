import './App.scss';
import { Genre, genreRequest, requests } from './api/requests';
import Banner from './components/Banner';
import Category from './components/Category';
import Container from './components/Container';
import NavigationBar from './components/NavigationBar';
import Row from './components/Row';

function App() {
  return (
    <Container>
      <NavigationBar />
      <Banner />
      <Category />
      <Row titile="Trending Now" code="TN" url={requests.fetchTrending} />
      <Row titile="Top Rated" code="TR" url={requests.fetchTopRated} />
      <Row titile="Action Movie" code="AM" url={genreRequest(Genre.ACTION)} />
      <Row titile="Comedy Movie" code="CM" url={genreRequest(Genre.COMEDY)} />
    </Container>
  );
}

export default App;
