import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import WebMap from './components/WebMap';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import LandingPage from './components/LandingPage';
import NotFoundPage from './components/NotFoundPage';
import Notes from './components/Notes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route 
          path="/notes" 
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/webmap" 
          element={
            <ProtectedRoute>
              <WebMap />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;