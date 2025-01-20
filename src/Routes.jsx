import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Book from './components/Book';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:book/:chapter" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;