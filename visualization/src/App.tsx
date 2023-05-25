import "./App.css"
import ArrayPlayGround from './component/playGround/ArrayPlayground';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/arrayPlayground" element={<ArrayPlayGround />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
