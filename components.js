// This code copyright Ben Collier 2013. Original code, design, story and concept copyright Eric N. Miller.

// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },
 
  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});
 
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});
 
Crafty.c('Wall', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('rgb(0, 255, 255)');
  },
});

Crafty.c('Locked Door', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('rgb(0, 150, 150)');
  },
});

Crafty.c('Hidden Door', {
  init: function() {
    this.requires('Actor, Color')
      .color('rgb(0, 255, 255)');
  },
});
 
Crafty.c('Dining Room', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('rgb(0,0,0)');
  },
});

Crafty.c('Ballroom', {
  init: function() {
    this.requires('Actor, Color')
      .color('rgb(0,0,0)');
  },
});

Crafty.c('Pantry', {
  init: function() {
    this.requires('Actor, Color')
      .color('rgb(0,0,0)');
  },
});

Crafty.c('Doorstep', {
  init: function() {
    this.requires('Actor, spr_doorstep')
  },
});

Crafty.c('Observatory', {
  init: function() {
    this.requires('Actor, Color')
    .color('rgb(0,0,0)');
  },
});

Crafty.c('Master Bedroom', {
  init: function() {
    this.requires('Actor, Color')
    .color('rgb(0,0,0)');
  },
});

Crafty.c('Guest Bedroom', {
  init: function() {
    this.requires('Actor, Color')
    .color('rgb(0,0,0)');
  },
});

Crafty.c('Dining Room', {
  init: function() {
    this.requires('Actor, Color')
  	.color('rgb(0,0,0)');
  },
});

Crafty.c('Door', {
  init: function() {
    this.requires('Actor, Color')
  	.color('rgb(0,0,0)');
  },
});

Crafty.c('Games Room', {
  init: function() {
    this.requires('Actor, Color')
  	.color('rgb(0,0,0)');
  },
});

Crafty.c('Scullery', {
  init: function() {
    this.requires('Actor, Color')
    .color('rgb(0,0,0)');
  },
});

Crafty.c('Hallway', {
  init: function() {
    this.requires('Actor, Color')
    .color('rgb(0,0,0)');
  },
});

Crafty.c('Library', {
  init: function() {
    this.requires('Actor, Color')
    .color('rgb(0,0,0)');
  },
});

Crafty.c('Study', {
  init: function() {
    this.requires('Actor, Color')
    .color('rgb(0,0,0)');
  },
});

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Multiway, Collision, DOM, spr_player')
      	.multiway(3, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})
      	.stopOnSolids()
      	.onHit('Doorstep', function() { 
      		room = "You are on the front steps of the house.";
      		say (message); 
      		if (lastkey != 13) { tempmessage=""; }
      	})
      	.onHit('Ballroom', function() { 
      		room = "You are in the Ballroom";
      		doroomactivities(3);
      	})
      	.onHit('Pantry', function() { 
      		room = "You are in the Pantry";
      		doroomactivities(4);
      	})
      	.onHit('Games Room', function() { 
      		room = "You are in the Games Room";
      		doroomactivities(9);
      	})
      	.onHit('Hidden Door', function() { 
      		room = "You are passing through a hidden doorway.";
      		doroomactivities(20);
      	})
      	.onHit('Scullery', function() { 
      		room = "You are in the Scullery";
      		doroomactivities(7);
      	})
      	.onHit('Hallway', function() { 
      		room = "You are in halls of the mansion";
      		for (var i = 0; i < 8; i++) {
				character[i][6].z = 0; presence="";
			}
			weaponpresence = "";
      		say (message);
      		currentroom = 0;
      		if (lastkey != 13) { tempmessage=""; }
      	})
      	.onHit('Study', function() { 
      		room = "You are in the Study";
      		doroomactivities(11); 
      	})
      	.onHit('Library', function() { 
      		room = "You are in the Library";
      		doroomactivities(12);
      	})
      	.onHit('Master Bedroom', function() { 
      		room = "You are in the Master Bedroom";
      		doroomactivities(5)
      	})
      	.onHit('Observatory', function() { 
      		room = "You are in the Observatory";
      		doroomactivities(10);
      	})
      	.onHit('Guest Bedroom', function() { 
      		room = "You are in the Guest Bedroom";
      		doroomactivities(6);
       	})
      	.onHit('Dining Room', function() { 
      		room = "You are in the Dining Room";
      		doroomactivities(8);
      	})
      	.bind('KeyDown', function(e) {
      		lastkey = ""
	    	if ((e.key >= 48 && e.key <= 90) || e.key == 32) {
	      		buffer = buffer + String.fromCharCode(e.key);
	      		refreshinput();
	    	}
	    	if (e.key == Crafty.keys['BACKSPACE']) {
	    		buffer = buffer.substr(0,buffer.length-1);
	    		refreshinput();
	    	}
	    	if (e.key == 13) {
	    		lastkey = 13;
	    		processinput();
	    		refreshinput();
	    	}
    	});
  },
  
   stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);
    return this;
  },
 
  // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  }
  
});

function doroomactivities(roomnumber) {
	for (var i = 0; i < 8; i++) {
		if (character[i][2] == roomnumber) {character[i][6].z = 65535; presence="<br/> " + character[i][0] + " " + character[i][1] + " is here.";}
	}
	for (var i = 0; i < 8; i++) {
		if (weaponlocations[i] == roomnumber) { weaponpresence="<br/> A " + weapons[i] + " lies here.";}
	}
	if (magnifyingglassroom == currentroom && hasmagnifyingglass == false) { weaponpresence = "<br/> A magnifying glass lies here."; }
	if (currentroom != roomnumber) {
		roomentrances = roomentrances + 1;
		if (roomentrances > 15) { warning = ('<div style="color: orange;">The murderer has grown suspicious of your investigation!</div>'); }
		if (roomentrances > 30) {
			warning = ('<div style="color: red;">The murderer is now stalking you!</div>');
			var death = RandomInteger (1,20);
			if ( death == 20 ) {
				lockdoors();
				Crafty.audio.play("strings");
				deadmessage = ('<div style="color: red;">' + character[murderer][0] + ' ' + character[murderer][1] + ' slams the door behind you as you enter. "You were getting just a little too close to the truth, detective. Now it`s time for you to suffer the same fate as poor ' + character[victim][0] + '."</div><br/><br/>You are dead. Score: ' + score + '. Click <a href="sleuth.html">here</a> to play again.');
				warning="";
				dead=true;
			}
		}
	}
	currentroom = roomnumber;
	if (dead == false) { say (message); }
	else { say (deadmessage); }
	 
	if (dead == true) { Crafty.pause(); }
	if (lastkey != 13) { tempmessage=""; }
	
}

function processinput() {
	var commands = buffer.split(" ");
	if (commands[0] == "QUESTION") { 
		tempmessage = "";
		for (var i=0; i<8; i++) {
			if (character[i][0].toUpperCase()==commands[1]) { tempmessage = character[i][5]; }
		}
		if (tempmessage == "") { tempmessage = "Sorry, that person isn't here."; }
	}
	else if (commands[0] == "GET") { 
		if (commands[1] == "MAGNIFYING" || commands[1] == "GLASS") {
			if (magnifyingglassroom == currentroom) {
				tempmessage = "You now have the magnifying glass.";
				hasmagnifyingglass = true;
				weaponpresence = "";
				sendMessage('You now have the magnifying glass!');	
				sendMessage('You now have the magnifying glass!');	
			}
			else {
				tempmessage = "The magnifying glass is not here!";
			}
		}
		else if (weaponlocations[murderweapon] == currentroom) { hasmurderweapon = true; tempmessage = "You now have the murder weapon.<br/>"; weaponpresence = ""; weaponlocations[murderweapon] = -1; }
		else { tempmessage = "Why would you want to pick that up?"; }
	}
	else if (commands[0] == "GATHER") {
		if (hasmurderweapon == false) { tempmessage = "But you don't have the murder weapon!"; }
		else {
			if (currentroom != 0 && currentroom !=20 && currentroom != 30) {
				for (charnumber = 0; charnumber < 8; charnumber++) {
					if (character[charnumber][6] != -1) { character[charnumber][6].destroy(); }
				}
				lockdoors();
				for (var x = 0; x < Game.map_grid.width; x++) {
					for (var y = 0; y < Game.map_grid.height; y++) {
						if (map[y][x] == currentroom) {
							var endcharacter = [];
							for (var placecharacter = 0; placecharacter < 7; placecharacter++) {
								endcharacter[placecharacter] = Crafty.e('AccuseCharacter').at(x+(placecharacter*2), y+1);
								endcharacter[placecharacter].z = 65535;
							}
							y=26;
							x=81;
							accuseready = true;
						}
					}	
				}
				lockdoors();
				score = (100 - roomentrances)*11;
				roomentrances = 0;
				warning="";
				tempmessage = "You have gathered the suspects together to hear the results of your investigation. The doors of the house are locked, so no-one may escape. You may make your accusation.";
				room = "You have gathered the suspects together to hear the results of your investigation. The doors of the house are locked, so no-one may escape. You may make your accusation.";
			}
			else {
				tempmessage = "But you're not in a room!<br/><br/>";
			}
		}	
	}
	else if (commands[0] == "EXAMINE") { 
		if (commands[1] == "FLOOR" || commands[1] == "CARPET") {
			if (hasmagnifyingglass == true) {
				if (currentroom == murderroom) {
					tempmessage = "The are specks of blood on the carpet!";
				}
				else {
					tempmessage = "You see nothing special about the floor";
				}
			}
			else {
				tempmessage = "You'll need the magnifying glass to look at the floor.";
			}
		}
		else {
			if (hasmagnifyingglass == true) {
				for (var i=0; i<8; i++) {
					if (weaponlocations[i] == currentroom) { 
						if (murderweapon == i) {tempmessage = '<div style="color:red;">There are traces of blood on it! It must be the murder weapon!<br/></div>';}
						else {tempmessage = "There is nothing special about the "+ weapons[i];}
					}
				}	
			}
			else {
				tempmessage = "But you don't have a magnifying glass to examine it with!";
			}
		}
	}
	else if (commands[0] == "ACCUSE") { 
		if (accuseready == false) { tempmessage = "But you haven't gathered the murder suspects yet!<br/>"; }
		else { 
			if (commands[2] == null) {
				tempmessage = "You must give the full name of the person you wish to accuse.";
			}
			else {
				tempmessage = "There is no-one here with that name!";
				for (var i = 0; i < 8; i++) {
					if (character[i][0].toUpperCase() == commands[1]) {
						if (character[i][1].toUpperCase() == commands[2]) {
							if (murderer!=i) {
								tempmessage = '"I`m not the murderer, you blundering fool, and I can prove it! I`m also a close personal friend of the Chief Constable. I dare say he`ll have something to say about this!"<br/><br/>Click <a href="sleuth.html">here</a> to play again.';
								say(tempmessage);
								Crafty.pause();
							}
							else if (currentroom!=murderroom) {
								tempmessage = '"Yes, I murdered ' + character[victim][0] + ' inspector, but it wasn`t in this room! I dare say your incompetence will see me off on a technicality, and you with a demotion!"<br/><br/>Click <a href="sleuth.html">here</a> to play again.';
								say(tempmessage);
								Crafty.pause();
							}
							else {
								tempmessage = '<font color="Green">"Yes, I did it! You`ve got me banged to rights, inspector. But I think everyone in this room knows it was the right thing to do."</font><br/><br/>Score: ' + score + '. Click <a id="dofacebook" href="#" onclick="posttofb();">here</a> to share your score on Facebook, or <a href="sleuth.html">here</a> to play again.';
								say(tempmessage);
								Crafty.pause();
							}
						}
					}
				}
			}
		}
	}
	else { tempmessage = '<font style="color: #9090ff">Command not understood.</font><br/>'; }
	buffer = "";
}

Crafty.c('Character', {
  init: function() {
    this.requires('Actor, spr_char, Solid')
  }
  
});

Crafty.c('AccuseCharacter', {
  init: function() {
    this.requires('Actor, spr_char')
  }
  
});

function lockdoors () {
    for (var x = 0; x < Game.map_grid.width; x++) {
      for (var y = 0; y < Game.map_grid.height; y++) {
        if (map[y][x] == 40) {
        	Crafty.e('Locked Door').at(x,y);
        }
      }
    }
}

function posttofb () {
		FB.init({ 
            appId:'386674258100495', cookie:true,
            status:true, xfbml:true 
         });

         FB.ui({ method: 'feed', 
         	link: 'http://www.bencollier.info/sleuth',
            description: 'Play SleuthJS online today and figure out whodunnit in this Javascript game inspired by 80s classic "Sleuth"!',
            caption: 'I solved the murder and scored ' + score + ' points in SleuthJS!',
            picture: 'http://www.bencollier.info/sleuth/glass.jpg'});
}
