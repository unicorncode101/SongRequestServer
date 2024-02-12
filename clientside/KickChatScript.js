//Added user profile pictures **DONE** Testing needed
//Check user colors **DONE**
//Change full to thumb 
//todo check null when shoutouts 
var assets="https://kick-chat.corard.tv/v1/";
let emotes = {};
var chatview = document.getElementById("chat")
var test="https://kick.com/channels/"
var old= "https://kick.com/api/v2/channels/";
var test= "https://kick.com/api/v1/users/"
let pfp_data= new Array;
var fullBadges=null;
var url2 = window.location.pathname;
var filename2 = url2.substring(url2.lastIndexOf('/')+1);
const queryString = window.location.search;
var streamer=getUserName();
	
async function getUserName(){

	
		var usr =null;
	 	const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString); 
	 
	 usr=urlParams.get("KickUserName");
	 
	 if(usr !=null )
	 {
		 return usr; 
		 
	 }
	 else{
		 return "roxxietoxxic";
		 
	 }
}
async function getUserInformationsKick(username) {
var url = old+username;
var pfp; 

 fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
		
		if(data.user.profile_pic !=null){
			preLoad(username,data.user.profile_pic)
		}
		else{
			preLoad(username,"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png");
			}	
	})
.catch(error => {
   // console.error('There was a problem with the Fetch operation:', error);
  });
}


function main(chatroomID) {

//getBadges(getUserName());

    const chat = new WebSocket('wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c?protocol=7&client=js&version=7.4.0&flash=false');
getBadges();
	
    chat.onerror = (error) => {
        console.log("Error: " + error);
    };

    chat.onopen = () => {
        console.log("Connected to Pusher");
   
        setTimeout(() => {
           // document.getElementById("loading").style.display = "none";
        }, 1000);
        chat.send(
            JSON.stringify({
                event: 'pusher:subscribe',
                data: {
                    auth: "",
                    channel: `chatrooms.${chatroomID}.v2`
                },
            })
        );
        chat.send(
            JSON.stringify({
                event: 'pusher:subscribe',
                data: {
                    auth: "",
                    channel: `channel.${chatroomID + 2}`
                },
            })
        )
    };
	
    chat.onmessage = (event) => {
		//console.log(event);
		
 parseMessage(event.data);
 
    };

    // Ping every 1 minute to keep the connection alive
    setInterval(() => {
        chat.send(JSON.stringify({
            event: 'pusher:ping',
            data: {}
        }));
    }, 60000);
}

//userData.subscriber_badges

function parseMessage(message) {
//console.log(message);
   
   const msg = JSON.parse(message);
    const data = JSON.parse(
        msg.data.replace(/\\u00a0/g, " ")
            .replace(/\\n/g, " ")
            .replace(/\\t/g, " ")
            .replace(/\\r/g, " ")
            .replace(/\\f/g, " ")
            .replace(/\\b/g, " ")
            .replace(/\\v/g, " ")
            .replace(/\\\\/g, "\\")
    );
    // If the data begins with "pusher", it's a pusher message, just console.log it
    if (msg.event.startsWith("pusher")) {
        if (!msg.event == "pusher:pong") {
            //console.log(data);
        }
    } else if (msg.event == "App\\Events\\ChatMessageEvent") {
        handleMessage(data);
    } else if (msg.event == "App\\Events\\MessageDeletedEvent") {
    
    } else if (msg.event == "App\\Events\\ChatMessageReact") {
		// console.log(data);
		
  
    } else if (msg.event == "App\\Events\\UserBannedEvent") {

		showData( "Banned by:"+" " + data.banned_by.username + "  Banned :" + data.user.username);
    } else if (msg.event == "App\\Events\\ChatroomClearEvent") {
    clearchat();

    }
	else if(msg.event="App\Events\SubscriptionEvent"){
		
		ShowMsg(data);
	}
	else if(msg.event="App\Events\ChatMessageReply"){
		console.log(data);
		
		//ShowMsg(data);
	}
	
    else {
	console.log(data);
	
    }

}
function clearchat(){
	//chatview.innerHTML= ""; 
	
	const nodeList = document.querySelectorAll("div.kick");
	
for (let i = 0; i < nodeList.length; i++) {
	//nodeList[i].style.visibility = "hidden";
	nodeList[i].remove();
}

}
function handleBan(data){
	
console.log(data); 

	
}
function showData(msg){
	
		var  temp =  "<div class='kick' style='font-border:bolder'><img src='purple.png' style='width:20px;height:20px;vertical-align:middle'/>"+msg+" <br>\n </div>" ;
		chatview.innerHTML= chat.innerHTML + temp
}
async function getBadges(){
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString); 
	
	 var usr =null;
	 
	 usr=urlParams.get("KickUserName");
	 
	 if(usr !=null )
	 {
		 
		 
	 }
	 else{
		usr= "roxxietoxxic";
		 
	 }
	
	
	
	
	
	console.log("Getting badges for : " + usr);
	
	var url = old+usr;
	var pfp; 

 fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
		
		fullBadges= data.subscriber_badges;
		//console.log(fullBadges);
	})
.catch(error => {
   // console.error('There was a problem with the Fetch operation:', error);
  });
}
function checkIfSub(data,usrComment){



var len= data.length;
var x =0; 
if(data.length >0){
while(x < len){
	
	
	var badgetype= data[x].type
	
	if((badgetype =="subscriber")); 
	{
		console.log( usrComment + " " +"is a subscriber" ); 
		//break;
		
		return true 
		
		
	}
	
	x++;
}

}
return false; 
//return false ;

	
}
function checkUser(username){
// Look into users pictures not showing up. 

	var found =false; 
	var foundat ; 
	var lenOf = pfp_data.length; 
	
for(var starts=0; starts <lenOf;starts++)
{
	if(pfp_data[starts][0].includes(username)!=false){
		foundat= starts;
		found = true;
		break; 
	}
	else{
		
	}; 
	
}
if(found !=false){
	return(pfp_data[foundat][1]);
}
else{
	getUserInformationsKick(username);
	return null; 
}

}

function handleMessage(data)
{
	var badge3=null;
	
	var startOfMessage= null; 
	if(data.type.includes("reply")){
	//	console.log(data);
		
		startOfMessage =  "reply to @" + data.metadata.original_sender.username + ":" 
	}
	else{
		
	
		
	}
	//console.log(data);
	let msgID = data.id;
    let msgContent = data.content;
    let msgSender = data.sender.username;
    let msgTimestamp = data.created_at;
	
    if(filename.includes("fullchat.html")!=false){
	var tempPFP = checkUser( msgSender);
    }
    else{
        var tempPFP = null; 

    }
	
	var userColor = data.sender.identity.color;

    let emoteRegex = /\[emote:(\d+):?([\w\s\-~!@#$%^&*()_+=\{}\\|;:'",.<>\/?]+)\]/g; // Old regex: /\[emote:(\d+):(\w+)\]/g // New regex: /\[emote:(\d+):(\w+\s?\w*)\]/g
    let emoteMatches = msgContent.match(emoteRegex);
    if (emoteMatches) {
        for (let i = 0; i < emoteMatches.length; i++) {
            let emoteMatch = emoteMatches[i];
            let emoteId = emoteMatch.match(/\[emote:(\d+):?([\w\s\-~!@#$%^&*()_+=\{}\\|;:'",.<>\/?]+)\]/)[1];

            msgContent = msgContent.replace(
                emoteMatch,
                `<img src="https://d2egosedh0nm8l.cloudfront.net/emotes/${emoteId}/fullsize" style="width:50px;height:50px;" class="emote">`
            );
        }
    }

    // Handle Kick Emojis
    let kickEmojiRegex = /\[emoji:(\w+)\]/g;
    let kickEmojiMatches = msgContent.match(kickEmojiRegex);
    if (kickEmojiMatches) {
        for (let i = 0; i < kickEmojiMatches.length; i++) {
            let kickEmojiMatch = kickEmojiMatches[i];
            let kickEmojiName = kickEmojiMatch.match(/\[emoji:(\w+)\]/)[1];

            msgContent = msgContent.replace(
                kickEmojiMatch,
                `<img src="https://dbxmjjzl5pc1g.cloudfront.net/9ad84c86-99f0-4f0a-8e1a-baccf20502b9/images/emojis/${kickEmojiName}.png" class="emote">`
            );
        }
    }

    // Handle 7TV Emotes
    let msgWords = msgContent.split(" ");
    for (let word of msgWords) {
    //    console.log(word);
        if (emotes[word]) {
         //  console.log("Found emote: " + word);
            msgContent = msgContent.replace(word, "<div class='kick' ><img class='emote' src='" + emotes[word].image + "' style='width:50px;height:50px;' /></div>");
        }
    }
//console.log(data.sender);
var isSub = checkIfSub(data.sender.identity.badges,msgSender); 

if(msgSender!="BotRix"){
	// get songname and split 
	//console.log("Badges "+" " + data.sender.identity.badges);
	
	
	if((msgSender==="EmoSheep") ||(isSub!=false) ||(msgSender===streamer)){
	if(msgContent.includes("!song ")){
		
		var songnameonly= msgContent.split("!song ");
		//console.log(songnameonly[1])
		requestSong(songnameonly[1],msgSender)
		//console.log("Has access to song request"); 
	}
	}
	else{
		
	}
	
    if(filename2.includes("fullchat.html")!=false){
		
		if(data.sender.identity.badges!=null)
		{
			badge3=getBadges2(msgSender,data.sender.identity.badges);
			
		}
		else{
			
			
		}
	if(tempPFP !=null){
		
		if(startOfMessage !=null){
			//startOfMessage =  "replay to @" + data.metadata.original_sender.username + ":" 
			var  temp ="<div class='kick'><img style='width:50px;height:50px;border-radius:25px;' src='"+tempPFP+ "'/><span style='color:"+userColor+ "'>"+badge3+ " "+msgSender+ "</span> "+ startOfMessage +""  +msgContent + " <br>\n </div>" ;
		}
		else{
			
			var  temp ="<div class='kick'><img style='width:50px;height:50px;border-radius:25px;' src='"+tempPFP+ "'/><span style='color:"+userColor+ "'>" +badge3 +" " +msgSender+ "</span> " +msgContent + " <br>\n </div>" ;
		}
	}
	else{
		
	if(startOfMessage !=null){
		var  temp =  "<div class='kick'><img style='width:50px;height:50px;border-radius:25px;' src='default.webp'/><span style='color:"+userColor +"'>" +badge3+ " " +msgSender+ "</span> "  + startOfMessage + "  " +msgContent + "<br>\n </div>" ;
		
	}else{
	 var  temp =  "<div class='kick'><img style='width:50px;height:50px;border-radius:25px;' src='default.webp'/><span style='color:"+userColor +"'>" + badge3+" "+msgSender+ "</span> " +msgContent + "<br>\n </div>" ;
	}
	}
}
else{	
if(startOfMessage!=null){
	var  temp =  "<div class='kick'><img src='purple.png' style='width:25px;height:25px;border-radius:25px;vertical-align:middle'/><span style='color:"+userColor +"'>"+msgSender+"</span> " +badge3 +" "  + startOfMessage+" "+msgContent + "<br>\n </div>" ;
}
else{
	var  temp =  "<div class='kick'><img src='purple.png' style='width:25px;height:25px;border-radius:25px;vertical-align:middle'/><span style='color:"+userColor +"'>"+msgSender+"</span> "  + badge3+ " "+msgContent + "<br>\n </div>" ;
}
    
}
if(temp !=null)
{
	chatview.innerHTML= chat.innerHTML + temp
}
	else{
		
		//console.log("null");
		
		
	}	
}
else{
	
	
		// check if bot message is a raid 
//thank you for raiding me with		
	if(msgContent.includes("thank you for raiding me with"))		{
		chatview.innerHTML= chat.innerHTML + msgContent ;
		
		
	}
			
	
}
}

function preLoad(username,pfp){
	let temp= [username,pfp]
	pfp_data.push(temp);
}
function getSubBadge(nums){
	
	var src=null; 
	var x =0;
	
	while(x < fullBadges.length){
		
		if(nums != fullBadges[x].months)
		{
		}
		
		else{
			src= fullBadges[x].badge_image.src; 
			break; 
		}
		x++;
		
		
	}
	if(src !=null){
		return src;
	}
	else{
		
		return "default.svg";
	}
}
function getBadges2(usrName,userBadges){
var badges = "";	
	  for (let i = 0; i < userBadges.length; i++) {
            if (userBadges[i].type == "subscriber") {
				var temp2 = usrName+"has been sub for "+ userBadges[i].count+ " months";
				if(fullBadges!=null){
				// console.log(temp2);
				
				var testBadge=getSubBadge(userBadges[i].count)
				
				
				
						    badges += `<img style="width:25px;height:25px" src="${testBadge}" class="badge ${userBadges[i].text}" alt=${temp2}></img>`;
                        break;

					
			}
			else{
				 badges += `<img style="width:25px;height:25px" src="default.svg" class="badge" alt=${temp2}></img>`;
				break;
				
			}
                continue;
            }
	
	  badges += `<img style="width:25px;height:25px;padding:5px;" src=" `+assets +`assets/img/${userBadges[i].type}.svg" class="badge ${userBadges[i].text}"></img>`;
	
	  }
	//console.log(badges);
	return badges;
}
function ShowMsg(data){
	
		var msg = ""; 
		if(( data.gifted_usernames !=null )&&(data.gifter_username !=null )){
	
			msg = "Gifted sub " +" " +data.gifted_usernames  + " Gifted by : <b>  "+ data.gifter_username +"</b>";	
			
		}
		else if((data.username !=null) && (data.months !=null)){		
		msg =" New sub " +data.username + " Months: <b>"  +data.months +"</b>";

		}
		else{
			
		}
		if(msg !=""){
			
		var  temp =  "<div class='kick' style='font-border:bolder'><img src='purple.png' style='width:20px;height:20px;vertical-align:middle'/>"+msg+" <br>\n </div>" ;
		chatview.innerHTML= chat.innerHTML + temp
		
		}
	else{
		
		
		
	}	
}
function saveData(){

		const link = document.createElement("a");
        const content = document.getElementById("chat").innerHTML;
        const file = new Blob([content], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = "sample.txt";
        link.click();
        URL.revokeObjectURL(link.href);

}
function handleEmotes(msgContent, extra) {
		
        let msgEmotes = {};
        // Loop through the emotes in the message
        for (let emote in extra.messageEmotes) {
            // Loop through the emote positions
            for (let pos of extra.messageEmotes[emote]) {
                let start, end = 0;
                // Pos is "start-end"
                start = parseInt(pos.split("-")[0]);
                end = parseInt(pos.split("-")[1]);
                console.log("start: " + start + " end: " + end);
                // Get the emote name from the message
                const emoteName = msgContent.substring(start, end + 1);
                console.log("name: " + emoteName);
                // Add the emote to the emotes array as {name: url}
                let url = `https://static-cdn.jtvnw.net/emoticons/v2/${emote}/default/dark/4.0`
                msgEmotes[emoteName] = url;
            }
        }
        // Loop through the emotes in the message
        for (let emote in msgEmotes) {
            // Replace the emote name with the emote image
            msgContent = msgContent.replaceAll(emote, "<img class='emote' src='" + msgEmotes[emote] + "' />");
        }
        // Split the message into an array of words, except for the emotes already replaced
        let msgWords = msgContent.split(" ");
        // For each word in the message
        for (let word of msgWords) {
            // If the word is an emote
            if (emotes[word]) {
                // Replace the word with the emote image
                msgContent = msgContent.replace(word, "<img class='emote' src='" + emotes[word].image + "' />");
            }
        }
        return msgContent;
    }
	
async function requestSong(songName,UserRequest){
	console.log("here");
	
	var SafeSongName=encodeURIComponent(songName); 
	 var url = "http://localhost:3050/search?q="+ songName;
	const response = await fetch(url);
	const songs = await response;
	console.log(songs);
	
	
}