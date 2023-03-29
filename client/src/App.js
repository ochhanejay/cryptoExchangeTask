import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import InsertData from './insertData';
import ExchangeList from './exchangeList';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className="App">


      <Routes>
        <Route path="/" element={<InsertData />} />
        <Route path="/exchangeList" element={<ExchangeList />} />
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
