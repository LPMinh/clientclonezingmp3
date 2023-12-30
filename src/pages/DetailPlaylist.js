import { useEffect, useState } from "react";
import "../styles/detailalbum.css";
import { APiFindAlbumByID, ApiFindPlaylistByID } from "../api/indext";
import { useParams } from "react-router-dom";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setCurrentSongIndex,
  setListSong,
  useAppContext,
} from "../context/AppContext";

function DetailPlayList() {
  const { state, dispatch } = useAppContext();
  const [listSong, setSongs] = useState([]);
  const songCurrent = state.currentSong.id;
  const [selectedSong, setSelectedSong] = useState(0);
  const { id } = useParams();
  const [album, setAlbum] = useState();

  const song = state.currentSong;
  const listsong = state.listSong;
  console.log(listsong);
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(ApiFindPlaylistByID + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //no cors
            "Access-Control-Allow-Origin": "*",
          },
        });

        const data = await response.json();
        console.log(data);
        setAlbum(data);
        setListSong(data.songs);
        dispatch(setListSong(data.songs));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlbum();
    window.scrollTo(0, 0);
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
    <div className="detailalbum">
      <div className="left-detail-album">
        <img
          src={album?.songs?.[0]?.img}
          alt=""
          style={{ width: "100%", height: "300px", objectFit: "contain" }}
        />
        <div className="info-detail-album mt-3">
          <h3 style={{ alignSelf: "center", color: "white" }}>{album?.name}</h3>
          {album?.artist ? (
            <a style={{ alignSelf: "center", color: "#837F8A" }} href="/artist">
              {album?.artist?.fullName}
            </a>
          ) : null}
          <p>{album?.artist?.name}</p>
          <p>{album?.artist?.country}</p>
          <p>{album?.artist?.description}</p>
          <button className="btn-play-album">
            <FontAwesomeIcon
              icon={faPlay}
              style={{ color: "#ffffff", padding: "5px" }}
            />{" "}
            Phát tất cả
          </button>
        </div>
      </div>
      <div className="right-detail-album">
        <table className="table table-responsive table-hover table-borderless">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Bài hát</th>
              <th scope="col">Nghệ Sĩ</th>
            </tr>
          </thead>
          <tbody>
            {album?.songs?.map((song, index) => (
              <tr key={index} onClick={() => handleChangeSong(index)}>
                <td style={{
                backgroundColor:
                  song.id === songCurrent ? "#2F2739" : "#170F23",
              }}>{index + 1}</td>
                <td style={{
                backgroundColor:
                  song.id === songCurrent ? "#2F2739" : "#170F23",
              }}> 
                  <div style={{ flexDirection: "row" }}>
                    <img
                      src={song.img}
                      alt=""
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                    />
                    <span style={{ marginLeft: "10px" }}>{song.name}</span>
                  </div>
                </td>
                <td style={{
                backgroundColor:
                  song.id === songCurrent ? "#2F2739" : "#170F23",
              }}>{getArtistsName(song)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailPlayList;
