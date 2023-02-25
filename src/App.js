import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar-filters/Sidebar';
import MainContent from './components/MainContent/MainContent';
import { useEffect, useState } from 'react';


function App() {

const [url, setUrl] = useState()
useEffect(() => {
  console.log(url)
},[url])

  return (
    <div className="App">
      {/* <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Login></Login>}></Route>
            </Routes>
        </BrowserRouter> */}
        <Header></Header>
        <Sidebar setUrl={setUrl}></Sidebar>
        <MainContent url={url}></MainContent>
    </div>
  );
}

export default App;
