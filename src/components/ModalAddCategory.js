import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ApiAllCategory } from "../api/indext";
import getToken from "../token/token";

function ModalAddCategory({showed,onHide,onRefresh}) {
  console.log(getToken());
    const [categoryName,setCategoryName]=useState("");
    useEffect(()=>{
       onRefresh();
    }
    ,[showed])
    const handleChangeName=(e)=>{
      console.log(e.target.value);
      setCategoryName(e.target.value);
    }
    const handleCreateCategory=()=>{
      console.log(categoryName);
        const categoryRequest={
            name:categoryName
        }
       const response= fetch(ApiAllCategory,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":"Bearer "+getToken()
            },
            body:JSON.stringify(categoryRequest)
        }).then((response)=>response.json())
        .then((response)=>{
            console.log(response);
            onHide();
        })
        .catch((error)=>{
            console.log(error);
        })
       
    }
   

    return ( <Modal show={showed} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm thể loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>tên thể loại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên playlist"
                onChange={(e)=>{handleChangeName(e)}}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={()=>{handleCreateCategory()}} >
              Tạo mới
            </Button>
          </Form>
        </Modal.Body>
      </Modal> );
}

export default ModalAddCategory;