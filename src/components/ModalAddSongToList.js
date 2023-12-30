import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ApiAddPlaylistToCategory, ApiAllPlaylist, ApiAllSong, ApiFindAllSOng } from "../api/indext";
import { removePlaylistSelected, resetListPlaylistSelected, updateListPlaylistSelected, useAppContext } from "../context/AppContext";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomAlert from "./CustomAlert";
import getToken from "../token/token";

function ModalAddSongToList({showed,onHide,playlist,onRefresh}) {
    const {state,dispatch}=useAppContext();
    const [song, setSong] = useState([]);
    const [temp,setTemp]=useState([]);
    const playlistSelected=state.listPlaylistSelected;
    const handleCheckSongSelected=(id)=>{
        const index=playlistSelected.findIndex((item)=>item===id);
        if(index===-1){
            return false;
        }
        return true;
    }
   
    
    const getArtistsName = (Song) => {
        var listArtistNames = "";
        Array.from(Song.artists).forEach((item) => {
          listArtistNames += item.fullName + ",";
        });
        return listArtistNames.substring(0, listArtistNames.length - 1);
      };

    useEffect(() => {
        const fetchSong=async()=>{
            fetch(ApiFindAllSOng).then((response) => response.json()).then((data) => {
                setSong(data);
                console.log(data);
              }).catch((error) => {
                console.log(error);
              });
            
        }
        fetchSong();

    },[]);
    const handleFilterSong=(e)=>{
    };
    const handleSave=async()=>{
        const fetchAddSongToPlaylist=async(idSong)=>{
            await fetch(ApiAddPlaylistToCategory,{
                method:'POST'
                ,headers:{
                    'Content-Type':'application/json',
                    "authorization":"Bearer "+getToken()
                },
                body:JSON.stringify({
                    playlistId:playlist.id,
                    songId:idSong
                })
            }).then((response)=>{
                if(response.ok){
                    console.log(response);
                    
                    onHide();
                }
            })
        }
        playlistSelected.forEach((item)=>{
            console.log(item);
            fetchAddSongToPlaylist(item);
        })
        dispatch(resetListPlaylistSelected());
    }

    return (
        <Modal show={showed} onHide={onHide} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Chọn bài hát cho {playlist?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='input-search' style={{width:'100%',height:'50px'}}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{ color: "#ffffff" }} />{' '}
                <input type='text' placeholder='Nhập tên bài hát cần tìm' style={{ background: 'none', border: 'none', color: 'white' }} onChange={handleFilterSong}></input>
            </div>
            
            <button className="btn btn-success" style={{marginTop:20}} onClick={()=>{handleSave()}}>Lưu</button>
            <table className="table table-dark border table-hover table-responsive" style={{ marginTop: 60 }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên bài hát</th>
                        <th>Hình Ảnh</th>
                        <th>Audio</th>
                        <th>Ngày phát hành</th>
                        <th>danh sách nghệ sĩ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(song) &&
                    
                        song.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                    
                                    <td>
                                        <img src={item.img} style={{ width: 100, height: 100 }} alt={item.fullName} />
                                    </td>
                                    <td>
                                        <audio controls>
                                            <source src={item.mp3} type="audio/mpeg" />
                                        </audio>
                                    </td>

                                    <td>{item.releaseDate}</td>
                                    <td>{getArtistsName(item)}</td>
                                    <td>
                                        {handleCheckSongSelected(item.id)===false?
                                        <button className="btn btn-success" onClick={()=>{dispatch(updateListPlaylistSelected(item.id))}}>Chọn</button>
                                        :
                                        <button className="btn btn-danger" onClick={()=>{dispatch(removePlaylistSelected(item.id))}}>Đã chọn</button>
                            }
                                    </td>

                                    
                                </tr>
                            );
                        })}
                </tbody>
            </table>
          
        </Modal.Body>
      </Modal> 
    );
}
export default ModalAddSongToList;
   
    
  

