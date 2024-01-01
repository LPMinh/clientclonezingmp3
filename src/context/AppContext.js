import { createContext,useReducer,useContext } from "react";

const initialState={
    currentSong:{},
    listSong:[],
    artistSelected:[],
    songsSave:[],
    setsSongModify:[],
    listPlaylistSelected:[],
    songAddToListSelected:[],
    listPlaylistOfUser:[],
    role:"",

};

const AppContext=createContext();

//action
export const addArtist=(artist)=>({
    type:"ADD_ARTIST",
    payload:artist,
});
export const setListSong=(listSong)=>({
    type:"SET_LIST_SONG",
    payload:listSong,
});
export const setCurrentSongIndex=(index)=>({
    type:"SET_CURRENT_SONg",
    payload:index,
});
export const resetArtistSelected=()=>({
    type:"RESET_ARTIST_SELECTED",
});

export const nextSong=()=>({
    type:"NEXT_SONG",
});
export const prevSong=()=>({
    type:"PREV_SONG",
});
export const setSongSave=(song)=>({
    type:"SET_SONG_SAVE",
    payload:song,
});
export const resetSongSave=()=>({
    type:"RESET_SONG_SAVE",
});
export const deleteSongSave=(index)=>({
    type:"DELETE_SONG_SAVE",
    payload:index,
});
export const setListPlaylistSelected=(listPlaylist)=>({
    type:"SET_LIST_PLAYLIST_SELECTED",
    payload:listPlaylist,
});
export const resetListPlaylistSelected=()=>({
    type:"RESET_LIST_PLAYLIST_SELECTED",
});
export const updateListPlaylistSelected=(listPlaylist)=>({
    type:"UPDATE_LIST_PLAYLIST_SELECTED",
    payload:listPlaylist,
});
export const removePlaylistSelected=(index)=>({
    type:"REMOVE_PLAYLIST_SELECTED",
    payload:index,
});
export const setSongAddToListSelected=(song)=>({
    type:"SET_SONG_ADD_TO_LIST_SELECTED",
    payload:song,
});
export const resetSongAddToListSelected=()=>({
    type:"RESET_SONG_ADD_TO_LIST_SELECTED",
});
export const updateSongAddToListSelected=(song)=>({
    type:"UPDATE_SONG_ADD_TO_LIST_SELECTED",
    payload:song,
});
export const removeSongAddToListSelected=(index)=>({
    type:"REMOVE_SONG_ADD_TO_LIST_SELECTED",
    payload:index,
});
export const setRole=(role)=>({
    type:"SET_ROLE",
    payload:role,
});
export const resetRole=()=>({
    type:"RESET_ROLE",
});
export const setListPlaylistOfUser=(listPlaylist)=>({
    type:"SET_LIST_PLAYLIST_OF_USER",
    payload:listPlaylist,
});


const appReducer=(state,action)=>{
    switch(action.type){
        case "SET_LIST_SONG":
           
            return {...state,listSong:action.payload};
        case "SET_CURRENT_SONG":
            console.log("index"+action.payload);
            return {...state,currentSong:state.listSong[action.payload]};
        case "NEXT_SONG":
            {
                const index=state.listSong.findIndex((song)=>song.id===state.currentSong.id);
                if(index!==state.listSong.length-1){
                    return {...state,currentSong:state.listSong[index+1]};
                }
            }
        case "PREV_SONG":
            {
                const index=state.listSong.findIndex((song)=>song.id===state.currentSong.id);
                if(index!==0){
                    return {...state,currentSong:state.listSong[index-1]};
                }
                
            }
        case "ADD_ARTIST":
            return {...state,artistSelected:[...state.artistSelected,action.payload]};
        case "RESET_ARTIST_SELECTED":
            return {...state,artistSelected:[]};
        case "SET_SONG_SAVE":
            console.log(action.payload);
            
            return {...state,songsSave:[...state.songsSave,action.payload]};
        case "RESET_SONG_SAVE":
            return {...state,songsSave:[]};
        case "DELETE_SONG_SAVE":
            {
                const newSongsSave=state.songsSave.filter((item,index)=>index!==action.payload);
                return {...state,songsSave:newSongsSave};
            }

        case "SET_LIST_PLAYLIST_SELECTED":
            return {...state,listPlaylistSelected:action.payload};
        case "RESET_LIST_PLAYLIST_SELECTED":
            return {...state,listPlaylistSelected:[]};
        case "UPDATE_LIST_PLAYLIST_SELECTED":
            {
              //them
              return {...state,listPlaylistSelected:[...state.listPlaylistSelected,action.payload]};
            }
        case "REMOVE_PLAYLIST_SELECTED":
            {
                const newListPlaylistSelected=state.listPlaylistSelected.filter((item)=>item!==action.payload);
                return {...state,listPlaylistSelected:newListPlaylistSelected};
            }
        case "SET_SONG_ADD_TO_LIST_SELECTED":
            return {...state,songAddToListSelected:[...state.songAddToListSelected,action.payload]};
        case "RESET_SONG_ADD_TO_LIST_SELECTED":
            return {...state,songAddToListSelected:[]};
        case "UPDATE_SONG_ADD_TO_LIST_SELECTED":
            {
                return {...state,songAddToListSelected:[...state.songAddToListSelected,action.payload]};
            }
        case "REMOVE_SONG_ADD_TO_LIST_SELECTED":
            {
                const newSongAddToListSelected=state.songAddToListSelected.filter((item,index)=>index!==action.payload);
                return {...state,songAddToListSelected:newSongAddToListSelected};
            }
        case "SET_ROLE":
            return {...state,role:action.payload};
        case "RESET_ROLE":
            return {...state,role:""};
        case "SET_LIST_PLAYLIST_OF_USER":
            return {...state,listPlaylistOfUser:action.payload};    

            
        default:
            return state;
    }
};

export const useAppContext=()=>{
    return useContext(AppContext);
};
// Create the context provider component
export const AppContextProvider=({children})=>{
    const [state,dispatch]=useReducer(appReducer,initialState);
    return (
        <AppContext.Provider value={{state,dispatch}}>
            {children}
        </AppContext.Provider>
    );
}




