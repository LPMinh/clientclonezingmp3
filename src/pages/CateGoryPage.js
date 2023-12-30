import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ApiAllArist, ApiAllCategory, ApiInsertArtist } from "../api/indext";
import { Button, Form, FormGroup, FormLabel, Modal } from "react-bootstrap";
import ModalAddCategory from "../components/ModalAddCategory";
import ModalSelectPlaylist from "../components/ModalSelectPlaylist";
//su dung bootstrap

function CategoryPage() {
  const [showModal, setShowModal] = useState(false);
  const [showModalSelect, setShowModalSelect] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleShowModalSelect = () => {
    setShowModalSelect(true);
  };
  const handleHideModalSelect = () => {
    setShowModalSelect(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleHideModal = () => {
    setShowModal(false);
  };
  const [refesh, setRefesh] = useState(false);
  const handleRefesh = () => {
    setRefesh(!refesh);
  };
  const [caterories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(ApiAllCategory);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const json = await response.json();
        console.log(json);
        setCategories(json);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategories();
  }, [refesh]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ModalSelectPlaylist
        showed={showModalSelect}
        onHide={handleHideModalSelect}
        category={selectedCategory}
        onRefresh={handleRefesh}
      />
      <ModalAddCategory
        showed={showModal}
        onHide={handleHideModal}
        onRefresh={handleRefesh}
      />
      <div className="input-search">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="xl"
          style={{ color: "#ffffff" }}
        />{" "}
        <input
          type="text"
          placeholder="Nhập tên thể loại"
          style={{ background: "none", border: "none", color: "white" }}
        ></input>
      </div>

      <button
        className="btn b"
        style={{ marginTop: 20, backgroundColor: "#8B45CA", color: "white" }}
        onClick={() => handleShowModal()}
      >
        Thêm thể loại
      </button>

      <table
        className="table table-dark border table-hover"
        style={{ marginTop: 60 }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên thể loại</th>
            <th>Số playlist</th>
            <th>Quản lý</th>
          </tr>
        </thead>
        <tbody>
          {caterories.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.categoryPlaylists.length}</td>
              <td>
                <button className="btn btn-danger">
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#fafafa" }}
                  />
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setSelectedCategory(item);
                    handleShowModalSelect();
                  }}
                >
                  thêm playlist
                </button>
                <button className="btn btn-success">Chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryPage;
