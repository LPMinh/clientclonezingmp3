import { useEffect, useState } from "react";
import { getArtistsName } from "../common";
import { ApiFindSongPaging } from "../api/indext";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import '../styles/paging.css';
import { setListSong, useAppContext } from "../context/AppContext";

function SongPage() {
    const [songPage,setSongPage]=useState([]);
    const [pageCount,setPageCount]=useState(5);
    const [song,setSong]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const { state, dispatch } = useAppContext();
    const [listSong, setSongs] = useState([]);
    const songCurrent = state.currentSong.id;
    const listsong = state.listSong;
    useEffect(()=>{
       const fetchSong=async()=>{
              try {
                const response=await fetch(ApiFindSongPaging+"/"+currentPage).then((response) => response.json()).then
                    ((data) => {
                       
                        console.log(data);
                        dispatch(setListSong(data.songPage.content));
                        setPageCount(data.songPage.totalPages);
                       
                    }
                    ).catch((error) => {
                        console.log(error);
                      });
               
              } catch (error) {
                console.log(error);
              }
         }
            fetchSong();

        },[currentPage]);
        const handlePageClick = (event) => {
            setCurrentPage(event.selected);
          };

          const handleChangeSong = (index) => {
            dispatch({ type: "SET_CURRENT_SONG", payload: index });
          };
    
    return ( 
        <div style={{display:'flex',width:'100%',height:'100vh',flexDirection:'column' ,position:'relative' }}>
            
                
                
            <table className="table table-dark  table-hover table-responsive" style={{ marginTop: 60,display:'flex',height:'350px' ,overflow:'auto'}}>
            <thead >
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
                {Array.isArray(listsong) &&
            
                         listsong.map((item,index) => {
                        return (
                            <tr key={item.id} onClick={()=>handleChangeSong(index)}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
            
                                <td>
                                    <img src={item.img} style={{ width: 100, height: 100 }} alt={item.fullName} />
                                </td>
                              
                                <td>{item.releaseDate}</td>
                                <td>{getArtistsName(item)}</td>
                               
            
                            </tr>
                        );
                    })} 
            </tbody>
           
                </table>
                <ReactPaginate 
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination-container"
                pageClassName="pagination-page"
                activeClassName="pagination-active"
                breakClassName="pagination-break"
                previousClassName="pagination-previous"
                nextClassName="pagination-next"
            />
        </div>

     );
}

export default SongPage;