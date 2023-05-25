import "./App.css"
import ArrayPlayGround from './component/playGround/ArrayPlayground';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LinkedListPlayGround from "./component/playGround/LinkedListPlayGround";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/arrayPlayground" element={<ArrayPlayGround />}></Route>
        <Route path="/linkedListPlayground" element={<LinkedListPlayGround />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
