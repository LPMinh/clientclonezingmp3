import { useEffect, useState } from "react";
import "../styles/homepage.css";
import { useAppContext } from "../context/AppContext";
import SliderNewAllBUm from "../components/SliderNewAlbum";
import { ApiAllSong, ApiAllCategory } from "../api/indext";
import AddToListDropdown from "../components/AddToListDropdown.js";
import CategoryItem from "../components/CateroryItem.js";
function Home() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const { state, dispatch } = useAppContext();
  const songCurrent = state.currentSong.id;
  const [listSongALL, setListSongALL] = useState([]);
  const [listSongVN, setListSongVN] = useState([]);
  const [listSongUS, setListSongUS] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (selectedFilter === "ALL") {
      dispatch({ type: "SET_LIST_SONG", payload: listSongALL });
    } else if (selectedFilter === "VN") {
      dispatch({ type: "SET_LIST_SONG", payload: listSongVN });
    } else if (selectedFilter === "US") {
      dispatch({ type: "SET_LIST_SONG", payload: listSongUS });
    }
  }, [selectedFilter]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allSongs, vnSongs, usSongs, categories] = await Promise.all([
          fetch(ApiAllSong).then((response) => response.json()),
          fetch(ApiAllSong + "/VN").then((response) => response.json()),
          fetch(ApiAllSong + "/US").then((response) => response.json()),
          fetch(ApiAllCategory).then((response) => response.json()),
        ]);
        setListSongALL(allSongs);
        setListSongVN(vnSongs);
        setListSongUS(usSongs);
        setCategories(categories);
        console.log("categories:")
        console.log(categories);
        setSelectedFilter("ALL");
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if needed
      }
    };
    fetchData();
  }, []);

  const getArtistsName = (Song) => {
    var listArtistNames = "";
    Array.from(Song.artists).forEach((item) => {
      listArtistNames += item.fullName + ",";
    });
    return listArtistNames.substring(0, listArtistNames.length - 1);
  };

  const handleChangeSong = (index) => {
    dispatch({ type: "SET_CURRENT_SONG", payload: index });
  };
  return (
    <div className="homepage">
      <h4 className="title-category">KHÁM PHÁ ALBUM</h4>
      <SliderNewAllBUm />
      <h4 className="title-category">MỚI PHÁT HÀNH</h4>
      <div className="menu-filter">
        <button
          className="btn-filter"
          style={{
            backgroundColor: selectedFilter === "ALL" ? "#8B45CA" : "#231B2E",
          }}
          onClick={() => {
            setSelectedFilter("ALL");
          }}
        >
          Tất cả
        </button>
        <button
          className="btn-filter"
          style={{
            backgroundColor: selectedFilter === "VN" ? "#8B45CA" : "#231B2E",
          }}
          onClick={() => {
            setSelectedFilter("VN");
          }}
        >
          Việt Nam
        </button>
        <button
          className="btn-filter"
          style={{
            backgroundColor: selectedFilter === "US" ? "#8B45CA" : "#231B2E",
          }}
          onClick={() => {
            setSelectedFilter("US");
          }}
        >
          Âu Mỹ
        </button>
      </div>

      <div className="song-container">
        {state.listSong.map((item, index) => {
          return (
            <div
              className="song"
              onClick={() => handleChangeSong(index)}
              style={{
                backgroundColor:
                  item.id === songCurrent ? "#2F2739" : "#170F23",
              }}
            >
              <img
                className="image"
                src={item.img}
                style={{
                  display: "flex",
                  width: 100,
                  height: "100%",
                  objectFit: "contain",
                }}
              ></img>
              <div className="info">
                <h6 className="name">{item.name}</h6>
                <span className="artist" style={{ color: "#8B8791" }}>
                  {getArtistsName(item)}
                </span>
              </div>
              <AddToListDropdown songId={item.id} />
            </div>
          );
        })}
      </div>
     
        <h4 className="title-category">THỂ LOẠI</h4>
        <div style={{width:'100%',display:'grid',alignItems:'start',backgroundColor:"#170F23"}}>
            {Array.isArray(categories) &&
                categories.map((item,index) => {
                    return (
                        <CategoryItem key={item} category={item} />
                    );
                })}

        </div>
      
    </div>
  );
}

export default Home;
