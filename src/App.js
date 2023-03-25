import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CommonRoutes from './CommonRoutes.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/*' element={<CommonRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
