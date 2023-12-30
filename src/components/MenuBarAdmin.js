import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/menubaradmin.css";
import {
  faBars,
  faChartSimple,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ModalCreatePlaylist from "./ModalCreatePlaylist";
import LoginModal from "./ModalLogin";
import ModalAddSongToList from "./ModalAddSongToList";
import { Link } from "react-router-dom";
function MenuBarAdmin() {
  const [selected, setSelected] = useState(null);
  const [showModalCreatePlaylist,setShowModalCreatePlaylist]=useState(false);
  const [showModalAddSong,setShowModalAddSong]=useState(false);
  const [showModalLogin,setShowModalLogin]=useState(false);
  const [listPlaylist,setListPlaylist]=useState([]);
  const user=JSON.parse(localStorage.getItem("user"));

  const handleShowModalCreatePlaylist=()=>{
      if(localStorage.getItem("user")){
          setShowModalCreatePlaylist(true);
      }else{
          setShowModalLogin(true);
      }
  }
 
  
  return (
    <div className="menubar">
        
         <ModalCreatePlaylist showed={showModalCreatePlaylist} onHide={()=>setShowModalCreatePlaylist(false)} showModalAddSong={true}/>
        <LoginModal showed={showModalLogin} onHide={()=>setShowModalLogin(false)}/>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/ZingMP3logo.svg/1280px-ZingMP3logo.svg.png"
        style={{ height: "auto", maxWidth: "100%", padding: 10 }}
      ></img>
      <ul>
        <li
          style={{ backgroundColor: selected === 1 ? "#3A3344" : "#231B2E" }}
          onClick={() => setSelected(1)}
        >
          <Link className="menu-item" to={"/admin/artist"} >
            <FontAwesomeIcon
              icon={faCompactDisc}
              style={{ color: "#fcfcfc" }}
            />{" "}
            &nbsp; Nghệ Sĩ
          </Link>
        </li>

        <li
          style={{ backgroundColor: selected === 2 ? "#3A3344" : "#231B2E" }}
          onClick={() => setSelected(2)}
        >
          <Link className="menu-item"  to={"/admin/caterogy"}>
            <FontAwesomeIcon
              icon={faChartSimple}
              style={{ color: "#ffffff" }}
            />{" "}
            &nbsp; Thể Loại
          </Link>
        </li>
        <li
          style={{ backgroundColor: selected === 3 ? "#3A3344" : "#231B2E" }}
          onClick={() => setSelected(3)}
        >
          <Link className="menu-item">
            <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff" }} />{" "}
            &nbsp; Bài Hát
          </Link>
        </li>
        <li style={{backgroundColor: selected===3?"#3A3344":"#231B2E"}}><div className="menu-item" onClick={()=>{handleShowModalCreatePlaylist()}}>
            <FontAwesomeIcon icon={faBars} style={{color: "#ffffff",}}/> &nbsp;  Thêm Playlist </div>
        </li>
      </ul>
    </div>
  );
}

export default MenuBarAdmin;
