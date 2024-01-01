import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ApiAllArist } from "../api/indext";
import { useAppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function ModalSelectArtist({onHide, showed}) {
    const {state,dispatch}=useAppContext();
    const [artist, setArtist] = useState([]);
   
    const handleSelectArtist=(item)=>{

        
        dispatch({type:"ADD_ARTIST",payload:item});
       
    }
    const handleFilterArtist=(e)=>{
        const value=e.target.value;
        const filterArtist=artist.filter((item)=>{
            return item.fullName.toLowerCase().includes(value.toLowerCase());

    });
        setArtist(filterArtist);
    }
    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await fetch(ApiAllArist,);
                const data = await response.json();
                console.log(data);
                setArtist(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchArtist();
    }, []);
    return ( 

        <Modal show={showed} onHide={onHide} size="xl">
        <Modal.Header closeButton style={{ height: "100px" }}>
          <Modal.Title>Chọn nghệ sĩ tham gia</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "90vw", height: "90vh" }}>
            <div className='input-search' style={{width:'100%',height:'50px'}}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{ color: "#ffffff" }} />{' '}
                <input type='text' placeholder='Nhập tên nghệ sĩ' style={{ background: 'none', border: 'none', color: 'white' }} onChange={handleFilterArtist}></input>
            </div>
                
            <table className="table table-dark border table-hover" style={{ marginTop: 60 }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên nghệ sĩ</th>
                        <th>Hình Ảnh</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(artist) &&
                        artist.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.fullName}</td>
                                    <td>
                                        <img src={item.img} style={{ width: 100, height: 100 }} alt={item.fullName} />
                                    </td>
                                    <td>
                                        <button className="btn btn-warning" onClick={()=>{handleSelectArtist(item)}}>Chọn</button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        

      );
}

export default ModalSelectArtist;