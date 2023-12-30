import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { ApiAllArist, ApiInsertArtist } from "../api/indext";
import { Button, Form, FormGroup, FormLabel, Modal } from "react-bootstrap";
import getToken from "../token/token";
//su dung bootstrap



function Artist() {
    const [artist, setArtist] = useState([]);
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [reload,setReload]=useState(false);
    const [error,setError]=useState(null);
    const [country,setCountry]=useState('VN');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSetContry=(e)=>{
        setCountry(e.target.value);
    }
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
            formData.append('country', country);
    
            const response = await fetch(ApiInsertArtist, {
                headers:{
                    "authorization":"Bearer "+getToken(),
                    enctype: "multipart/form-data",


                },
                method: 'POST',
               
                body: formData,
            });
            if(response.ok){
                handleClose();
               setReload(!reload);
            }else{
               
                setError("thêm thất bại");
            }
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await fetch(ApiAllArist);
                const data = await response.json();
                console.log(data);
                setArtist(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchArtist();
    }, [reload]); // [] ensures that useEffect runs only once on component mount

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className='input-search'>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{ color: "#ffffff" }} />{' '}
                <input type='text' placeholder='Nhập tên nghệ sĩ' style={{ background: 'none', border: 'none', color: 'white' }}></input>
            </div>
            
            <button className="btn b" style={{ marginTop: 20 ,backgroundColor:'#8B45CA',color:'white'}} onClick={handleShow}>Thêm nghệ sĩ</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm Nghệ sĩ</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <Form style={{display:'flex',width:'100%',height:'100%',flexDirection:'column'}} onSubmit={handleSubmit}  encType="multipart/form-data">
                    <FormGroup style={{width:'100%',height:'50%',padding:20,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <label  style={{width:'50%',height:'100%'}}>Tên nghệ sĩ</label>
                        <input name="name" style={{width:'50%',height:'100%'}} type="text" placeholder="Artist Name" onChange={(e)=>{setName(e.target.value)}}/>
                    </FormGroup>
                    <FormGroup style={{width:'100%',height:'50%',padding:20,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <label style={{width:'50%',height:'100%'}}>Artist Image</label>
                        <input name="avatar" style={{width:'50%',height:'100%'}}  type="file"  accept=".jpg, .jpeg, .png, .gif, .webp" placeholder="Hình ảnh" onChange={handleChangeImage}/>
                        {previewImage && <img src={previewImage} style={{width:100,height:100}}></img>}
                    </FormGroup>
                    <FormGroup style={{width:'100%',height:'50%',padding:20,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <label style={{width:'50%',height:'100%'}}>Quốc gia</label>
                        <select name="country" style={{width:'50%',height:'100%'}}   onChange={handleSetContry}>
                                <option value="VN">Việt Nam</option>
                                <option value="US">Âu Mỹ</option>
                                <option value="KR">Hàn Quốc</option>
                                <option value="JP">Nhật Bản</option>
                                <option value="OTHER">Khác</option>
                        </select>
                        
                    </FormGroup>
                    <FormGroup style={{width:'100%',height:'50%',padding:20,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <span style={{color:'red'}}>{error}</span>
                    </FormGroup>

                 
                    
                    <button className="btn"  type="submit" style={{ marginTop: 20 ,backgroundColor:'#8B45CA',color:'white'}}  onClick={handleSubmit}>Thêm nghệ sĩ</button>

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
                                        <a className="btn btn-warning" href={"/admin/artist/"+item.id}>Chi tiết</a>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default Artist;