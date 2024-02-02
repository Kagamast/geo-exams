import './App.scss';
import { Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/homePage.component';
import GoToPage from './components/goTo/goToPage.component';
import PlayPage from './components/playPage/playPage.component';
import PageNotFound from './components/pageNotFound/pageNotFound.component';

function App() {
  return (
    // <div className="App">
    //   <HomePage/>
    // </div>
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path='goto/*' element={<GoToPage/>}/>
      <Route path='play/*' element={<PlayPage/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
  );
}

export default App;
