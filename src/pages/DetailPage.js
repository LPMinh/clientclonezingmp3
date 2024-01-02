import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  ApiFindAlbumsByArtistID,
  ApiFindArtistById,
  ApiInsertAlbum,
} from "../api/indext";
import "../styles/detailartist.css";
import ModelSongAlbum from "../components/ModalSongAlb";
import ModalSelectArtist from "../components/ModalSelectArtist";
import ModalDetailAlbum from "../components/ModalDetailAlbum";
import getToken from "../token/token";

function DetailArtist() {
  const [artist, setArtist] = useState();
  const [albums, setAlbum] = useState();
  const [albumSave,setAlbumSave]=useState();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [showModalSongAlbum, setShowModalSongAlbum] = useState(false);
  const [showModalSelectedArtist, setShowModalSelectedArtist] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [success, setSucces] = useState(false);
  const [error, setError] = useState(null);
  const [re,setRe]=useState(false);
  const [idAlbumSelected,setIdAlbumSelected]=useState();
  const [showModalDetailAlbum,setShowModalDetailAlbum]=useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowModalSongAlbum = () => setShowModalSongAlbum(true);
  const handleHideModalSongAlbum = () => setShowModalSongAlbum(false);
  const handleShowModalDetailAlbum=()=>setShowModalDetailAlbum(true);
  const handleHideModalDetailAlbum=()=>setShowModalDetailAlbum(false);
  const handleReset = () => setRe(!re);
  const handleShowModalSelectedArtist = () => setShowModalSelectedArtist(true);
  const handleHideModalSelectedArtist = () => setShowModalSelectedArtist(false);

 
  
  useEffect(() => {
    if(success){
      handleShowModalSongAlbum();
    }
  }, [success]);

  const handleChangeModal=()=>{
    handleClose();
    handleShowModalSongAlbum();
    handleReset();
    
  }

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setImage(file);
      setPreviewImage(fileReader.result);
    };
  };

  const handleShowDetailAlbum=(id)=>{
    setIdAlbumSelected(id);
    handleShowModalDetailAlbum();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("idArtist", id);

      const response = await fetch(ApiInsertAlbum, {
        method: "POST",
        body: formData,
        headers:{
          "authorization":"Bearer "+getToken()
        }
        
      }).then((response) => response.json()).then((data) => {
        setAlbumSave(data);
        handleChangeModal();
      });
    
    } catch (error) {
      console.error("Error:", error);
    }

  };

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(ApiFindArtistById + id);
        if (response.ok) {
          const data = await response.json();
          
          setArtist(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAlbum = async () => {
      try {
        const respone = await fetch(ApiFindAlbumsByArtistID + id);
        if (respone.ok) {
          const data = await respone.json();
         
          setAlbum(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtist();
    fetchAlbum();
  }, [re,showModalSongAlbum]);
  return (
    <div className="detailartist">
      <ModalDetailAlbum  show={showModalDetailAlbum} idalbum={idAlbumSelected} handleClose={handleHideModalDetailAlbum}/>
      <ModelSongAlbum
        showed={showModalSongAlbum}
        nameAlbum={name}
        logoAlbum={previewImage}
        onHide={handleHideModalSongAlbum}
        onChoose={handleShowModalSelectedArtist}
        album={albumSave}
       
      />
      <ModalSelectArtist showed={showModalSelectedArtist} onHide={handleHideModalSelectedArtist} ></ModalSelectArtist>
      <h1>Detail Artist</h1>
      {artist !== undefined && artist !== null && artist !== "" && (
        <table
          className="table table-dark border table-hover"
          style={{ marginTop: 60 }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên nghệ sĩ</th>
              <th>Hình Ảnh</th>
            </tr>
          </thead>
          <tbody>
            {artist !== undefined && artist !== null && artist !== "" && (
              <tr>
                <td>{artist.id}</td>
                <td>{artist.fullName}</td>
                <td>
                  <img
                    src={artist.img}
                    style={{ width: 100, height: 100 }}
                    alt={artist.fullName}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {artist === undefined && (
        <h1 style={{ color: "white" }}>Không tìm thấy thông tin</h1>
      )}
      <h3 style={{ color: "white" }}>Danh sach cac album</h3>
      <button
        className="btn btn-warning"
        style={{ marginBottom: 20 }}
        onClick={handleShow}
      >
        Thêm album
      </button>

      {albums === undefined && (
        <h6 style={{ color: "white" }}>Không có album nào</h6>
      )}
      {albums !== undefined && albums !== null && albums !== "" && (
        <table
          className="table table-dark border table-hover"
          style={{ marginTop: 60 }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Album</th>
              <th>Ngày phát hành</th>
              <th>Ảnh</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(albums) &&
              albums.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.releaseDate}</td>
                    <td>
                      <img
                        src={item.img}
                        style={{ width: 100, height: 100 }}
                        alt={item.fullName}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={()=>{handleShowDetailAlbum(item.id)}}
                      >
                        Chi tiết bài hát
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <FormGroup
              style={{
                width: "100%",
                height: "50%",
                padding: 20,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <label style={{ width: "50%", height: "100%" }}>Tên Album</label>
              <input
                name="name"
                style={{ width: "50%", height: "100%" }}
                type="text"
                placeholder="Artist Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup
              style={{
                width: "100%",
                height: "50%",
                padding: 20,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <label style={{ width: "50%", height: "100%" }}>Ảnh bìa</label>
              <input
                name="avatar"
                style={{ width: "50%", height: "100%" }}
                type="file"
                accept=".jpg, .jpeg, .png, .gif, .webp"
                placeholder="Hình ảnh"
                onChange={handleChangeImage}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  style={{ width: 100, height: 100 }}
                ></img>
              )}
            </FormGroup>
            <FormGroup
              style={{
                width: "100%",
                height: "50%",
                padding: 20,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: "red" }}>{error}</span>
            </FormGroup>

            <button
              className="btn"
              type="submit"
              style={{
                marginTop: 20,
                backgroundColor: "#8B45CA",
                color: "white",
              }}
              onClick={handleSubmit}
            >
              Lưu
            </button>
          </Form>
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
    </div>
  );
}

export default DetailArtist;
