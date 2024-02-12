
// Make sure everyone  all chat  are claered 

var jsonInfoData =0;
var customColors=[50446895,'#FF10F0'];
var defaultpng ="<img src='purple.png' style='width:25px;height:25px;border-radius:25px;vertical-align:middle'/>";
var SubBadge="https://ynassets.younow.com/subscriptionsTiers/usersAssets/live/"
var hostID; 

var subbadge_end="/BADGE_1_12/web_BADGE_1_12.png?assetRevision=10";
var goodies = null; 
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
var oldline =null;
var modBadge ="https://cdn.younow.com/angularjsapp/src/assets/images/icons_v3/mymod-chat-badge.png"
 function Get_SubBadges(userId,mons){
	 
	 return SubBadge+ userId + "/" + mons +"/web_"+mons+".png?assetRevision=10"; 
	 
 }
 function Get_Tier(current){
return "https://ynassets.younow.com/tiersRank/badges/live/"+current+".svg?assetRevision=2"

	 
 }
 function Get_modBadge(){
	 
	 return modBadge; 
	 
	 
 }
function checkServerClear(){
var data =getApiYN("https://sheepbaahcode.000webhostapp.com/clear.php");	
	var temp = data.contents; 
if(!(temp.includes("true"))){
	
	console.log("false");
	// refresh every 2 min
}else{
	
	// clear all chat with the K or YN ID   make sure they are running the same file 
	console.log("true");
	// set the value back to false; 
	
}
//console.log(data.contents)

} 
DownloadGifts();


function displayPopUp(data){

	var popup = document.getElementById('cardlist');
	popup.style.visibility="visible" 
	popup.innerHTML	= data; 
		setTimeout(() => {

	popup.style.visibility = 'hidden';
}, 14500);
	
}
async function requestSong2(songName){
	var SafeSongName=encodeURIComponent(songName); 
	 var url = "http://localhost:3050/search?q="+ songName;
	const response = await fetch(url);
	const songs = await response;
	console.log(songs);
	
	
}
function displayGiftOnly(i,data2){
	
	index =0; 
	var index =0; 
	stuff = goodies.goodies;
	gifts = data2; 
	
	var totalLikesGiven = gifts.extraData['numOfLikes']
	
	if(totalLikesGiven> 1)
	{
	
	return totalLikesGiven
	}
	else if (gifts.extraData.value > 1){
	
	
	return gifts.extraData.value;
	
	}
	else{
	
	
	return 0
	}
} 

async function DownloadGifts()
	{
    //console.log ("Fetching Gifts...");
    targetUrl = 'https://ynassets.younow.com/giftsData/live/de/data.json';
    var json = fetch (targetUrl)
        .then (blob => blob.json ())
        .then (data =>
        {
            json = JSON.stringify (data, null, 2);
            goodies = JSON.parse (json);
        });
	}



function FetchEvent (userId){
	
		goDown();
		console.log("Scroll log has been enabled"); 
	
		//	goDown();
	
		pusher = new Pusher ('42a54e2785b3c81ee7b3', {
        cluster: "mt1"
		});
		let channel = pusher.subscribe ("public-channel_" + userId);
  
		channel.bind('onEnd', function(data){

		});
	
		channel.bind ('onChat', function (data)
		{
		
        if (data.message !== "undefined")
    
			{
		var dataout = "" ; 
		
		for (let i = 0; i < data.message.comments.length; i++)
						{
						var username = data.message.comments[i].name;
						var	TimsStamp =  data.message.comments[i].timestamp; 
						var whatsSaid = cleanUp(data.message.comments[i].comment); 
						var CommentUserId = data.message.comments[i].userId; 
						var userImage = GetuserImage(CommentUserId); 
						var propslevel = (data.message.comments[i].propsLevel ) 
						var ifMod = data.message.comments[i].broadcasterMod; 
						var badges = "" 
	
	//badge stuff below	

	if(data.message.comments[i].broadcasterTierRank !=null){
				badges+="<img class='badge2' src='"+Get_Tier(data.message.comments[i].broadcasterTierRank)+"'/>";
			}
			if(data.message.comments[i].subscriptionData !=null){
				badges +="<img class='badge2' src='" +Get_SubBadges(userId,data.message.comments[i].subscriptionData.badgeAssetSku)+"'/>";
			}
			
			if(ifMod !=false){
				badges +="<img class='badge2' src='"+modBadge+"'/>"; 
			}
	
	if(whatsSaid.includes("!song ")){
		
		var temp2 = whatsSaid.split("!song ");
		if((ifMod !=false) ||(data.message.comments[i].subscriptionData !=null)||(CommentUserId==hostID))
		{
			requestSong2(temp2[1])
		}
	else if (CommentUserId!=hostID){
		
		console.log("Something went wrong. " + CommentUserId + " is not " + hostID)
		}
		
		else{
		
		//requestSong2(temp2[1])
		
		console.log("Something went wrong");
		
			}
	}
	// handle  all the message  but  chat_bot 
	
		if(username !="Chat_Bot"){
	
	
		if(((whatsSaid.includes("Gave the")))||(whatsSaid.includes("I became a fan!"))){
			
			// console.log(username+ " said " + whatsSaid);
			
		}else{
			//#BD00FF
			
			if(whatsSaid.includes("!clear")){
			
if(!ifMod ){
	
}
else
{
				clearChatWIN();
}
	
				
			}else{
				
				
							//	console.log("File name used" + filename);
				  if(filename2.includes("fullchat.html")!=false){
							  if(ifMod!=false){
						
								dataout = dataout +"<div class='younow'><table><tr><td><img src='"+GetuserImage(CommentUserId) + "' style='width:50px;height:50px;border-radius:25px;vertical-align:middle'/> " +badges +" "  +data.message.comments[i].name +"<span style='color:#038AFC'> " + cleanUp(data.message.comments[i].comment) +"</span></td></tr><table></div></div>";
							  }
							  else{
						
								dataout = dataout +"<div class='younow'><table><tr><td><img src='"+GetuserImage(CommentUserId) + "' style='width:50px;height:50px;border-radius:25px;vertical-align:middle'/> " +badges +" "  +data.message.comments[i].name +" " + cleanUp(data.message.comments[i].comment) + 
								"</td></tr><table></div></div>";
								  
							  }
				  }
				  else{
					  if(ifMod!=false){
						  
						  	dataout = dataout + "<div class='younow'><table><tr><td><img src='purple.png' style='width:25px;height:25px;border-radius:25px;vertical-align:middle'/> "  +data.message.comments[i].name +" <span style='color:#038AFC'> " + cleanUp(data.message.comments[i].comment) +"</td></tr><table></div>"; 
						 
					  }else
					  {
					  	dataout = dataout + "<div class='younow'><table><tr><td><img src='purple.png' style='width:25px;height:25px;border-radius:25px;vertical-align:middle'/> "  +data.message.comments[i].name +" " + cleanUp(data.message.comments[i].comment) +"</td></tr><table></div>";
					  }
				  }
							
								
			}
		}			
		}	
		else{
			
			
		}
							
						}
	
			}



		displayIt(dataout); 



	
	});

	
   
        channel.bind('onGift', function (data)
        {
		
		// check who  got the gift  and display it in a different list
	
		let tempUsername = data.message.stageGifts[0].profileUrlString
		var giftids = data.message.stageGifts[0].giftId;
		var onlydata = data.message.stageGifts[0] ;
	//	console.log(data.message); 
		
		if(data.message.stageGifts[0].extraData.numOfLikes >0){
			
		}
		else
		{
			
			if(data.message.stageGifts[0].extraData.value >0){
				
				
			}
			else if(data.message.stageGifts[0].giftId===897){
				
	
				
			dataout = dataout + "<table><tr><td  class='younow' style='color:red;background-color:white'> " +defaultpng + " " +data.message.comments[i].name  +" "+ timeConverter(TimsStamp) +"<br>" +data.message.stageGifts[0].comment+ "</td></tr><table>"; 	
			
			displayIt(dataout)	
			}
			else if(data.message.stageGifts[0].giftId!=248){
			
			//console.log(data.message.stageGifts[0]);			
			//248
			}
			else
			{
			
			}
			
		}
		
		
		if(displayGiftOnly(giftids,onlydata) != 0){
		
		//dataout = dataout + "<table><tr><td  class='msg' style='color:red;background-color:white'>" + " " +data.message.comments[i].name  +" "+ timeConverter(TimsStamp) +"<br>"  +displayGiftOnly(giftids,onlydata) + "</td></tr><table>"; 
							
		
		
		}
		else{
			
		// dataout = dataout + "<table><tr><td  class='msg' style='color:red;background-color:white'>"+" "+ timeConverter(TimsStamp) +"<br>"  +onlydata.comment + "</td></tr><table>"; 
				
			//dataout = "<div  class='msg' style='font-size:16px;'><center>" + onlydata.comment+"  </center></div>"
		
		}
		
			// displayIt(dataout)
  
		
		});
	
        //Get Stickers
        channel.bind('onSticker', function (data)
       {
			dealwithFreeStickers(data);
	
        });

		channel.bind('onRaid', function (data)
        {
		//console.log("raid : " +  data )
		
		});
		
		channel.bind('onBroadcastPlayData', function (data)
        {
				var  viewers= data.message.viewers ;
				var likes = data.message.likes; 
				var el4 = document.getElementById("info2") ;
	
        });
		//Get Stickers
        channel.bind('onPartnerSticker', function (data)
        {
		
		console.log("Partener sticker data " + data )
            //handleOnOldPartnerSticker(data);
        });
   
		channel.bind ('onSuperMessage', function (data)
			{        
	//console.log(data);
	  if(filename2.includes("fullchat.html")!=false){
		
		//add badges 
		console.log(data.message); 

			dataout = dataout + "<div class='younow' ><img src='"+GetuserImage(data.message.superMessages[0].userId)+"' style='width:50px;height:50px;border-radius:25px;vertical-align:middle'/>"    +data.message.superMessages[0].name +" " + data.message.superMessages[0].comment + " <div>"; 
			//console.log(dataout);
	  }
	  else{
		  
dataout = dataout + "<div class='younow' ><img src='purple.png' style='width:25px;height:25px;border-radius:25px;vertical-align:middle'/>"    +data.message.superMessages[0].name +" " + data.message.superMessages[0].comment + " <div>"; 
			//console.log(dataout);
	  }
			displayIt(dataout);
			
		//	
		});
		
	
	
	
}  



function dealwithFreeStickers(data){

	var ids = data.message.stickers[0].stickerUserId; 
	var stickername = data.message.stickers[0].assetSku; 
	var fullpath = "https://ynassets.younow.com/subscriptionsTiers/usersAssets/live/" + ids+"/" +stickername +"/web_" +stickername +".png?assetRevision=1 " ;
	var sent_user = data.message.stickers[0].profile;
	//console.log(data); 
	
	
	  if(filename2.includes("fullchat.html")!=false){	
	
	var imagedata= "<div class='younow'><img src='"+GetuserImage(data.message.stickers[0].userId)+"' style='width:50px;height:50px;border-radius:25px;vertical-align:middle'/>" +sent_user+"  <br><img src='" + fullpath +"' style='width:70px;height:70px;border-radius: 50%;'/> </div>"
	  }
	  else{
	var imagedata= "<div class='younow'><img src='purple.png' style='width:25px;height:25px;border-radius:25px;vertical-align:middle'/>" +sent_user+"  <br><img src='" + fullpath +"' style='width:70px;height:70px;border-radius: 50%;'/> </div>"	  
		  
		  
	  }
	displayIt(imagedata); 
 

}
function GetuserImage(data){ return   "https://ynassets.younow.com/user/live/" + data + "/" + data +".jpg";  }
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  if(sec <10 ){
	sec ="0"+sec

  }
  if(hour <10) {
	hour = "0" + hour;

  }
  if(min <10){
	min = "0" + min

  }
  var time =   hour + ':' + min ;
  return time;
}
function displayIt(data){

	
	dataout = data;
	if(dataout !=oldline){
	var el2 =   document.getElementById("chat") ;
	el2.innerHTML =   el2.innerHTML  + dataout; 
	
		
		oldline= data; 
	}
	else{
		
		
		
	}

}

function displayChat(){
console.log("in display chat");
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString); 
	


	var first = urlParams.get("YouNowID"); 
	//hostID=first;
	
	var second =urlParams.get("KickID");
	//displayChat(); 
	goDown();

	var inputId= 1;
	var chatWin = document.getElementById("chatWindow");
	//var startWin = document.getElementById("startWindow");

	
		if(inputId >0){
		chatWin.style.display = 'block'; 
		//startWin.style.display='none';
		
		if(first >0 ){
		console.log("Getting data from url"); 
		
		FetchEvent(first);
		hostID=first;
		}
		else{
			console.log("Getting data from default"); 
		FetchEvent(0);
		hostID=0;
		}
		

		}
StartChatKick(second);


}
//var chatview = document.getElementById("chat")
function StartChatKick(ids){
var kick_id = 0; //roxxies 
if(ids >0 ){
kick_id=ids;

}
else{
kick_id=460187;
}
if(kick_id >0){
main(kick_id);
document.getElementById("menu").style.display = "none";
document.getElementById("MainWindow").style.visibility= "visible";

}
else
{
alert("Missing a user id"); 
}
}


function goDown(){
	
	
		console.log("going down"); 
		window.setInterval(function() {
			if(ScrollingDown !=false){
		var elem = document.getElementById('chat');
		elem.scrollTop = elem.scrollHeight;
		}else{
			
			
		}}, 1000);
		
		
		
		
	

					
}

function cleanUp(dirtytext){

var i =0; 

let text = dirtytext;
let cleanText = text.replace(/innocent|covid|virus|overweight|ugly|facebook|feet/gi, "**** "); 




return cleanText;

}


function getUrlVars()
{
var vars = [], hash;
var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
for(var i = 0; i < hashes.length; i++)
{
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
}
return vars;
}
function clearChatWIN(){
	const nodeList = document.querySelectorAll("div.younow");
	console.log(" Length" +  nodeList.length); 
for (let i = 0; i < nodeList.length; i++) {
  //nodeList[i].style.visibility = "hidden";
  nodeList[i].remove();
  
}

	
	
	
}




