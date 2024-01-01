import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { ApiInsertPlaylist } from "../api/indext";
import ModalAddSongToList from "./ModalAddSongToList";

function ModalCreatePlaylist({ showed, onHide, showModalAddSong,onReload }) {
  const [playlistName, setPlaylistName] = useState("");
  const [showModalAddSongToList, setShowModalAddSongToList] = useState(false);
  const [playlist, setPlaylist] = useState();
  const handleShowModalAddSongToList = (playlist) => {
    setShowModalAddSongToList(true);
    setPlaylist(playlist);
  };
  const handleCloseModalAddSongToList = () => {
    setShowModalAddSongToList(false);
  };
  const handleChangeName = (e) => {
    console.log(e.target.value);
    setPlaylistName(e.target.value);
  };

  const handleCreatePlaylist = () => {
    const email = JSON.parse(localStorage.getItem("user")).data.email;
    console.log(email);
    const payload = {
      name: playlistName,
      email: email,
    };
    fetch(ApiInsertPlaylist, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (showModalAddSong) {
          handleShowModalAddSongToList(data);
        }
        onHide();
        onReload();
      });
  };

  return (
    <div>
      <ModalAddSongToList
        playlist={playlist}
        showed={showModalAddSongToList}
        onHide={handleCloseModalAddSongToList}
      />
      <Modal show={showed} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>tên playlist</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên playlist"
                onChange={(e) => {
                  handleChangeName(e);
                }}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              onClick={() => {
                handleCreatePlaylist();
              }}
            >
              Tạo mới
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalCreatePlaylist;
