
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../context/AppContext";
import MenuBarAdmin from "./MenuBarAdmin";
import MenuBar from "./Menubar";
import { useEffect, useState } from "react";

function NavCustom() {
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
       <div>
               
               {isAdmin?<MenuBarAdmin/>:<MenuBar/>}
       </div>
     );
}

export default NavCustom;