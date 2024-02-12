        let badgesArray = "";
        let cssStyle = null;
        let userBadges = msgIdentity.badges;
        for (let i = 0; i < userBadges.length; i++) {
            if (userBadges[i].type == "subscriber") {
                let subAge = userBadges[i].count;
                this.subBadges.sort((a,b)=>b.months - a.months);
                for (let j = 0; j < this.subBadges.length; j++) {
                    if (subAge >= this.subBadges[j].months) {
                        badgesArray += `<img src="${this.subBadges[j].badge_image.src}" class="badge ${this.subBadges[j].text}"></img>`;
                        break;
                    }
                }
                continue;
            }
			/*
			
			{
    "id": 1160406,
    "username": "BotRix",
    "slug": "botrix",
    "identity": {
        "color": "#75FD46",
        "badges": [
            {
                "type": "moderator",
                "text": "Moderator"
            },
            {
                "type": "verified",
                "text": "Verified channel"
            }
        ]
    }
}

{
    "id": 2428138,
    "username": "alansantisteban",
    "slug": "alansantisteban",
    "identity": {
        "color": "#75FD46",
        "badges": [
            {
                "type": "subscriber",
                "text": "Subscriber",
                "count": 2
            }
        ]
    }
}


			*/
            badgesArray += `<img src="assets/img/${userBadges[i].type}.svg" class="badge ${userBadges[i].text}"></img>`;
        }
        if (this.seventvProfileCache[msgSender.id] != null) {
            let sevenTVID = await this.get7TVProfile(msgSender.id).then((response)=>{
                if (response.status_code === 404) {
                    this.seventvProfileCache[msgSender.id] = null;
                    return null;
                } else {
                    return response.id;
                }
            }
            );
            if (sevenTVID != null) {
                for (let i = 0; i < this.seventvbadges.length; i++) {
                    if (this.seventvbadges[i].users.includes(sevenTVID)) {
                        badgesArray += `<img src="${this.seventvbadges[i].urls[2][1]}" class="badge ${this.seventvbadges[i].tooltip}"></img>`;
                    }
                }
                for (let j = 0; j < this.seventvpaints.length; j++) {
                    if (this.seventvpaints[j].users.includes(sevenTVID)) {
                        cssStyle = generateInlineCSSStyle(this.seventvpaints[j]);
                    }
                }
            }
        }
        return {
            badgesArray,
            cssStyle
        };
    }
}