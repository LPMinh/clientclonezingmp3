
import { useCallback, useEffect, useReducer, useState } from 'react';
import { BrowserRouter  as Router,RouterProps,Route, Routes, Link} from 'react-router-dom';
import DefaultLayout from './Layouts/DefaultLayout';
import Home from './pages/HomePage';
import "./App.css";
import { AppContextProvider } from './context/AppContext';
import AdminLayout from './Layouts/AdminLayout';
import AdminPage from './pages/AdminPage';
import Artist from './pages/ArtistPage';
import DetailArtist from './pages/DetailPage';
import DetailAlbum from './pages/DetailAlbum';
import DetailPlayList from './pages/DetailPlaylist';
import CategoryPage from './pages/CateGoryPage';
import MenuBar from './components/Menubar';
import RouteAuth from './components/RouteAuth';
import RouteAu from './components/RouteAuth';
import NavCustom from './components/NavCustom';
import { jwtDecode } from 'jwt-decode';

function App() {

   
  return (
    <AppContextProvider>
      <Router>
        <nav>
          <NavCustom/>
        </nav>
        <div className='app'>
          <RouteAu/>
        </div>
      </Router>
      </AppContextProvider>      
  )
}

export default App;
