import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/header.css'
import { faArrowLeft, faArrowRight, faGear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import AvtDropdown from './AvtDropdown';
import { useState } from 'react';
import { redirect, useHref, useNavigate } from 'react-router-dom';
function Header() {
    const [search,setSearch]=useState('');
    const navigate=useNavigate();
    const handleSearchChange = (e) => {
        console.log(e.target.value);
        setSearch(e.target.value);
      };
      const handleGoBack=()=>{
        navigate(-1);
        }
        const handleGoForward=()=>{
            navigate(1);
        }
    return (<div className="header">
            <div style={{ display:'flex',width:'70%',height:'100%',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{flexDirection:'row',width:'20%',height:'100%',justifyContent:'space-between',alignItems:'center'}}>
                    <button className='button' onClick={()=>{handleGoBack()}}>
                        <FontAwesomeIcon icon={faArrowLeft} size="xl" style={{color: "#ffffff",}} />  
                        </button>
                    <button className='button'>
                        <FontAwesomeIcon icon={faArrowRight} size="xl" style={{color: "#ffffff",}} />
                    </button>
                </div>
                
                <div className='input-search'>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{color: "#ffffff",}}  onClick={()=>{navigate('/search/'+search)}}/> <input type='text' placeholder='Tìm kiếm bài hát, playlist, nghệ sĩ,...' style={{background:'none',border:'none',color:'white'}}  onChange={handleSearchChange} ></input>
            </div>
            </div>
            <div style={{ display:'flex',width:'10%',height:'100%',justifyContent:'space-between',alignItems:'center'}}>
                <button className='button' >
                    <FontAwesomeIcon icon={faGear} size="xl" style={{color: "#ffffff",}}/>
                </button>
                {/* <img style={{width:'auto',objectFit:'contain',height:'100%',borderRadius:'50%'}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPuLEcucKM6ry4WmnqHTaBwnKTAZkGxpn3wyJoTqumhQ&s'></img> */}
                <AvtDropdown/>
            </div>
            
            
    </div>  );
}

export default Header;