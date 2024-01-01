import { useParams } from 'react-router-dom';
import '../styles/pagesearch.css';
import { useEffect, useState } from 'react';
import { ApiSearch } from '../api/indext';
import AddToListDropdown from '../components/AddToListDropdown';
function PageSearch() {
    const {query}=useParams();
    const [data,setData]=useState({});
    useEffect(() => {
        const fetchSearch =  () => {
            fetch(ApiSearch + query)
                .then((response) => { return response.json() })
                .then((data) => { setData(data);console.log(data) });
        }
        
        fetchSearch();
    }
    , [query])
    


  
    return ( 
        <div className="page-search">
            <div className='menu-fitler'>
                <li>Tất cả</li>
                <li>Bài hát</li>
                <li>Album</li>
                <li>Nghệ sĩ</li>
                <li>MV</li>
            </div>
            <div className="list-song">
                <h1>Bài hát</h1>
                {data.song !== undefined && data.songs?.length===0 && <h3>Không có bài hát nào</h3>}
                <div className="song-container">
                    {data?.songs?.map((item,index)=>{
                        return(
                            <div className="song">
                                <img src={item.img} alt="" style={{width:'100px',height:'100px',objectFit:'contain'}}></img>
                                <div className="song-info">
                                    <h3>{item.name}</h3>
                                    <p>{item.artists[0].fullName}</p>
                                </div>
                                <div className="song-icon">
                                    <AddToListDropdown song={item}/>
                                </div>
                            </div>
                        )
                    }
                    )}
                 </div>   

            </div>
            { <div className="list-album">
                <h1>Album</h1>
                {data.albums?.length===0 && <h3>Không có album nào</h3>}
                <div className="album-container">
                    { data?.albums?.map((item,index)=>{
                        return(
                            <div className="album">
                                <img src={item?.img} alt="" style={{width:'100px',height:'100px',objectFit:'contain'}}></img>
                                <div className="album-info">
                                    <h3>{item?.name}</h3>
                                    
                                </div>
                                <div className="album-icon">
                                    <AddToListDropdown song={item}/>
                                </div>
                            </div>
                        )
                    }
                    )}
                 </div>

                </div>
                }
                <div className="list-artist">
                <h1>Nghệ sĩ</h1>
                {data.artists?.length===0 && <h3>Không có nghệ sĩ nào</h3>}
                <div className="artist-container">
                    { data?.artists?.map((item,index)=>{
                        return(
                            <div style={{width:'100%',flexDirection:'column'}}>
                                <img src={item?.img} alt="" style={{width:'100px',height:'100px',objectFit:'contain' ,borderRadius:'50%'}}></img>
                                
                                <div style={{width:'100%'}} className="artist-info">
                                    <h4>{item?.fullName}</h4>
                                    
                                </div>
                               
                            </div>
                        )
                    }
                    )}
                 </div>
                 </div>
            
        </div>

     );
}

export default PageSearch;