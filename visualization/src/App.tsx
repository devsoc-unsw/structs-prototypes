import "./App.css"
import PlayGround from './component/Playground';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/arrayPlayground" element={<PlayGround />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
