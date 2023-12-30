export const getArtistsName = (Song) => {
    var listArtistNames = "";
    Array.from(Song.artists).forEach((item) => {
      listArtistNames += item.fullName + ",";
    });
    return listArtistNames.substring(0, listArtistNames.length - 1);
  };