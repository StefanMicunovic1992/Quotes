import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar-filters/Sidebar';
import MainContent from './components/MainContent/MainContent';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Login></Login>}></Route>
            </Routes>
        </BrowserRouter> */}
        <Header></Header>
        <Sidebar></Sidebar>
        <MainContent></MainContent>
    </div>
  );
}

export default App;
