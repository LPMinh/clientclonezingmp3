import { faBackwardStep, faEllipsis, faForwardStep, faHeart, faPlay, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';
import '../styles/musicplayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import { nextSong, prevSong, useAppContext } from '../context/AppContext';


function MusicPlayer() {
    const {state,dispatch}=useAppContext();
    const song=state.currentSong;
    const handleNextSong=()=>{
        dispatch(nextSong());
    }
    const handlePrevSong=()=>{
        dispatch(prevSong());
    }
    const getArtistsName = (Song) => {
        if(Song.artists!==undefined){

            var listArtistNames = "";
            Array.from(Song.artists).forEach((item) => {
              listArtistNames += item.fullName + ",";
            });
        
            return listArtistNames.substring(0, listArtistNames.length - 1);
        }
      };
    return ( <div className='musicplayer'>
                <div className='left'>
                    <div className='image'>
                        <img src={song.img}></img>
                    </div>
                    <div className='info'>
                        <h3 className='name'>{song.name}</h3>
                        <span className='artist'>{getArtistsName(song)}</span>
                    </div>
                    <div className='controls'>
                        <button style={{background:'none',border:'none',cursor:'pointer'}}>
                            <FontAwesomeIcon icon={faHeart} size="xl" style={{color: "#ffffff",}} />
                        </button> &nbsp;
                        <button style={{background:'none',border:'none',cursor:'pointer'}}>
                            <FontAwesomeIcon icon={faEllipsis} size="xl" style={{color: "#ffffff",}} />
                        </button>
                    </div>
                </div>
                <div className='center'>
                    <AudioPlayer className='controller' autoPlay  src={song.mp3} layout="stacked-reverse"  onClickPrevious={()=>handlePrevSong()}  onClickNext={()=>{handleNextSong()}} showSkipControls={true}></AudioPlayer>

                </div>
                <div className='right'>

                </div>
            </div> );
}

export default MusicPlayer;