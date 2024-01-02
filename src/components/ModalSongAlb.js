import { useEffect, useState } from "react";
import { ApiInsertArtist, ApiInsertSong } from "../api/indext";
import { Button, Form, FormGroup, Modal, Row } from "react-bootstrap";
import "../styles/modalsongalbum.css";
import { deleteSongSave, resetSongSave, useAppContext } from "../context/AppContext";
import getToken from "../token/token";

function ModelSongAlbum({
  nameAlbum,
  logoAlbum,
  showed,
  onHide,
  onChoose,
  album,
}) {
  const { state, dispatch } = useAppContext();

  const artist = state.artistSelected;
  const songSave = state.songsSave;
  console.log(songSave);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [mp3, setMp3] = useState(null);
  const [show, setShow] = useState();
  const [previewImage, setPreviewImage] = useState(null);
 
  const [errorImage, setErrorImage] = useState("");
  const [errorMp3, setErrorMp3] = useState("");
  const [errorArtist, setErrorArtist] = useState("");
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (image) {
      setPreviewImage(URL.createObjectURL(image));
    }
  }, [image]);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setImage(file);
      setPreviewImage(fileReader.result);
    };
  };
  const handleReset = () => {
    setName("");
    
   
  };
  const validate = () => {
    let check = true;
    if (!image) {
      setErrorImage("Hình ảnh không được để trống");
      check = false;
    } else {
      setErrorImage("");
    }
    if (!mp3) {
      setErrorMp3("File nhạc không được để trống");
      check = false;
    } else {
      setErrorMp3("");
    }
    if (artist.length === 0) {
      setErrorArtist("Nghệ sĩ không được để trống");
      check = false;
    } else {
      setErrorArtist("");
    }
    return check;
  };
  const handleChangeMp3 = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setMp3(file);
    };
  };
  var handleArtistSelected = () => {
    var listArtistNames = "";
    Array.from(artist).forEach((item) => {
      listArtistNames += item.fullName + ",";
    });

    return listArtistNames;
  };
  var handleArtistSelectedID = () => {
    var listArtistID = [];
    Array.from(artist).forEach((item) => {
      listArtistID.push(item.id);
    });
    return listArtistID;
  };
  const handleAddSong = () => {
    if (!validate()) {
      return;
    }
    

    const payload = {
      name: name,
      image: image,
      mp3: mp3,
      previewImage: previewImage,
      listArtistID: handleArtistSelectedID(),
      listArtistName: handleArtistSelected(),
    };
    dispatch({ type: "SET_SONG_SAVE", payload: payload });
    dispatch({ type: "RESET_ARTIST_SELECTED" });
    handleReset();
  };
  const fetchSaveSong = async (song) => {
    try {
      const formData = new FormData();
      formData.append("name", song.name);
      formData.append("image", song.image);
      formData.append("mp3", song.mp3);
      formData.append("idAlbum", album.id);
      const listId = Array.from(song.listArtistID);

      listId.forEach((item) => {
        formData.append("idArtist[]", item);
      });
      const response = fetch(ApiInsertSong, {
        method: "POST",
        body: formData,
        enctype: "multipart/form-data",
        headers:{
          "authorization":"Bearer "+getToken()
        }
      });
      if (response.ok) {
        console.log(response.json());
        dispatch({ type: "RESET_ARTIST_SELECTED" });
        
       
      } else {
        setError("thêm thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        songSave.map(async (item) => {
          await fetchSaveSong(item);
        })
      );
    } catch (error) {
      console.error(error);
    }
    dispatch(resetSongSave());
    onHide();
  };
  return (
    <Modal show={showed} onHide={onHide} size="xl">
      <Modal.Header closeButton style={{ height: "100px" }}>
        <Modal.Title>Thêm bài hát vào album</Modal.Title>
        <div style={{ width: "100%" }}>
          <img src={logoAlbum} style={{ width: 50, height: 50 }}></img>
          <h6>{nameAlbum}</h6>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            {/* Form */}
            <div className="col-md-6">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                encType="multipart/form-data"
              >
                <FormGroup className="formgroup">
                  <label>Tên bài hát</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Artist Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />
                </FormGroup>
                <FormGroup className="formgroup">
                  <label>Ảnh nền</label>
                  <input
                    name="avatar"
                    type="file"
                    accept=".jpg, .jpeg, .png, .gif, .webp"
                    placeholder="Hình ảnh"
                    onChange={handleChangeImage}
                  />
                  <span>{errorImage}</span>
                </FormGroup>

                <FormGroup className="formgroup">
                  <label>File nhạc</label>
                  <input
                    name="mp3"
                    type="file"
                    accept=".mp3"
                    placeholder="file nhạc"
                    onChange={handleChangeMp3}
                  />
                  <span>{errorMp3}</span>
                </FormGroup>
                <FormGroup className="formgroup">
                  <label>Các nghệ sĩ tham gia</label>
                  <input disabled value={handleArtistSelected()}></input>
                  <span>{errorArtist}</span>
                  <button onClick={onChoose}>Chọn</button>
                </FormGroup>
                {/* ... other form groups ... */}
                <button
                  className="btn"
                  type="button"
                  style={{
                    marginTop: 20,
                    backgroundColor: "#8B45CA",
                    color: "white",
                  }}
                  onClick={handleAddSong}
                >
                  Thêm bài hát
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="col-md-6">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên bài hát</th>
                    <th>Hình Ảnh</th>
                    <th>Các nghệ sĩ</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(songSave) &&
                    songSave.map((item, index) => (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{item.name}</td>
                        <td>
                          <img
                            src={item.previewImage}
                            style={{ width: 100, height: 100 }}
                            alt={item.name}
                          />
                        </td>
                        <td>{item.listArtistName}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              dispatch(deleteSongSave(index));
                            }}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Lưu những thay đổi
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModelSongAlbum;
