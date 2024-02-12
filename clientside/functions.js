

console.log("function");

async function showSongs(searchSong) {
	const response = await fetch("http://localhost:3050/showList");
	const songs = await response.json();
	
	return checkSong(songs.tracks.items,searchSong);  
  
}
async function checkSong(songs,searchSong){
var xy= 0;  
var output=""; 
while(xy < songs.length){

	var SongImg= songs[xy].track.album.images[0].url;
	var SongName=songs[xy].track.name;
	var SongUri= songs[xy].track.uri;
	
	if(SongName.includes(searchSong) !=false){
		
		return true;
		break;
		
	}
	else{
			
	}
	xy++;

}
	return false; 
}


