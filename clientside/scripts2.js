
function displayPopUp(data){

	var popup = document.getElementById('cardlist');
	popup.style.visibility="visible" 
	popup.innerHTML	= data; 
		setTimeout(() => {
  // 👇️ hides element (still takes up space on page)
	popup.style.visibility = 'hidden';
	
	}, 14500);
	
}
var totalLikes =0; 
var stickers = true; 


function displayStickers(){

	stickers = !stickers
	if(stickers!=true){
	alert("stickers are off"); 
	}
	else{
	alert("stickers are On"); 
	}
	}

function displayChat(){
console.log("Starting up");

	var inputId= 51919855;
	var chatWin = document.getElementById("chatWindow");
	var startWin = document.getElementById("startWindow");
	var listcard = document.getElementById("cardlist");
	var kick_id = document.getElementById("userKickID");
	
		if(inputId >0){

	//

	
		chatWin.style.display = 'block'; 
		startWin.style.display='none';
		console.log("YouNow chat has been started");
		FetchEvent(inputId);


		}
	StartChatKick();
	
}






function cleanUp(dirtytext){

var i =0; 

let text = dirtytext;
let cleanText = text.replace(/blockedwordlist, "**** "); 




return cleanText;

}


