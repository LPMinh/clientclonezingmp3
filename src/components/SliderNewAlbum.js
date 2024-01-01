import { useEffect, useState } from "react";

import { ApiFindAlbumsNew } from "../api/indext";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../styles/VerticalCarousel.css";
import { Link } from "react-router-dom";
function SliderNewAllBUm() {
    const [newAlbum, setNewAlbum] = useState([]);
    const settings = {
      
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        speed: 200,
        autoplay: true,
        
      };
    useEffect(()=>{
        const fetchNewAlbum=async()=>{
            try {
                const response=await fetch(ApiFindAlbumsNew);
                const data=await response.json();
                console.log(data);
                setNewAlbum(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchNewAlbum();
    },[])
    return (  
        

<Slider {...settings}  className="vertical-carousel"  >
                {Array.isArray(newAlbum) &&
                    newAlbum.map((item) => {
                        return (
                            <Link to={"/album/"+item.id} className="item-album" >
                                <img src={item.img} style={{width:'200px',height:'200px'}} />
                                <span style={{fontWeight:"bold",color:'red',width:'200px',height:'200px'}}>{item.name}</span>
                                <span style={{fontWeight:'lighter' ,color:'red',textAlign:'start'}}>{item.artist.fullName}</span>
                            </Link>
                        );
                    })}
            </Slider>
            
          
        
     
    );
}

export default SliderNewAllBUm;