import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import RFHzodPage from './pages/RFHzodPage';
import FormEdible from './pages/FormEdible';
import "./styles.css";
function App() {
  return (

      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/zod-react-hook-form">RHF and Zod</Link>
              </li>
              <li>
                <Link to="/formedible">FormEdible</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Navigate replace to="/formedible" />} />
            <Route path="/zod-react-hook-form/" element={<RFHzodPage />} />
            <Route path="/formedible" element={<FormEdible />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
