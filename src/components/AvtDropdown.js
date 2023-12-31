import Dropdown from "react-bootstrap/Dropdown";
import LoginModal from "./ModalLogin";
import { useEffect, useState } from "react";
import { resetRole, useAppContext } from "../context/AppContext";
import ModalRegister from "./ModelRegister";

function AvtDropdown() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userImageDefaul="https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png"
    const [showRegister,setShowRegister]=useState(false);
    const handleShowRegister=()=>{
        setShowRegister(true);
    }
    const handleCloseRegister=()=>{
        setShowRegister(false);
    }

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
    const{state,dispatch}=useAppContext();
    const [showed,setShowed]=useState(false);
    const handleShow=()=>{
        setShowed(true);
    }
    const handleClose=()=>{
        setShowed(false);
    }
    const handleLogout=()=>{
        dispatch(resetRole());


        localStorage.removeItem("user");
        window.location.reload();
       
    }
  return (
    <div style={{position:'absolute', zIndex:1000}}>
    <LoginModal showed={showed} onHide={handleClose} role={"ALL"}/>
    <ModalRegister handleClose={handleCloseRegister} show={showRegister}/>
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        style={{ backgroundColor: "#170F23" }}
      >
        <img
          src={user !== null ? user.data.avatar : userImageDefaul}
          style={{ width: "50px", height: "50px" ,borderRight:'1px solid white',borderRadius:'50%'}}
        />
      </Dropdown.Toggle>

      {user !== null ? (
        <Dropdown.Menu >
            <Dropdown.Item href="/profile">{user.data.name}</Dropdown.Item>
            <Dropdown.Item onClick={()=>{handleLogout()}}>Đăng xuất</Dropdown.Item>
            {isAdmin?<Dropdown.Item href="/admin">Quản lý trang web</Dropdown.Item>:null}
        </Dropdown.Menu>
      ) : (
        <Dropdown.Menu >
            <Dropdown.Item onClick={()=>{handleShow()}}>Đăng nhập</Dropdown.Item>
            <Dropdown.Item onClick={()=>{handleShowRegister()}}>Đăng ký</Dropdown.Item>
        </Dropdown.Menu>
      )}
     
    </Dropdown>
    </div>
  );
}

export default AvtDropdown;
