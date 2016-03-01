paper.install(window);
$(function() {
	if(!('getContext' in document.createElement('canvas'))){
		alert('Sorry, it looks like your browser does not support canvas!');
		return false;
	}


	paper.setup($('canvas')[0]);

	// The path that will be followed
	var bridesheadPath = new Path({
		strokeColor: 'rgba(0,0,0,0)',
		strokeWidth: 3,
		closed: false,
		fullySelected: false
	});
	var railPath = new Path({
		strokeColor: '#F44336',
		strokeWidth: 3,
		closed: false,
		fullySelected: false
	});
	var railTiePath;
	var zeroZero = new Point(0, 0);
	var lastPosition;
	var dots = new Path();
	// charlesDot (The dot that will be moving along bridesheadPath)
	var charlesDot;
	var offset = 0;
	// Put Charles at the starting point
	var charlesPosition = new Point();
	var currentPosition = 0;
	var cloneCircle;
	var length;	
	// var currentLocation = true; // Starts from within a location
	var amount = 0.05; // controls the speed at which the movement will occur
	var tool = new Tool();
	var numpathLocations = 0;
	var currentIntersect;
	var pathLocationsShapes = [];
	var pathLocationIndex = 0;
	var insideLocation = true;
	var currentLocationName = 'Present';
	var activeParentTree 	 = ['Present'];
	var locationsMetaData = [];
	var oxfordTransform = {
		x: -700,
		y: 160
	}
	var bridesheadTransform = {
		x: -150,
		y: 580
	};
	var locationKeys = [
		'past',
		'pastBrideshead',
		'pastBridesheadChapel',
		'pastBridesheadSebastiansRoom',
		'pastBridesheadCdr',
		'pastBridesheadNanny',
		'pastBridesheadServantsEntrance',
		'pastBridesheadPaintedParlour',
		'pastBridesheadLibrary',
		'pastBridesheadColonnade',
		'pastBridesheadGardenRoom',
		'pastBridesheadRoof',
		'pastJail',
		'pastRexsHouse',
		'pastCourt',
		'pastBridesheadLadyMarchmainsRoom',
		'pastBridesheadDiningRoom',
		'pastBridesheadDrawingRoom',
		'pastBridesheadTapestryHall',
		'pastOxford',
		'pastOxfordCharlesRoom',
		'pastOxfordBlackwells',
		'pastOxfordClasses',
		'pastOxfordSebastiansRoom',
		'pastOxfordBotanicalGardens',
		'pastGodstow',
		'pastTrout',
		'pastOxfordAlexanders',
		'pastOxfordTeashop',
		'pastOxfordStClements',
		'pastOxfordStEbbs',
		'pastOxfordGardenersArms',
		'pastOxfordNagsHead',
		'pastOxfordTurfInHellPassage',
		'pastMarchmainHouse',
		'pastMaMayfields',
		'pastCarFaxStation',
		'pastBotleyRoad',
		'pastSwindon',
		'pastPicturesqueSpot',
		'pastRavenna',
		'pastFarmToEat',
		'pastFathersHome',
		'pastFathersHomeCharlesRoom',
		'pastFathersHomeGardenRoom',
		'pastFathersHomeDiningRoom',
		'pastFathersHomeGallery',
		'pastFathersHall',
		'pastPaddingtonStation',
		'pastPaddingtonStationTrain',
		'pastMelsteadCarbury',
		'pastDunkirk',
		'pastParis',
		'pastParisLotti',
		'pastParisFoyots',
		'pastParisGareDeLyon',
		'pastMilan',
		'pastVenice',
		'pastVeniceBridesheadsHouse',
		'pastVeniceFlorians',
		'pastLondon',
		'present',
		'presentBrideshead',
		'presentBridesheadChapel',
		'presentBridesheadNanny',
		'presentArmyCamp1',
		'presentArmyCamp1Huts',
		'presentArmyCamp1NearbyCity',
		'presentArmyCamp1NearbyCityMadhouse',
		'presentTrain',
		'presentTrainCOsCarriage',
		'presentTrainStation1',
		'presentTrainStation2',
		'presentArmyCamp2',
		'presentArmyCamp2Huts'
	];
	var locationData = {};
	var plotPoints = [];
	var timeSize = {
	 	radius: 800
	};
	var primarySize = {
	 	radius: 130
	};
	var secondarySize = {
	 	radius: 50
	};
	var tertiarySize = {
	 	radius: 25
	};

	// lower speed on button click
	// 
	$('.down-speed').click(function(e){
		e.preventDefault();
		amount += 0.05;
		length = bridesheadPath.length / amount
	});
	// increase speed on button click
	// 
	$('.up-speed').click(function(e){
		e.preventDefault();
		if(amount > 0.05){
			amount -= 0.05;
			length = bridesheadPath.length / amount
		}
	});

	function drawpathLocations(){

		var rtop = new Point(0, 0);
		var rbot = new Point(580, $(window).height());
		var rect = new Rectangle(rtop, rbot);
		var pRect = new Path.Rectangle(rect, 5);
		// pRect.strokeColor = 'blue';
		var locationMeta = {};
		// Draw rectangle representing the present.
		pathLocationsShapes.push(pRect);
		locationsMetaData.push({name: 'Present', key: 'present'});
		numpathLocations++;
		
		// Past locations
		// 
		locationData.past = {name: 'Past', center: {x: 1400, y:400}, color: 'rgba(60,60,60,0.2)', radius: timeSize.radius, shape: 'circle', key: 'past'};
		locationData.pastBrideshead = {
			name: 'Brideshead',
			center: {x: 1650 + (bridesheadTransform.x), y:200 + (bridesheadTransform.y)},
			radius: primarySize.radius,
			color: '#4CAF50',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastBrideshead'
		};
		locationData.pastBridesheadChapel = {
			name: 'Chapel',
			center: {x: 1550 + (bridesheadTransform.x), y: 100 + (bridesheadTransform.y)},
			radius: secondarySize.radius,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadChapel'
		};
		locationData.pastBridesheadSebastiansRoom = {
			name: 'Sebastian\'s Room',
			center: {x: 1500 + (bridesheadTransform.x), y: 225 + (bridesheadTransform.y)},
			radius: tertiarySize.radius,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadSebastiansRoom'
		};
		locationData.pastBridesheadCdr = {
			name: 'Chinese Drawing Room',
			center: {x: 1650 + (bridesheadTransform.x), y: 75 + (bridesheadTransform.y)},
			radius: secondarySize.radius,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadCdr'
		};
		locationData.pastBridesheadNanny = {
			name: 'Nursery',
			center: {x: 1525 + (bridesheadTransform.x), y: 175 + (bridesheadTransform.y)},
			radius: tertiarySize.radius,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadCdr'
		};
		locationData.pastBridesheadServantsEntrance = {
			name: 'Servants Entrance',
			center: {x: 1650 + (bridesheadTransform.x), y: 350 + (bridesheadTransform.y)},
			radius: tertiarySize.radius,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadServantsEntrance'
		};
		locationData.pastBridesheadLadyMarchmainsRoom = {
			name: 'Lady Marchmain\'s Room',
			center: {x: 1622, y: 834},
			radius: 10,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadLadyMarchmainsRoom'
		};
		locationData.pastBridesheadDiningRoom = {
			name: 'Dining Room',
			center: {x: 1497, y: 839},
			radius: 10,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadDiningRoom'
		};
		locationData.pastBridesheadDrawingRoom = {
			name: 'Drawing Room',
			center: {x: 1444, y: 891},
			radius: 10,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadDrawingRoom'
		};
		locationData.pastBridesheadTapestryHall = {
			name: 'Tapestry Hall',
			center: {x: 1552, y: 896},
			radius: 10,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadTapestryHall'
		};
		locationData.pastBridesheadPaintedParlour = {
			name: 'Painted Parlour',
			center: {x: 1750 + (bridesheadTransform.x), y: 100 + (bridesheadTransform.y)},
			radius: tertiarySize.radius,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadPaintedParlour'
		};
		locationData.pastBridesheadColonnade = {
			name: 'Colonnade',
			center: {x: 1775 + (bridesheadTransform.x), y: 200 + (bridesheadTransform.y)},
			radius: tertiarySize.radius,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadColonnade'
		};
		locationData.pastBridesheadRoof = {
			name: 'Roof',
			center: {x: 1825 + (bridesheadTransform.x), y: 150 + (bridesheadTransform.y)},
			radius: tertiarySize.radius,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadRoof'
		};
		locationData.pastBridesheadLibrary = {
			name: 'Library',
			center: {x: 1750 + (bridesheadTransform.x), y: 300 + (bridesheadTransform.y)},
			radius: tertiarySize.radius,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadLibrary'
		};
		locationData.pastBridesheadGardenRoom = {
			name: 'Garden Room',
			center: {x: 1533,y: 744},
			radius: 10,
			color: '#4CAF50',
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadGardenRoom'
		};
		locationData.pastOxford = {
			name: 'Oxford',
			center: {x: 1700 + (oxfordTransform.x),y: 600 + (oxfordTransform.y)},
			radius: primarySize.radius,
			color: 'steelblue',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastOxford'
		};
		locationData.pastOxfordCharlesRoom = {
			name: 'Charles\' room',
			center: {x: 1600 + (oxfordTransform.x),y: 700 + (oxfordTransform.y)},
			radius: secondarySize.radius,
			color: 'steelblue',
			parent: locationData.pastOxford,
			shape: 'circle',
			key: 'pastOxfordFirstFloorRoom'
		};
		locationData.pastOxfordBlackwells = {
			name: 'Blackwells',
			center: {x: 960,y: 942},
			radius: 10,
			color: 'steelblue',
			parent: locationData.pastOxford,
			shape: 'circle',
			key: 'pastOxfordBlackwells'
		};
		locationData.pastOxfordClasses = {
			name: 'Classes',
			center: {x: 1575 + (oxfordTransform.x),y: 600 + (oxfordTransform.y)},
			radius: secondarySize.radius,
			color: 'steelblue',
			parent: locationData.pastOxford,
			shape: 'circle',
			key: 'pastOxfordClasses'
		};
		locationData.pastOxfordSebastiansRoom = {
			name: 'Sebastian\'s Room',
			center: {x: 1590 + (oxfordTransform.x), y: 470 + (oxfordTransform.y)},
			radius: secondarySize.radius,
			color: 'steelblue',
			parent: locationData.pastOxford,
			shape: 'circle',
			key: 'pastOxfordSebastiansRoom'
		};
		locationData.pastOxfordBotanicalGardens = {
			name: 'Botanical Gardens',
			center: {x: 1780 + (oxfordTransform.x),y: 420 + (oxfordTransform.y)},
			radius: tertiarySize.radius,
			color: 'steelblue',
			parent: locationData.pastOxford,
			shape: 'circle',
			key: 'pastOxfordBotanicalGardens'
		};
		locationData.pastGodstow = {
					name: 'Godstow',
					center: {x: 1219,y: 677},
					radius: 10,
					color: 'steelblue',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastGodstow'
				};
		locationData.pastTrout = {
					name: 'The Trout',
					center: {x: 1170 ,y: 684},
					radius: 10,
					color: 'steelblue',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastTrout'
				};
		locationData.pastOxfordAlexanders = {
					name: 'Alexander\'s',
					center: {x: 1690 + (oxfordTransform.x), y: 465 + (oxfordTransform.y)},
					radius: tertiarySize.radius,
					color: 'steelblue',
					parent: locationData.pastOxford,
					shape: 'circle',
					key: 'pastOxfordAlexanders'
				};
		locationData.pastOxfordTeashop = {
					name: 'Tea shop',
					center: {x: 1850 + (oxfordTransform.x),y: 445 + (oxfordTransform.y)},
					radius: tertiarySize.radius,
					color: 'steelblue',
					parent: locationData.pastOxford,
					shape: 'circle',
					key: 'pastOxfordTeashop'
				};
		locationData.pastOxfordStClements = {
			name: 'St. Clement\'s',
			center: {x: 1900 + (oxfordTransform.x),y: 550 + (oxfordTransform.y)},
			radius: 10,
			color: 'steelblue',
			parent: locationData.pastOxford,
			shape: 'circle',
			key: 'pastOxfordStClements'
		};
		locationData.pastOxfordStEbbs = {
			name: 'St. Ebb\'s',
			center: {x: 1910 + (oxfordTransform.x),y: 575 + (oxfordTransform.y)},
			radius: 10,
			color: 'steelblue',
			parent: locationData.pastOxford,
			shape: 'circle',
			key: 'pastOxfordStEbbs'
		};
		locationData.pastOxfordGardenersArms = {
			name: 'Gardener\'s Arms',
			center: {x: 1910 + (oxfordTransform.x),y: 600 + (oxfordTransform.y)},
			radius: 10,
			color: 'steelblue',
			parent: locationData.pastOxford,
			shape: 'circle',
			key: 'pastOxfordGardenersArms'
		};
		locationData.pastOxfordNagsHead = {
			name: 'Nag\'s Head',
			center: {x: 1900 + (oxfordTransform.x),y: 625 + (oxfordTransform.y)},
			radius: 10,
			color: 'steelblue',
			parent: locationData.pastOxford,
			shape: 'circle',
			key: 'pastOxfordNagsHead'
		};
		locationData.pastOxfordTurfInHellPassage = {
			name: 'Tuff in Hell Passage',
			center: {x: 1875 + (oxfordTransform.x),y: 650 + (oxfordTransform.y)},
			radius: 10,
			color: 'steelblue',
			parent: locationData.pastOxford,
			shape: 'circle',
			key: 'pastOxfordTurfInHellPassage'
		};
		locationData.pastCarFaxStation = {
					name: 'Carfax Sation',
					center: {x: 1040,y: 940},
					radius: 15,
					color: '#795548',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastCarFaxStation'
				};
		locationData.pastBotleyRoad = {
					name: 'Botley Road',
					center: {x: 1200, y: 940},
					radius: 15,
					color: '#795548',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastBotleyRoad'
				};
		locationData.pastSwindon = {
					name: 'Swindon',
					center: {x: 1200,y: 910},
					radius: 15,
					color: '#795548',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastSwindon'
				};
		locationData.pastRavenna = {
					name: 'Revenna (with Collins)',
					center: {x: 732, y: 663},
					radius: tertiarySize.radius,
					color: '#B44012',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastRavenna'
				};
		locationData.pastPicturesqueSpot = {
					name: 'Picturesque side-of-the-road spot',
					center: {x: 1230,y: 880},
					radius: 15,
					color: '#43a047',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastPicturesqueSpot'
				};
		locationData.pastFarmToEat= {
			name: 'Farm',
			center: {x: 1340, y: 900},
			color: '#673AB7',
			radius: tertiarySize.radius,
			parent: locationData.past,
		  shape: 'circle',
		  key: 'pastFarmToEat'
		};
		locationData.pastFathersHome = {
			name: 'Charles\' Father\'s Home',
			center: {x: 1200,y: 350},
			radius: 100,
			color: '#ff9100',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastFathersHome'
		};
		locationData.pastFathersHomeCharlesRoom = {
			name: 'Charles\'s Room',
			center: {x: 1120,y: 425},
			radius: tertiarySize.radius,
			color: '#ff9100',
			parent: locationData.pastFathersHome,
			shape: 'circle',
			key: 'pastFathersHomeCharlesRoom'
		};
		locationData.pastFathersHomeGardenRoom = {
			name: 'Garden Room',
			center: {x: 1134,y: 272},
			radius: tertiarySize.radius,
			color: '#ff9100',
			parent: locationData.pastFathersHome,
			shape: 'circle',
			key: 'pastFathersHomeGardenRoom'
		};
		locationData.pastFathersHomeDiningRoom = {
			name: 'Dining Room',
			center: {x: 1275,y: 275},
			radius: tertiarySize.radius,
			color: '#ff9100',
			parent: locationData.pastFathersHome,
			shape: 'circle',
			key: 'pastFathersHomeDiningRoom'
		};
		locationData.pastFathersHall = {
			name: 'Hall',
			center: {x: 1200,y: 450},
			radius: tertiarySize.radius,
			color: '#ff9100',
			parent: locationData.pastFathersHome,
			shape: 'circle',
			key: 'pastFathersHall'
		};
		locationData.pastFathersHomeGallery = {
			name: 'Gallery',
			center: {x: 1200,y: 250},
			radius: tertiarySize.radius,
			color: '#ff9100',
			parent: locationData.pastFathersHome,
			shape: 'circle',
			key: 'pastFathersHomeGallery'
		};
		locationData.pastPaddingtonStation = {
			name: 'Paddington Station',
			center: {x: 1470,y: 440},
			radius: tertiarySize.radius,
			color: '#00838f',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastPaddingtonStation'
		};
		locationData.pastPaddingtonStationTrain = {
			name: 'Train',
			center: {x: 1490,y: 460},
			radius: 15,
			color: '#00838f',
			parent: locationData.pastPaddingtonStation,
			shape: 'circle',
			key: 'pastPaddingtonStationTrain'
		};
		locationData.pastMelsteadCarbury = {
			name: 'Melstead Caruby',
			center: {x: 1593, y: 534},
			radius: tertiarySize.radius,
			color: '#ba68c8',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastMelsteadCarbury'
		};
		locationData.pastDunkirk = {
			name: 'Dunkirk',
			center: {x: 1850, y: 600},
			radius: tertiarySize.radius,
			color: '#004d40',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastDunkirk'
		};
		locationData.pastParis = {
			name: 'Paris',
			center: {x: 1750, y: 360},
			radius: secondarySize.radius,
			color: '#0d47a1',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastParis'
		};
		locationData.pastParisLotti = {
			name: 'Lotti',
			center: {x: 1750, y: 415},
			radius: tertiarySize.radius,
			color: '#0d47a1',
			parent: locationData.pastParis,
			shape: 'circle',
			key: 'pastParisLotti'
		};
		locationData.pastParisFoyots = {
			name: 'Foyot\'s',
			center: {x: 1805, y: 360},
			radius: tertiarySize.radius,
			color: '#0d47a1',
			parent: locationData.pastParis,
			shape: 'circle',
			key: 'pastParisFoyots'
		};
		locationData.pastParisGareDeLyon = {
			name: 'Gare de Lyon',
			center: {x: 1750, y: 305},
			radius: tertiarySize.radius,
			color: '#0d47a1',
			parent: locationData.pastParis,
			shape: 'circle',
			key: 'pastParisGareDeLyon'
		};
		locationData.pastMilan = {
			name: 'Milan',
			center: {x: 1550, y: 350},
			radius: tertiarySize.radius,
			color: '#e91e63',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastMilan'
		};
		locationData.pastVenice = {
			name: 'Venice',
			center: {x: 1450, y: 175},
			radius: secondarySize.radius,
			color: '#ff5722',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastVenice'
		};
		locationData.pastVeniceBridesheadsHouse = {
			name: 'Brideshead Sr\'s House',
			center: {x: 1464, y: 224},
			radius: tertiarySize.radius,
			color: '#ff5722',
			parent: locationData.pastVenice,
			shape: 'circle',
			key: 'pastVeniceBridesheadsHouse'
		};
		locationData.pastVeniceFlorians = {
			name: 'Florian\'s',
			center: {x: 1404, y: 159},
			radius: 10,
			color: '#ff5722',
			parent: locationData.pastVenice,
			shape: 'circle',
			key: 'pastVeniceFlorians'
		};
		locationData.pastLondon = {
			name: 'London',
			center: {x: 1366, y: 296},
			radius: tertiarySize.radius,
			color: '#c62828',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastLondon'
		};
				locationData.pastMarchmainHouse = {
			name: 'Marchmain House',
			center: {x: 1410,y: 340},
			radius: 10,
			color: '#c62828',
			parent: locationData.pastLondon,
			shape: 'circle',
			key: 'pastMarchmainHouse'
		};
		locationData.pastMaMayfields = {
			name: 'Ma Mayfield\'s',
			center: {x: 1429,y: 323},
			radius: 10,
			color: '#c62828',
			parent: locationData.pastLondon,
			shape: 'circle',
			key: 'pastMaMayfields'
		};
		locationData.pastJail = {
			name: 'Jail',
			center: {x: 1450, y: 350},
			radius: 10,
			color: '#c62828',
			parent: locationData.pastLondon,
			shape: 'circle',
			key: 'pastJail'
		};
		locationData.pastRexsHouse = {
			name: 'Rex\'s',
			center: {x: 1325, y: 356},
			radius: 10,
			color: '#c62828',
			parent: locationData.pastLondon,
			shape: 'circle',
			key: 'pastRexsHouse'
		};
		locationData.pastCourt = {
			name: 'Court',
			center: {x: 1425, y: 380},
			radius: 10,
			color: '#c62828',
			parent: locationData.pastLondon,
			shape: 'circle',
			key: 'pastCourt'
		};

		// Present Locations
		// 
		locationData.present = {name: 'Present', shape: 'rect', radius: 800, center: {x: 250, y: 500}, key: 'present'};
		locationData.presentBrideshead = {
					name: 'Brideshead',
					center: {x: 250, y: 800},
					color: '#4CAF50',
					radius: primarySize.radius,
					parent: locationData.present,
				  shape: 'circle',
				  key: 'presentBrideshead'
				};
		locationData.presentBridesheadChapel = {
					name: 'Chapel',
					center: {x: 250, y: 925},
					radius: secondarySize.radius,
					color: '#4CAF50',
					parent: locationData.presentBrideshead,
					shape: 'circle',
					key: 'presentBridesheadChapel'
				};
		locationData.presentBridesheadNanny = {
					name: 'Nursery',
					center: {x: 125, y: 800},
					radius: secondarySize.radius,
					color: '#4CAF50',
					parent: locationData.presentBrideshead,
					shape: 'circle',
					key: 'presentBridesheadChapel'
				};
		locationData.presentArmyCamp1 = {
					name: 'Army Camp 1',
					center: {x: 255, y: 200},
					color: '#2196F3',
					radius: 40,
					parent: locationData.present,
				  shape: 'circle',
				  key: 'presentArmyCamp1'
				};
		locationData.presentArmyCamp1Huts = {
					name: 'Huts',
					center: {x: 325, y: 345},
					color: '#2196F3',
					radius: tertiarySize.radius,
					parent: locationData.presentArmyCamp1,
				  shape: 'circle',
				  key: 'presentArmyCamp1Huts'
				};
		locationData.presentArmyCamp1NearbyCity= {
					name: 'City (near Army Camp 1)',
					center: {x: 275, y: 275},
					color: '#607D8B',
					radius: 40,
					parent: locationData.presentArmyCamp1,
				  shape: 'circle',
				  key: 'presentArmyCamp1NearbyCity'
				};
		locationData.presentArmyCamp1NearbyCityMadhouse= {
					name: 'Mad House',
					center: {x: 305, y: 495},
					color: '#607D8B',
					radius: tertiarySize.radius,
					parent: locationData.presentArmyCamp1,
				  shape: 'circle',
				  key: 'presentArmyCamp1NearbyCityMadhouse'
				};
		locationData.presentTrain= {
					name: 'Train',
					center: {x: 425, y: 460},
					color: '#3F51B5',
					radius: 35,
					parent: locationData.present,
				  shape: 'circle',
				  key: 'presentTrain'
				};
		locationData.presentTrainCOsCarriage= {
					name: 'CO\'s Carriage',
					center: {x: 425, y: 485},
					color: '#3F51B5',
					radius: tertiarySize.radius,
					parent: locationData.presentTrain,
				  shape: 'circle',
				  key: 'presentTrainCOsCarriage'
				};
		locationData.presentTrainStation1= {
					name: 'Train Station 1',
					center: {x: 425, y: 400},
					color: '#607D8B',
					radius: tertiarySize.radius,
					parent: locationData.present,
				  shape: 'circle',
				  key: 'presentTrainStation1'
				};
		locationData.presentTrainStation2= {
					name: 'Train Station 2',
					center: {x: 425, y: 700},
					color: '#607D8B',
					radius: tertiarySize.radius,
					parent: locationData.present,
				  shape: 'circle',
				  key: 'presentTrainStation2'
				};
		locationData.presentArmyCamp2= {
					name: 'Army Camp 2',
					center: {x: 425, y: 780},
					color: '#2196F3',
					radius: 40,
					parent: locationData.present,
				  shape: 'circle',
				  key: 'presentArmyCamp2'
				};
		locationData.presentArmyCamp2Huts= {
					name: 'Huts',
					center: {x: 425, y: 825},
					color: '#2196F3',
					radius: tertiarySize.radius,
					parent: locationData.presentArmyCamp2,
				  shape: 'circle',
				  key: 'presentArmyCamp2Huts'
				};

		$(locationKeys).each(function(index, value){
			// console.log(value);
			if(locationData[value].shape === 'circle'){
				
				pathLocationsShapes.push(new Path.Circle({
					fillColor: locationData[value].color,
					center: [locationData[value].center.x, locationData[value].center.y],
					radius: [locationData[value].radius],
					strokeColor: locationData[value].name == "Past" ? 'white' : 'default', 
					strokeWidth: locationData[value].name == "Past" ? '5' : '0', 
					shadowColor: 'rgb(10,10,10)',
					shadowBlur: 4,
					shadowOffset: new Point(2, 2)
				}));
				numpathLocations++; // rect has already been added and accounted for so just add circle count

				locationsMetaData.push({
					name: locationData[value].name,
					key: value,
					parent: (locationData[value].parent ? {
						name: locationData[value].parent.name, 
						key: locationData[value].parent.key
					} : undefined)
				});
			}
		});
		// console.log(locationsMetaData);
		insertText();
	}

	drawpathLocations();

	// contains the order of the plot
	var plotKeys = [
		'presentArmyCamp1',
		'presentArmyCamp1NearbyCity',
		'presentArmyCamp1Huts',
		'presentArmyCamp1NearbyCityMadhouse',
		'presentTrainStation1',
		'presentTrain',
		'presentTrainCOsCarriage',
		'presentTrainStation2',
		'presentArmyCamp2',
		'presentArmyCamp2Huts',
	];
	// Set the last position that charlesDot was at to be the starting position
	// 
	lastPosition = new Point(locationData[[plotKeys[0]]].center.x, locationData[[plotKeys[0]]].center.y);
	currentIntersect = locationData.presentArmyCamp1;

	// set charles dot and set start point to be the x,y coords of the first location according to the order in plotKeys
	// 
	charlesDot = new Path.Circle({
			center: [0, 0],
		 	radius: 7,
		 	fillColor: 'white', 
		 	position: lastPosition
	});

	$(plotKeys).each(function(index, value){
		plotPoints.push(new Point(locationData[value].center.x, locationData[value].center.y));
	});
	// plotPoints.push(new Point(1328, 692)); // intermediate point so doesn't go through a location it is not supposed to
	// Book 1: Chapter 1
	// 
	plotPoints.push(new Point(locationData.pastOxfordCharlesRoom.center.x, locationData.pastOxfordCharlesRoom.center.y));
	plotPoints.push(new Point(locationData.pastCarFaxStation.center.x, locationData.pastCarFaxStation.center.y));
	plotPoints.push(new Point(locationData.pastBotleyRoad.center.x, locationData.pastBotleyRoad.center.y));
	plotPoints.push(new Point(locationData.pastSwindon.center.x, locationData.pastSwindon.center.y));
	plotPoints.push(new Point(locationData.pastPicturesqueSpot.center.x, locationData.pastPicturesqueSpot.center.y));
	plotPoints.push(new Point(locationData.pastOxfordCharlesRoom.center.x, locationData.pastOxfordCharlesRoom.center.y));
	plotPoints.push(new Point(locationData.pastOxfordClasses.center.x, locationData.pastOxfordClasses.center.y));
	// plotPoints.push(new Point(1700, 630));
	plotPoints.push(new Point(locationData.pastOxfordSebastiansRoom.center.x, locationData.pastOxfordSebastiansRoom.center.y));
	plotPoints.push(new Point(1002, 686));
	plotPoints.push(new Point(locationData.pastOxfordBotanicalGardens.center.x, locationData.pastOxfordBotanicalGardens.center.y));
	plotPoints.push(new Point(locationData.pastOxfordCharlesRoom.center.x, locationData.pastOxfordCharlesRoom.center.y));
	plotPoints.push(new Point(locationData.pastPicturesqueSpot.center.x, locationData.pastPicturesqueSpot.center.y));
	plotPoints.push(new Point(locationData.pastFarmToEat.center.x, locationData.pastFarmToEat.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadServantsEntrance.center.x, locationData.pastBridesheadServantsEntrance.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadNanny.center.x, locationData.pastBridesheadNanny.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadChapel.center.x, locationData.pastBridesheadChapel.center.y));
	plotPoints.push(new Point(locationData.pastGodstow.center.x, locationData.pastGodstow.center.y));
	plotPoints.push(new Point(locationData.pastTrout.center.x, locationData.pastTrout.center.y));
	plotPoints.push(new Point(locationData.pastOxford.center.x, locationData.pastOxford.center.y));
	// Book 1: Chapter 2
	// 
	plotPoints.push(new Point(locationData.pastOxfordCharlesRoom.center.x, locationData.pastOxfordCharlesRoom.center.y));
	plotPoints.push(new Point(730, 730));
	plotPoints.push(new Point(locationData.pastRavenna.center.x, locationData.pastRavenna.center.y));
	// plotPoints.push(new Point(locationData.pastOxford.center.x, locationData.pastOxford.center.y));
	plotPoints.push(new Point(854, 557));
	plotPoints.push(new Point(915, 560));
	plotPoints.push(new Point(locationData.pastOxfordAlexanders.center.x, locationData.pastOxfordAlexanders.center.y));
	plotPoints.push(new Point(locationData.pastOxfordCharlesRoom.center.x, locationData.pastOxfordCharlesRoom.center.y));
	plotPoints.push(new Point(locationData.pastOxfordTeashop.center.x, locationData.pastOxfordTeashop.center.y));
	plotPoints.push(new Point(1000, 670));
	plotPoints.push(new Point(locationData.pastOxfordSebastiansRoom.center.x, locationData.pastOxfordSebastiansRoom.center.y));
	// Book 1: Chapter 3
	// 
	plotPoints.push(new Point(locationData.pastFathersHomeDiningRoom.center.x, locationData.pastFathersHomeDiningRoom.center.y));
	plotPoints.push(new Point(locationData.pastFathersHomeGardenRoom.center.x, locationData.pastFathersHomeGardenRoom.center.y));
	plotPoints.push(new Point(locationData.pastFathersHomeCharlesRoom.center.x, locationData.pastFathersHomeCharlesRoom.center.y));
	plotPoints.push(new Point(locationData.pastFathersHomeGardenRoom.center.x, locationData.pastFathersHomeGardenRoom.center.y));
	plotPoints.push(new Point(locationData.pastFathersHomeDiningRoom.center.x, locationData.pastFathersHomeDiningRoom.center.y));
	plotPoints.push(new Point(locationData.pastFathersHomeGallery.center.x, locationData.pastFathersHomeGallery.center.y));
	plotPoints.push(new Point(locationData.pastFathersHomeDiningRoom.center.x, locationData.pastFathersHomeDiningRoom.center.y));
	plotPoints.push(new Point(locationData.pastFathersHall.center.x, locationData.pastFathersHall.center.y));
	plotPoints.push(new Point(locationData.pastPaddingtonStation.center.x, locationData.pastPaddingtonStation.center.y));
	plotPoints.push(new Point(locationData.pastPaddingtonStationTrain.center.x, locationData.pastPaddingtonStationTrain.center.y));
	plotPoints.push(new Point(locationData.pastMelsteadCarbury.center.x, locationData.pastMelsteadCarbury.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadPaintedParlour.center.x, locationData.pastBridesheadPaintedParlour.center.y));
	plotPoints.push(new Point(1568, 776));
	plotPoints.push(new Point(locationData.pastBridesheadLibrary.center.x, locationData.pastBridesheadLibrary.center.y));
	// Book 1: Chapter 4
	// 
	plotPoints.push(new Point(1576, 816));
	plotPoints.push(new Point(locationData.pastBridesheadColonnade.center.x, locationData.pastBridesheadColonnade.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadPaintedParlour.center.x, locationData.pastBridesheadPaintedParlour.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadRoof.center.x, locationData.pastBridesheadRoof.center.y));
	plotPoints.push(new Point(locationData.pastDunkirk.center.x, locationData.pastDunkirk.center.y));
	plotPoints.push(new Point(locationData.pastParisLotti.center.x, locationData.pastParisLotti.center.y));
	plotPoints.push(new Point(locationData.pastParisFoyots.center.x, locationData.pastParisFoyots.center.y));
	plotPoints.push(new Point(locationData.pastParisGareDeLyon.center.x, locationData.pastParisGareDeLyon.center.y));
	plotPoints.push(new Point(locationData.pastMilan.center.x, locationData.pastMilan.center.y));
	plotPoints.push(new Point(locationData.pastVeniceBridesheadsHouse.center.x, locationData.pastVeniceBridesheadsHouse.center.y));
	plotPoints.push(new Point(locationData.pastVeniceFlorians.center.x, locationData.pastVeniceFlorians.center.y));
	plotPoints.push(new Point(locationData.pastVeniceBridesheadsHouse.center.x, locationData.pastVeniceBridesheadsHouse.center.y));
	plotPoints.push(new Point(locationData.pastVenice.center.x, locationData.pastVenice.center.y));
	plotPoints.push(new Point(locationData.pastVeniceBridesheadsHouse.center.x, locationData.pastVeniceBridesheadsHouse.center.y));
	plotPoints.push(new Point(locationData.pastLondon.center.x, locationData.pastLondon.center.y));
	plotPoints.push(new Point(1293, 818));
	plotPoints.push(new Point(1339, 853));
	plotPoints.push(new Point(1417, 865)); // point on brideshead
	plotPoints.push(new Point(1339, 853));
	plotPoints.push(new Point(1293, 818));
	plotPoints.push(new Point(1317, 568));
	plotPoints.push(new Point(locationData.pastFathersHome.center.x, locationData.pastFathersHome.center.y));
	// Book 1: Chapter 5
	//
	plotPoints.push(new Point(locationData.pastOxfordSebastiansRoom.center.x, locationData.pastOxfordSebastiansRoom.center.y));
	plotPoints.push(new Point(995, 680)); // point in oxford
	plotPoints.push(new Point(locationData.pastOxfordTeashop.center.x, locationData.pastOxfordTeashop.center.y));
	plotPoints.push(new Point(locationData.pastOxford.center.x, locationData.pastOxford.center.y));
	plotPoints.push(new Point(locationData.pastOxfordTeashop.center.x, locationData.pastOxfordTeashop.center.y));
	plotPoints.push(new Point(locationData.pastOxfordClasses.center.x, locationData.pastOxfordClasses.center.y));
	plotPoints.push(new Point(locationData.pastOxfordTeashop.center.x, locationData.pastOxfordTeashop.center.y));
	plotPoints.push(new Point(1087, 808)); // point in oxford
	plotPoints.push(new Point(locationData.pastOxfordStEbbs.center.x, locationData.pastOxfordStEbbs.center.y));
	plotPoints.push(new Point(1087, 808)); // point in oxford
	plotPoints.push(new Point(locationData.pastOxfordStClements.center.x, locationData.pastOxfordStClements.center.y));
	plotPoints.push(new Point(1087, 808)); // point in oxford
	plotPoints.push(new Point(locationData.pastOxfordGardenersArms.center.x, locationData.pastOxfordGardenersArms.center.y));
	plotPoints.push(new Point(1087, 808)); // point in oxford
	plotPoints.push(new Point(locationData.pastOxfordNagsHead.center.x, locationData.pastOxfordNagsHead.center.y));
	plotPoints.push(new Point(1087, 808)); // point in oxford
	plotPoints.push(new Point(locationData.pastOxfordTurfInHellPassage.center.x, locationData.pastOxfordTurfInHellPassage.center.y));
	plotPoints.push(new Point(1087, 808)); // point in oxford
	plotPoints.push(new Point(locationData.pastBridesheadSebastiansRoom.center.x, locationData.pastBridesheadSebastiansRoom.center.y));
	plotPoints.push(new Point(1303, 610));
	plotPoints.push(new Point(locationData.pastMarchmainHouse.center.x, locationData.pastMarchmainHouse.center.y));
	plotPoints.push(new Point(locationData.pastMaMayfields.center.x, locationData.pastMaMayfields.center.y));
	plotPoints.push(new Point(locationData.pastJail.center.x, locationData.pastJail.center.y));
	plotPoints.push(new Point(1394, 370));
	plotPoints.push(new Point(locationData.pastRexsHouse.center.x, locationData.pastRexsHouse.center.y));
	plotPoints.push(new Point(locationData.pastCourt.center.x, locationData.pastCourt.center.y));
	plotPoints.push(new Point(1187, 645)); 
	plotPoints.push(new Point(1079, 694)); // point in oxford
	plotPoints.push(new Point(1094, 833)); 
	plotPoints.push(new Point(1485, 857)); 
	plotPoints.push(new Point(locationData.pastBridesheadTapestryHall.center.x, locationData.pastBridesheadTapestryHall.center.y));
	plotPoints.push(new Point(1485, 857)); 
	plotPoints.push(new Point(1094, 833)); 
	plotPoints.push(new Point(1079, 694)); // point in oxford
	plotPoints.push(new Point(1094, 833)); 
	plotPoints.push(new Point(1485, 857)); 
	plotPoints.push(new Point(locationData.pastBridesheadGardenRoom.center.x, locationData.pastBridesheadGardenRoom.center.y));
	plotPoints.push(new Point(1452, 821));
	plotPoints.push(new Point(locationData.pastBridesheadDrawingRoom.center.x, locationData.pastBridesheadDrawingRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadSebastiansRoom.center.x, locationData.pastBridesheadSebastiansRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadDiningRoom.center.x, locationData.pastBridesheadDiningRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadSebastiansRoom.center.x, locationData.pastBridesheadSebastiansRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadLadyMarchmainsRoom.center.x, locationData.pastBridesheadLadyMarchmainsRoom.center.y));
	plotPoints.push(new Point(1496, 809));
	plotPoints.push(new Point(1405, 833));
	plotPoints.push(new Point(1290, 850));
	plotPoints.push(new Point(locationData.pastLondon.center.x, locationData.pastLondon.center.y));
	plotPoints.push(new Point(1373, 405));
	plotPoints.push(new Point(locationData.pastPaddingtonStation.center.x, locationData.pastPaddingtonStation.center.y));
	plotPoints.push(new Point(1073, 694));
	plotPoints.push(new Point(locationData.pastOxfordBlackwells.center.x, locationData.pastOxfordBlackwells.center.y));
	plotPoints.push(new Point(locationData.pastCarFaxStation.center.x, locationData.pastCarFaxStation.center.y));
	plotPoints.push(new Point(1262, 819));
	plotPoints.push(new Point(locationData.pastLondon.center.x, locationData.pastLondon.center.y));
	plotPoints.push(new Point(1293, 818));
	plotPoints.push(new Point(1339, 853));
	plotPoints.push(new Point(locationData.pastBridesheadGardenRoom.center.x, locationData.pastBridesheadGardenRoom.center.y));
	// Book 2: Chapter 1
	// 
	plotPoints.push(new Point(1452, 821));
	plotPoints.push(new Point(locationData.pastBridesheadDrawingRoom.center.x, locationData.pastBridesheadDrawingRoom.center.y));

	function insertText(){
		var fontSize = '1.5rem';
		$(locationKeys).each(function(index, value){
			if(['Past', 'Present'].indexOf(locationData[value].name) == -1){
				fontSize = '0.8rem';

				new PointText({
					point: [locationData[value].center.x, locationData[value].center.y],
			    content: locationData[value].name,
			    fillColor: 'white',
			    fontFamily: 'Tahoma',
			    fontWeight: 'bold',		    
			    shadowColor: (new Color(0, 0, 0)),
    			shadowBlur: 3,
    			shadowOffset: (new Point(1, 1)),
			    fontSize: locationData[value].radius == primarySize.radius ? '1.2rem' : fontSize,
			    justification: 'center'
				});
			} else {
				var y = 75;
				var x = (locationData[value].name == 'Past' ? 1200 : 300);
				// var color =  locationData[value].name == 'Past' ? 'white' : 'white';
				fontSize = '2.2rem';
				new PointText({
					point: [x, y],
			    content: locationData[value].name,
			    fillColor: '#ffea00',
			    fontFamily: 'Tahoma',
			    fontWeight: 'bold',
			    fontSize: fontSize,
			    justification: 'center'
				});
			}
		});
	}

	// TODO: Once 4 new pathLocations have been hit then fade the one that occurred 4 ago.

	segment1 = new Segment(new Point(400, 600), zeroZero, zeroZero);
	segment2 = new Segment(new Point(400, 601), zeroZero, zeroZero);

	bridesheadPath.add(segment1, segment2);
	bridesheadPath.position = new Point(locationData[[plotKeys[0]]].center.x, locationData[[plotKeys[0]]].center.y)
	
	project.activeLayer.addChild(charlesDot)
	
	// calculate the length of one part of the path
	length = bridesheadPath.length / amount;

	function drawCharlesPathPieces(){  	
  	// var segment3 = new Segment(lastPosition);
  	// var segment4 = new Segment(charlesPosition);
  	var line; 

  	// Draw some unique symbol every 5th iteration
  	if(currentPosition % 5 != 0){
  		line = new Path.Line({
  		    from: [lastPosition.x, lastPosition.y],
  		    to: [charlesPosition.x, charlesPosition.y],
  		    strokeColor: (activeParentTree[0] == 'Past' ? '#FF0E00' : '#B1160E'),
			    strokeWidth: 4
  		});
  		// console.log('currentIntersectName: ' + currentLocationName);
  		// if(insideLocation && (currentLocationName !== 'Past')){
  		// 	line.sendToBack();
  		// } else {
  			line.sendToBack();
  		// }
  	} else if(activeParentTree.indexOf('Train') != -1){
			var line = new Path.Line({
				from: [(charlesPosition.x - 5), charlesPosition.y],
		    to: [(charlesPosition.x + 5), charlesPosition.y],
		    strokeColor: '#B1160E',
		    strokeWidth: 4
			}).sendToBack();
		}
		lastPosition = charlesPosition;
	}

	function moveCharlesDot(){
		charlesPosition = bridesheadPath.getPointAt(currentPosition * (length));
    charlesDot.position =  charlesPosition;
    ++currentPosition; // Move charles Dot ahead by one position
	}

	// animate the circle, moving from position to position along the bridesheadPath
	function onFrame(event){
    if((currentPosition * length) < bridesheadPath.length){
    	// Move charles dot regardless of whether the path is being drawn or not.
    	moveCharlesDot();
 
    	if((pathLocationIndex = isInApathLocation(charlesDot)) !== false){
    		insertListItem(pathLocationIndex);
    		drawCharlesPathPieces();
    	} else {
    		drawCharlesPathPieces();
    	}
    	lastPosition = charlesPosition;
    } else {
    	// Keep charlesDot at its current position
    	charlesDot.position = lastPosition;
    }
	}

	function createPathCircle( charlesPosition, color, size){
		var pathCircle = new Path.Circle( charlesPosition, size);
		pathCircle.fillColor = color;
		if(size === 5){
			pathCircle.shadowColor = new Color(0, 0, 0);
    	pathCircle.shadowBlur = 4;
    	pathCircle.shadowOffset = new Point(1, 1);
		}
		// Fade out the circle by scaling after 5 seconds.
		setTimeout(function(){
			pathCircle.scale(0.0);
		}, 3000);
    return pathCircle;
	}

	/**
	 * Resets the array containing the names of the parent elements in the active list tree
	 * @param  {string} parentLocation - the name of the parent to be placed at index 0 of the array
	 * @return {underfined}
	 */
	function resetParentTree(parentLocation){
		activeParentTree = [parentLocation];
	}

	function appendListItemToList($listToAppendTo, newLocationMeta){
		$('.most-recent-li').removeClass('most-recent-li');
		var isPastOrPreset = newLocationMeta.key == 'past' || newLocationMeta.key == 'past';

		$listToAppendTo.append('<li class="most-recent-li" data-name="' + newLocationMeta.name + '"><span class="li-content" style="display:none;' + (isPastOrPreset ? '' : 'color:' + locationData[newLocationMeta.key].color + ';') + '">' + newLocationMeta.name + '</span><ol class="children"></ol></li>');
		// Animate the item sliding down for 500ms
		$('.most-recent-li').find('.li-content').animate({opacity: 'toggle'}, 200, function(){
				// console.log('after')
			$('#location-list').animate({scrollTop: $('#location-list').prop("scrollHeight")}, 300);
		});
	}

	function insertListItem(pathLocationIndex){
		insertNewLocationContent(locationsMetaData[pathLocationIndex]);
	}

	function insertNewLocationContent(newLocation){
		var $locationList = $('#location-list');
		var $activeParentListItem = $locationList.children('li:last');
		var $parentList;
		// check if the content of the new list item element is different from the element that is trying to be inserted.
		if(currentLocationName == newLocation.name){
			return; // return early if the locations match
		} else {
			// If it does not have a parent, then insert a new item to the base list
			if(newLocation.parent === undefined){
				
				// Reset the array containing the keys of the lowest tree branch
				if(activeParentTree.indexOf(newLocation.name) == -1){
					resetParentTree(newLocation.name);
					appendListItemToList($locationList, newLocation);
				} else {
					return;
				}
			} else if(newLocation.parent.name == activeParentTree[0] && (activeParentTree[1] !== newLocation.name) && ($('.most-recent-li').data('name') != newLocation.name)){
				activeParentTree[1] = newLocation.name;
				appendListItemToList($locationList.find('[data-name="' + newLocation.parent.name + '"]:last').children('.children'), newLocation);
			}
			else if(newLocation.parent.name == currentLocationName && ($('.most-recent-li').data('name') != newLocation.name)){						
				// attach the new list item to the parent
				$parentList = $locationList.find('[data-name="' + currentLocationName + '"]:last').children('.children');
				
				appendListItemToList($parentList, newLocation);
			} // otherwise, insert the parent as well as the child list-item 
			else if(activeParentTree.indexOf(newLocation.parent.name) == -1){
		  	activeParentTree[1] = newLocation.parent.name;

		  	appendListItemToList($activeParentListItem.children('.children'), newLocation.parent);
		  	currentLocationName = newLocation.parent.name;
		  	// recursively check to see if the parent's parent exists up the current tree
		  	insertNewLocationContent(newLocation, true);
		  } else if((activeParentTree[1] == newLocation.parent.name) && ($('.most-recent-li').data('name') != newLocation.name)){
		  	appendListItemToList($locationList.find('[data-name="' + newLocation.parent.name + '"]:last').children('.children'), newLocation);
		  }
			currentLocationName = newLocation.name; // update the currentLocationName
	  }
	}

	/**
	 * Check if the pathLocation of Charles is within a pathLocation.
	 * @param  {[type]}  charlesDot [description]
	 * @return {Boolean}            [description]
	 */
	function isInApathLocation(charlesDot){
		for(var j = 0; j < numpathLocations; j++){

			if(charlesDot.intersects(pathLocationsShapes[j])){
				// console.log(pathLocations[j]);
				
				insideLocation = !insideLocation;
				if(insideLocation){
					currentIntersect = activeParentTree[j];
				}
				return j;
			}
		}
		return false;
	}

	$('.start-button').click(function(e){
		e.preventDefault();
    for(var i = 0; i < plotPoints.length; i++){
    	bridesheadPath.add(new Segment(plotPoints[i], new Point(0,0), new Point(0,0)));
    	amount = bridesheadPath.length / length;
    	length = bridesheadPath.length / amount;
    }
    paper.view.attach('frame', onFrame);
	});
	   
	paper.tool.onMouseDown = function(event) {
		var $mousePos = $('.mouse-pos');
		if($mousePos.length == 0){
			$('body').append('<div class="mouse-pos">' + event.point.x + ', ' + event.point.y + '</div>');
		} else {
			$mousePos.text(event.point.x + ', ' + event.point.y);
		}
		
	}
});