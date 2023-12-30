import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ApiLogin } from "../api/indext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { resetRole, setRole, useAppContext } from "../context/AppContext";


function LoginModal({ showed, onHide ,role}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState(false);
  const {state,dispatch}=useAppContext();
  const navigate=useNavigate();
 
  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  
  const handleLogin = () => {
    const fetchLogin =  () => {
      fetch(ApiLogin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((response) => response.json()).then((data) => {
        if(data?.token){

            localStorage.setItem("user",JSON.stringify(data));
            const decoded = jwtDecode(data.token);
            console.log(role);
            console.log(decoded);
           
           if(role==='ALL'){
              
              window.location.reload();
              
           }
           else if(Array.from(decoded.roles).includes(role)){
                if(role==='USER'){
                  dispatch(resetRole());
                  dispatch(setRole('USER'));
                   onHide();
                  
                }
                else{
                  dispatch(setRole('ADMIN'));
                  navigate('/admin');
                  onHide();
                  
                }
           }else{
            setError('Bạn không có quyền truy cập');
           }

            
        }
      });
    };
    fetchLogin();
  };

  return (
    <Modal show={showed} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Đăng nhập</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên đăng nhập"
              onChange={(e) => handleEmail(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => handlePassword(e)}
            />
          </Form.Group>
          {error&&<p style={{color:'red'}}>{error}</p>}
          <Button variant="primary" type="button" onClick={()=>handleLogin()}>
            Đăng nhập
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
