import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ApiAddPlaylistToCategory, ApiAllPlaylist } from "../api/indext";
import { removePlaylistSelected, resetListPlaylistSelected, updateListPlaylistSelected, useAppContext } from "../context/AppContext";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomAlert from "./CustomAlert";

function ModalSelectPlaylist({showed,onHide,category,onRefresh}) {
    const {state,dispatch}=useAppContext();
    const [temp,setTemp]=useState([]);
    const playlistSelected=state.listPlaylistSelected;
    const [showCustomerAler,setShowCustomerAler]=useState(false);
    const handleShowModal=()=>setShowCustomerAler(true);
    
    const handleHideModal=()=>setShowCustomerAler(false);
    
    console.log(playlistSelected);
    const [playlist,setPlaylist]=useState([]);
    const checkPlaylistSelected=(id)=>{
        const index=playlistSelected.findIndex((item)=>item===id);
        if(index===-1){
            return false;
        }
        return true;
    }
    const handleFilterPlayList=(e)=>{
        const value=e.target.value;
        if(value===''){
            setPlaylist(temp);
            return;
        }
        const filterPlaylist=playlist.filter((item)=>{
            return item.name.toLowerCase().includes(value.toLowerCase());
            
        })
        setPlaylist(filterPlaylist);
        
        
    }
    const handleSelectPlaylist=(id)=>{
        dispatch(updateListPlaylistSelected(id));
    }
    const handleRemovePlaylist=(id)=>{
        dispatch(removePlaylistSelected(id));
    }
    const handleSave=async()=>{
        const fetchAddPlaylistToCategory=async(idPlaylist)=>{
            await fetch(ApiAddPlaylistToCategory,{
                method:'POST'
                ,headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    categoryId:category.id,
                    playlistId:idPlaylist
                })
            }).then((response)=>{
                if(response.ok){
                    console.log(response);
                }
            }).catch((error)=>{
                console.log(error.message);
            })
        }
        await Promise.all( playlistSelected.map(async (item)=>{
            await  fetchAddPlaylistToCategory(item);
            
         })).then(()=>{
             handleShowModal();
             dispatch(resetListPlaylistSelected());
             
             onHide();
             onRefresh();

         })
        
        
       

    }

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await fetch(ApiAllPlaylist);
    
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
    
                const json = await response.json();
                console.log(json);
                setPlaylist(json);
                setTemp(json);
            } catch (error) {
                console.log(error.message);
            }
        };
    
        fetchPlaylist();
    }, [category]);
    useEffect(()=>{
       dispatch(resetListPlaylistSelected());
    }
    ,[category])
    return ( <Modal show={showed} onHide={onHide}>
       
        <Modal.Header closeButton>
          <Modal.Title>Chọn playlist cho {category?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='input-search' style={{width:'100%',height:'50px'}}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{ color: "#ffffff" }} />{' '}
                <input type='text' placeholder='Nhập tên playlist cần tìm' style={{ background: 'none', border: 'none', color: 'white' }} onChange={handleFilterPlayList}></input>
            </div>
            
            <button className="btn btn-success" style={{marginTop:20}} onClick={()=>{handleSave()}}>Lưu</button>
            <table className="table table-dark border table-hover" style={{ marginTop: 60 }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên playlist</th>
                        <th>Ngày tạo</th>
                        <th>Số bài hát</th>
                        <th>Quản lý</th>                        
                    </tr>
                </thead>
                <tbody>
                    {
                        playlist.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.date}</td>
                                    <td>{item.songs.length}</td>
                                    <td>
                                        {checkPlaylistSelected(item.id)?
                                        <button className="btn btn-danger" onClick={()=>handleRemovePlaylist(item.id)}>đã chọn</button>
                                        :
                                        <button className="btn btn-success" onClick={()=>handleSelectPlaylist(item.id)}>Chọn</button>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
               
                    
                </tbody>
            </table>
          
        </Modal.Body>
      </Modal> );
}

export default ModalSelectPlaylist;