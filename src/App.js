import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar-filters/Sidebar';
import MainContent from './components/MainContent/MainContent';
import { useEffect, useState } from 'react';


function App() {

const [url, setUrl] = useState()


  return (
    <div className="App">
        <Header></Header>
        <Sidebar setUrl={setUrl}></Sidebar>
        <MainContent url={url}></MainContent>
    </div>
  );
}

export default App;
