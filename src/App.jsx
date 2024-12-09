import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';

import LandingView from './views/landing/LandingView';
import HomeView from './views/home/HomeView';
import CustomNavbar from './components/navbar/CustomNavbar';
import BookcaseView from './views/bookcase/BookcaseView';
import BookDetailView from './views/bookdetail/BookDetailView';
import DiscussionView from './views/discussion/DiscussionView';
import ThreadView from './views/discussion/ThreadView';

import './App.css';

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="main-app-container">
      {isAuthenticated ? (
        <>
          <CustomNavbar />
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/mybookcase" element={<BookcaseView />} />
            <Route path="/book/:bookId" element={<BookDetailView />} />
            <Route path="/discussions" element={<DiscussionView />} />
            <Route path="/discussions/:threadId" element={<ThreadView />} />
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
