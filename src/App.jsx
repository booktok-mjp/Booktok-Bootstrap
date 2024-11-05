import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';

import LandingView from './views/landing/LandingView';
import HomeView from './views/home/HomeView';

import './App.css';
import CustomNavbar from './components/navbar/CustomNavbar';
import BookcaseView from './views/bookcase/BookcaseView';

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log('user data', user);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="main-app-container">
      {isAuthenticated ? (
        <>
          <CustomNavbar />
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/mybookcase" element={<BookcaseView />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LandingView />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
