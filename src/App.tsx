import { Outlet, Route, Routes } from 'react-router-dom';
import './App.scss';
import MainPage from './pages/MainPage';
import NavigationBar from './components/NavigationBar';
import LoginPage from './pages/LoginPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

const Layout = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
