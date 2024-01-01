import { useState } from "react";
import { Form, FormGroup, Modal } from "react-bootstrap";
import { ApiRegister } from "../api/indext";

function ModalRegister({show, handleClose}) {
    const [name, setName] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState('');
    const[email,setEmail]=useState('');
    const [role, setRole] = useState("USER");
    const [error,setError]=useState(null);
    const handleChangeImage =(e)=>{
        const file=e.target.files[0];
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend=()=>{
            setImage(file);
            setPreviewImage(fileReader.result);
        } 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
           
            const formData = new FormData();
            formData.append('name', name);
            formData.append('avatar', image);
            formData.append('password', password);
            formData.append('email', email);
            formData.append('role', role);
    
            const response = await fetch(ApiRegister, {
                headers:{
                  
                    enctype: "multipart/form-data",
                },
                method: 'POST',
                body: formData,
            }).then((response) => response.json()).then((data) => {
                if(data?.token){
                   
                   handleClose();
                }else{
                    setError("Đăng ký thất bại");
                }
            })

           
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
            

    return (  
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Đăng Ký</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <Form style={{display:'flex',width:'100%',height:'100%',flexDirection:'column'}} onSubmit={handleSubmit}  encType="multipart/form-data">
                    <FormGroup style={{width:'100%',height:'50%',padding:20,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <label  style={{width:'50%',height:'100%'}}>Email</label>
                        <input name="email" style={{width:'50%',height:'100%'}} type="text" placeholder="Nhập Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    </FormGroup>
                    <FormGroup style={{width:'100%',height:'50%',padding:20,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <label  style={{width:'50%',height:'100%'}}>Password</label>
                        <input name="password" style={{width:'50%',height:'100%'}} type="text" placeholder="Nhập password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </FormGroup>
                    <FormGroup style={{width:'100%',height:'50%',padding:20,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <label  style={{width:'50%',height:'100%'}}>Họ tên</label>
                        <input name="name" style={{width:'50%',height:'100%'}} type="text" placeholder="Họ tên" onChange={(e)=>{setName(e.target.value)}}/>
                    </FormGroup>
                    <input type="hidden" name="role" value="USER" />
                    <FormGroup style={{width:'100%',height:'50%',padding:20,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <label style={{width:'50%',height:'100%'}}>Ảnh đại diện</label>
                        <input name="avatar" style={{width:'50%',height:'100%'}}  type="file"  accept=".jpg, .jpeg, .png, .gif, .webp" placeholder="Hình ảnh" onChange={handleChangeImage}/>
                        {previewImage && <img src={previewImage} style={{width:100,height:100}}></img>}
                    </FormGroup>
                    
                    <FormGroup style={{width:'100%',height:'50%',padding:20,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <span style={{color:'red'}}>{error}</span>
                    </FormGroup>

                 
                    
                    <button className="btn"  type="submit" style={{ marginTop: 20 ,backgroundColor:'#8B45CA',color:'white'}}  onClick={handleSubmit}>Đăng Ký</button>

                </Form>
                </Modal.Body>
                <Modal.Footer>
               
                </Modal.Footer>
            </Modal>
    );
}

export default ModalRegister;