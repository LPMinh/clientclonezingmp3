import { Children } from "react";
import MenuBar from "../components/Menubar";
import Header from "../components/Header";
import "../styles/defaultlayout.css";
import MusicPlayer from "../components/MusicPlayer";
function DefaultLayout({children}) {
      const song= {
            artist: "Wren evans",
            name: "call me",
            url: require("../mp3/CallMe.mp3"),
            image: "https://vnn-imgs-f.vgcloud.vn/2022/01/20/09/wren-evans-the-hien-muon-kieu-si-tinh-trong-mv-gap-may.jpg"
      };
    return (
          <div className="default-layout">
                
                <MenuBar/>
                <div className="section">
                   <Header/>
                   <div className="content">{children}</div>
                </div>
                <MusicPlayer song={song} />
                
          </div>
          );
}

export default DefaultLayout;