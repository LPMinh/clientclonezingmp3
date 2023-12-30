import Dropdown from "react-bootstrap/Dropdown";
import LoginModal from "./ModalLogin";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { DropdownButton, SplitButton } from "react-bootstrap";
import { APIAddSongToPlaylist, ApiFindPlaylistByUser } from "../api/indext";
import CustomAlert from "./CustomAlert";

function AddToListDropdown({songId}) {
    const [listPlaylist,setListPlaylist]=useState([]);
    const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
   
    const getPlaylistByUser=()=>{
        if(!localStorage.getItem("user")){
            return;
        }
        const id = JSON.parse(localStorage.getItem("user")).data.id;
        fetch(ApiFindPlaylistByUser+id)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setListPlaylist(data);
        })
    }
    const handleAddSongToList=(playlistId)=>{
        const payload={
            idSong:songId,
            idPlayList:playlistId
        }
        console.log(payload);
        fetch(APIAddSongToPlaylist,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        }).catch((error)=>{
            console.log(error);
        })
        handleShowAlert();
    }
    useEffect(
            ()=>{
             getPlaylistByUser();
            },[]   );
  return (
    <div style={{alignSelf:'center',backgroundColor:"#34224F"}}>
    {showAlert && <CustomAlert message="Thêm Thành Công" onClose={handleCloseAlert} />}
    <Dropdown style={{backgroundColor:"#34224F"}} >
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        color="#170F23"
        
        style={{ backgroundColor: "#170F23" }}
      >
        <FontAwesomeIcon icon={faEllipsis} style={{color: "#ffffff"}} />
      </Dropdown.Toggle>

     
        <Dropdown.Menu style={{backgroundColor:'##34224F'}}>
            
                <DropdownButton drop="end" title={"add to list"} style={{width:'100%' }}>
                    {listPlaylist.map((item)=>{
                        return (
                            <Dropdown.Item  eventKey={item.id} onClick={()=>{handleAddSongToList(item.id)}}>{item.name}</Dropdown.Item>
                        )
                    }
                    )}
                  
                </DropdownButton>
            
            
        </Dropdown.Menu>
    </Dropdown>
     
    </div>
  );
}

export default AddToListDropdown;
