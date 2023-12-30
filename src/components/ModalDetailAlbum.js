import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { ApiFindSongByAlbumID } from "../api/indext";

function ModalDetailAlbum({show,handleClose,idalbum}) {
    const [song, setSong] = useState([]);
    
    
    const getArtistsName=(Song)=>{
        var listArtistNames = "";
        Array.from(Song.artists).forEach((item) => {
          listArtistNames += item.fullName + ",";
        });
    
        return listArtistNames;

    }


    useEffect(() => {
        const fetchSong = async () => {
            try {
                const response = await fetch(ApiFindSongByAlbumID+idalbum);
                const data = await response.json();
                console.log(data);
                setSong(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSong();
    }, [idalbum]);
    return ( 
        <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Danh sách bài hát</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

                                    
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>



     );
}

export default ModalDetailAlbum;