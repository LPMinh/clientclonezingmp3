import { Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from "../Layouts/DefaultLayout";
import Home from "../pages/HomePage";
import DetailAlbum from "../pages/DetailAlbum";
import DetailPlayList from "../pages/DetailPlaylist";
import CategoryPage from "../pages/CateGoryPage";
import Artist from "../pages/ArtistPage";
import DetailArtist from "../pages/DetailPage";
import { useAppContext } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import AdminPage from "../pages/AdminPage";
import { Nav } from "react-bootstrap";
import NotFoundPage from "./NotFoundPage";
import { jwtDecode } from "jwt-decode";
import SongPage from "../pages/SongPage";

function RouteAu() {
   const [isAdmin,setIsAdmin]=useState(false);
   const handleAuth=()=>{

            const checkAdmin=()=>{
                const authoriezed=JSON.parse(localStorage.getItem('user'))?.data?.authorities;
                Array.from(authoriezed).forEach((item)=>{
                    if(item.authority==='ADMIN'){
                        setIsAdmin(true);
                    }
                })

            }
            if(localStorage.getItem('user')!=null){
                checkAdmin();
            }
           
           
        
   }

   useEffect(() => {
         handleAuth();
    }
    , [])


    

   
    return ( 

        <Routes>
        <Route path='/' element={<DefaultLayout><Home/></DefaultLayout>}  ></Route>
        <Route path='/album/:id' element={<DefaultLayout><DetailAlbum/></DefaultLayout>}  ></Route>
        <Route path='/playlist/:id' element={<DefaultLayout><DetailPlayList/></DefaultLayout>}></Route>
        <Route path='/song' element={<DefaultLayout><SongPage/></DefaultLayout>}></Route>
        {isAdmin && <Route path='/admin' element={<AdminLayout><AdminPage/></AdminLayout>} ></Route>
        }
        
         {isAdmin  &&   <Route path='/admin/caterogy' element={<AdminLayout><CategoryPage/></AdminLayout>}></Route>} 
         {isAdmin  &&   <Route path='/admin/artist' element={<AdminLayout><Artist/></AdminLayout>}></Route>} 
         {isAdmin  &&    <Route path='/admin/artist/:id' element={<AdminLayout><DetailArtist/></AdminLayout>}></Route>} 
         
         <Route path='*' element={<DefaultLayout><NotFoundPage/></DefaultLayout>}  ></Route>
        
       
        </Routes>
        
     );
}

export default RouteAu;

