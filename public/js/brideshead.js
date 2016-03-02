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
	var amount = 0.2; // controls the speed at which the movement will occur
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
		'pastBridesheadJuliasRoom',
		'pastBridesheadCdr',
		'pastBridesheadNanny',
		'pastBridesheadFountain',
		'pastBridesheadServantsEntrance',
		'pastBridesheadPaintedParlour',
		'pastBridesheadLibrary',
		'pastBridesheadColonnade',
		'pastBridesheadGardenRoom',
		'pastBridesheadRoof',
		'pastWarOffice',
		'pastCharlesFlat',
		'pastPark',
		'pastParkStoneBridge',
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
		'pastTangier',
		'pastOxfordAlexanders',
		'pastOxfordTeashop',
		'pastOxfordStClements',
		'pastOxfordStEbbs',
		'pastOxfordGardenersArms',
		'pastOxfordNagsHead',
		'pastOxfordTurfInHellPassage',	
		'pastMaMayfields',
		'pastCarFaxStation',
		'pastBotleyRoad',
		'pastSwindon',
		'pastMexico',
		'pastGuatamala',
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
		'pastArtGallery',
		'pastBlueGrottoClub',
		'pastDunkirk',
		'pastNewYork',
		'pastNewYorkSavoyCarlton',
		'pastCruiseShip',
		'pastCruiseShipHall',
		'pastCruiseShipCharlesCabin',
		'pastCruiseShipJuliasCabin',
		'pastCruiseShipLounge',
		'pastCruiseShipSmokingRoom',
		'pastCruiseShipSittingRoom',
		'pastCruiseShipRestaurant',
		'pastParis',
		'pastParisLotti',
		'pastParisFoyots',
		'pastParisGareDeLyon',
		'pastMilan',
		'pastVenice',
		'pastVeniceBridesheadsHouse',
		'pastVeniceFlorians',
		'pastLondon',
		'pastLondonVictoria',
		'pastLondonCafeRoyal',
		'pastMorocco',
		'pastMoroccoSebastiansHouse',
		'pastMoroccoHospital',
		'pastMoroccoCasablanca',
		'pastMoroccoFez',
		'present',
		'presentBrideshead',
		'presentBridesheadChapel',
		'presentBridesheadSebastiansRoom',
		'presentBridesheadJuliasRoom',
		'presentBridesheadCdr',
		'presentBridesheadCdr',
		'presentBridesheadServantsEntrance',
		'presentBridesheadLadyMarchmainsRoom',
		'presentBridesheadDiningRoom',
		'presentBridesheadDrawingRoom',
		'presentBridesheadTapestryHall',
		'presentBridesheadPaintedParlour',
		'presentBridesheadColonnade',
		'presentBridesheadFountain',
		'presentBridesheadRoof',
		'presentBridesheadLibrary',
		'presentBridesheadGardenRoom',
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
	// $('.down-speed').click(function(e){
	// 	e.preventDefault();
	// 	amount += 0.05;
	// 	length = bridesheadPath.length / amount
	// });
	// increase speed on button click
	// 
	// $('.up-speed').click(function(e){
	// 	e.preventDefault();
	// 	if(amount > 0.05){
	// 		amount -= 0.05;
	// 		length = bridesheadPath.length / amount
	// 	}
	// });

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
			center: {x: 1500, y:780},
			radius: primarySize.radius,
			color: '#4caf50',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastBrideshead'
		};
		locationData.pastBridesheadChapel = {
			name: 'Chapel',
			center: {x: locationData.pastBrideshead.center.x - 100, y: locationData.pastBrideshead.center.y - 80},
			radius: tertiarySize.radius,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadChapel'
		};
		locationData.pastBridesheadSebastiansRoom = {
			name: 'Sebastian\'s Room',
			center: {x: locationData.pastBrideshead.center.x - 150, y: locationData.pastBrideshead.center.y + 25},
			radius: tertiarySize.radius,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadSebastiansRoom'
		};
		locationData.pastBridesheadJuliasRoom = {
			name: 'Julia\'s Room',
			center: {x: locationData.pastBrideshead.center.x + 130, y: locationData.pastBrideshead.center.y + 25},
			radius: 15,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadJuliasRoom'
		};
		locationData.pastBridesheadCdr = {
			name: 'Chinese Drawing Room',
			center: {x: locationData.pastBrideshead.center.x, y: locationData.pastBrideshead.center.y - 125},
			radius: secondarySize.radius,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadCdr'
		};
		locationData.pastBridesheadNanny = {
			name: 'Nursery',
			center: {x: locationData.pastBrideshead.center.x - 125, y: locationData.pastBrideshead.center.y - 25},
			radius: tertiarySize.radius,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadCdr'
		};
		locationData.pastBridesheadServantsEntrance = {
			name: 'Servants Entrance',
			center: {x: locationData.pastBrideshead.center.x, y: locationData.pastBrideshead.center.y + 130},
			radius: 10,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadServantsEntrance'
		};
		locationData.pastBridesheadLadyMarchmainsRoom = {
			name: 'Lady Marchmain\'s Room',
			center: {x: locationData.pastBrideshead.center.x + 125, y: locationData.pastBrideshead.center.y + 55},
			radius: 10,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadLadyMarchmainsRoom'
		};
		locationData.pastBridesheadDiningRoom = {
			name: 'Dining Room',
			center: {x: locationData.pastBrideshead.center.x, y: locationData.pastBrideshead.center.y + 60},
			radius: 10,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadDiningRoom'
		};
		locationData.pastBridesheadDrawingRoom = {
			name: 'Drawing Room',
			center: {x: locationData.pastBrideshead.center.x - 55, y: locationData.pastBrideshead.center.y + 105},
			radius: 10,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadDrawingRoom'
		};
		locationData.pastBridesheadTapestryHall = {
			name: 'Tapestry Hall',
			center: {x: locationData.pastBrideshead.center.x + 55, y: locationData.pastBrideshead.center.y + 115},
			radius: 10,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadTapestryHall'
		};
		locationData.pastBridesheadPaintedParlour = {
			name: 'Painted Parlour',
			center: {x: locationData.pastBrideshead.center.x + 100, y: locationData.pastBrideshead.center.y - 100},
			radius: tertiarySize.radius,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadPaintedParlour'
		};
		locationData.pastBridesheadColonnade = {
			name: 'Colonnade',
			center: {x: locationData.pastBrideshead.center.x + 120, y: locationData.pastBrideshead.center.y - 50},
			radius: 15,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadColonnade'
		};
		locationData.pastBridesheadFountain = {
			name: 'Terrace near Fountain',
			center: {x: locationData.pastBrideshead.center.x + 155, y: locationData.pastBrideshead.center.y - 5},
			radius: 15,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadFountain'
		};
		locationData.pastBridesheadRoof = {
			name: 'Roof',
			center: {x: locationData.pastBrideshead.center.x + 160, y: locationData.pastBrideshead.center.y - 40},
			radius: 15,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadRoof'
		};
		locationData.pastBridesheadLibrary = {
			name: 'Library',
			center: {x: locationData.pastBrideshead.center.x + 100, y: locationData.pastBrideshead.center.y + 100},
			radius: tertiarySize.radius,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadLibrary'
		};
		locationData.pastBridesheadGardenRoom = {
			name: 'Garden Room',
			center: {x: locationData.pastBrideshead.center.x + 35, y: locationData.pastBrideshead.center.y - 25},
			radius: 10,
			color: locationData.pastBrideshead.color,
			parent: locationData.pastBrideshead,
			shape: 'circle',
			key: 'pastBridesheadGardenRoom'
		};
		locationData.pastPark = {
			name: 'Park',
			center: {x: 1771,y: 896},
			radius: 20,
			color: '#558b2f',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastPark'
		};
		locationData.pastParkStoneBridge = {
			name: 'Stone Bridge',
			center: {x: locationData.pastPark.center.x + 20 ,y: locationData.pastPark.center.y + 20},
			radius: 10,
			color: '#558b2f',
			parent: locationData.pastPark,
			shape: 'circle',
			key: 'pastPark'
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
			radius: tertiarySize.radius,
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
		locationData.pastTangier = {
			name: 'Tangier',
			center: {x: 1790, y: 540},
			radius: 10,
			color: '#4e342e',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastTangier'
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
			center: {x: 1910 + (oxfordTransform.x),y: 575 + (oxfordTransform.y)},
			
			radius: 10,
			color: 'steelblue',
			parent: locationData.pastOxford,
			shape: 'circle',
			key: 'pastOxfordStClements'
		};
		locationData.pastOxfordStEbbs = {
			name: 'St. Ebb\'s',
			center: {x: 1900 + (oxfordTransform.x),y: 550 + (oxfordTransform.y)},
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
			name: 'Turf in Hell Passage',
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
			name: 'Revenna',
			center: {x: 732, y: 663},
			radius: 15,
			color: '#B44012',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastRavenna'
		};
		locationData.pastMexico = {
			name: 'Mexico',
			center: {x: 777, y: 350},
			radius: 15,
			color: '#4a148c',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastMexico'
		};
		locationData.pastGuatamala = {
			name: 'Guatamala',
			center: {x: 750, y: 425},
			radius: 15,
			color: '#9e9d24',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastGuatamala'
		};
		locationData.pastNewYork = {
			name: 'New York',
			center: {x: 890, y: 250},
			radius: tertiarySize.radius,
			color: '#00b8d4',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastNewYork'
		};
		locationData.pastNewYorkSavoyCarlton = {
			name: 'Savoy Carlton Hotel',
			center: {x: 900, y: 270},
			radius: 10,
			color: '#00b8d4',
			parent: locationData.pastNewYork,
			shape: 'circle',
			key: 'pastNewYorkSavoyCarlton'
		};
		locationData.pastCruiseShip = {
			name: 'Cruise Ship',
			center: {x: 1080, y: 150},
			radius: 75,
			color: '#bbdefb',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastCruiseShip'
		};
		locationData.pastCruiseShipHall = {
			name: 'Hall',
			center: {x: 1010, y: 175},
			radius: 15,
			color: '#bbdefb',
			parent: locationData.pastCruiseShip,
			shape: 'circle',
			key: 'pastCruiseShipHall'
		};
		locationData.pastCruiseShipCharlesCabin = {
			name: 'Charles and Celia\'s Cabin',
			center: {x: 1120, y: 210},
			radius: 15,
			color: '#bbdefb',
			parent: locationData.pastCruiseShip,
			shape: 'circle',
			key: 'pastCruiseShipCharlesCabin'
		};
		locationData.pastCruiseShipJuliasCabin = {
			name: 'Julia\'s Cabin',
			center: {x: 1150, y: 175},
			radius: 15,
			color: '#bbdefb',
			parent: locationData.pastCruiseShip,
			shape: 'circle',
			key: 'pastCruiseShipJuliasCabin'
		};
		locationData.pastCruiseShipLounge = {
			name: 'Lounge',
			center: {x: 1010, y: 125},
			radius: 15,
			color: '#bbdefb',
			parent: locationData.pastCruiseShip,
			shape: 'circle',
			key: 'pastCruiseShipLounge'
		};
		locationData.pastCruiseShipSmokingRoom = {
			name: 'Smoking Room',
			center: {x: 1038, y: 90},
			radius: 15,
			color: '#bbdefb',
			parent: locationData.pastCruiseShip,
			shape: 'circle',
			key: 'pastCruiseShipSmokingRoom'
		};
		locationData.pastCruiseShipSittingRoom = {
			name: 'Sitting Room',
			center: {x: 1140,y: 104},
			radius: 15,
			color: '#bbdefb',
			parent: locationData.pastCruiseShip,
			shape: 'circle',
			key: 'pastCruiseShipSittingRoom'
		};
		locationData.pastCruiseShipRestaurant = {
			name: 'Restaurant',
			center: {x: 1080, y: 70},
			radius: 15,
			color: '#bbdefb',
			parent: locationData.pastCruiseShip,
			shape: 'circle',
			key: 'pastCruiseShipRestaurant'
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
			center: {x: 1200,y: 230},
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
		locationData.pastArtGallery = {
			name: 'Gallery',
			center: {x: 1020, y: 410},
			radius: 15,
			color: '#B98940',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastArtGallery'
		};
		locationData.pastBlueGrottoClub = {
			name: 'Blue Grotto Club',
			center: {x: 1029,y: 460},
			radius: 15,
			color: '#3f51b5',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastBlueGrottoClub'
		};
		locationData.pastDunkirk = {
			name: 'Dunkirk',
			center: {x: 1805, y: 405},
			radius: 15,
			color: '#004d40',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastDunkirk'
		};
		locationData.pastParis = {
			name: 'Paris',
			center: {x: 1650, y: 360},
			radius: tertiarySize.radius,
			color: '#0d47a1',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastParis'
		};
		locationData.pastParisLotti = {
			name: 'Lotti',
			center: {x: locationData.pastParis.center.x, y: locationData.pastParis.center.y + 30},
			radius: 10,
			color: '#0d47a1',
			parent: locationData.pastParis,
			shape: 'circle',
			key: 'pastParisLotti'
		};
		locationData.pastParisFoyots = {
			name: 'Foyot\'s',
			center: {x: locationData.pastParis.center.x + 40, y: locationData.pastParis.center.y},
			radius: 10,
			color: '#0d47a1',
			parent: locationData.pastParis,
			shape: 'circle',
			key: 'pastParisFoyots'
		};
		locationData.pastParisGareDeLyon = {
			name: 'Gare de Lyon',
			center: {x: locationData.pastParis.center.x, y: locationData.pastParis.center.y - 30},
			radius: 10,
			color: '#0d47a1',
			parent: locationData.pastParis,
			shape: 'circle',
			key: 'pastParisGareDeLyon'
		};
		locationData.pastCharlesFlat = {
			name: 'Charles\' Flat',
			center: {x: 1535, y: 320},
			radius: 10,
			color: '#C26811',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastCharlesFlat'
		};
		locationData.pastMilan = {
			name: 'Milan',
			center: {x: 1720, y: 230},
			radius: 15,
			color: '#e91e63',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastMilan'
		};
		locationData.pastVenice = {
			name: 'Venice',
			center: {x: 1780, y: 125},
			radius: 18,
			color: '#ff5722',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastVenice'
		};
		locationData.pastVeniceBridesheadsHouse = {
			name: 'Brideshead Sr\'s House',
			center: {x: locationData.pastVenice.center.x - 20, y: locationData.pastVenice.center.y + 30},
			radius: tertiarySize.radius,
			color: '#ff5722',
			parent: locationData.pastVenice,
			shape: 'circle',
			key: 'pastVeniceBridesheadsHouse'
		};
		locationData.pastVeniceFlorians = {
			name: 'Florian\'s',
			center: {x: locationData.pastVenice.center.x - 30, y: locationData.pastVenice.center.y - 20},
			radius: 10,
			color: '#ff5722',
			parent: locationData.pastVenice,
			shape: 'circle',
			key: 'pastVeniceFlorians'
		};
		locationData.pastLondon = {
			name: 'London',
			center: {x: 1440, y: 180},
			radius: tertiarySize.radius,
			color: '#c62828',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastLondon'
		};
		locationData.pastLondonVictoria = {
			name: 'Victoria',
			center: {x: locationData.pastLondon.center.x - 80, y: locationData.pastLondon.center.y + 20},
			radius: 10,
			color: '#c62828',
			parent: locationData.pastLondon,
			shape: 'circle',
			key: 'pastLondonVictoria'
		};
		locationData.pastLondonCafeRoyal = {
			name: 'Cafe Royal',
			center: {x: locationData.pastLondon.center.x - 80, y: locationData.pastLondon.center.y - 10},
			radius: 10,
			color: '#c62828',
			parent: locationData.pastLondon,
			shape: 'circle',
			key: 'pastLondonCafeRoyal'
		};
		locationData.pastMorocco = {
			name: 'Morocco',
			center: {x: 1846, y: 610},
			radius: secondarySize.radius,
			color: '#8d6e63',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastMorocco'
		};
		locationData.pastMoroccoSebastiansHouse = {
			name: 'Sebastian\'s House' ,
			center: {x: locationData.pastMorocco.center.x, y: locationData.pastMorocco.center.y + 50},
			radius: tertiarySize.radius,
			color: '#8d6e63',
			parent: locationData.pastMorocco,
			shape: 'circle',
			key: 'pastMoroccoSebastiansHouse'
		};
		locationData.pastMoroccoCasablanca = {
			name: 'Casablanca' ,
			center: {x: locationData.pastMorocco.center.x - 100, y: locationData.pastMorocco.center.y},
			radius: 10,
			color: '#8d6e63',
			parent: locationData.pastMorocco,
			shape: 'circle',
			key: 'pastMoroccoCasablanca'
		};
		locationData.pastMoroccoFez = {
			name: 'Fez' ,
			center: {x: locationData.pastMorocco.center.x - 50, y: locationData.pastMorocco.center.y + 30},
			radius: 10,
			color: '#8d6e63',
			parent: locationData.pastMorocco,
			shape: 'circle',
			key: 'pastMoroccoFez'
		};
		locationData.pastMoroccoHospital = {
			name: 'Hospital',
			center: {x: locationData.pastMorocco.center.x, y: locationData.pastMorocco.center.y - 50},
			radius: tertiarySize.radius,
			color: '#8d6e63',
			parent: locationData.pastMorocco,
			shape: 'circle',
			key: 'pastMoroccoHospital'
		};
		locationData.pastWarOffice = {
			name: 'War Office',
			center: {x: 1278, y: 154},
			radius: 15,
			color: '#78909c',
			parent: locationData.past,
			shape: 'circle',
			key: 'pastWarOffice'
		};
		locationData.pastMaMayfields = {
			name: 'Ma Mayfield\'s',
			center: {x: locationData.pastLondon.center.x + 40,y: locationData.pastLondon.center.y + 40},
			radius: 10,
			color: '#c62828',
			parent: locationData.pastLondon,
			shape: 'circle',
			key: 'pastMaMayfields'
		};
		locationData.pastJail = {
			name: 'Jail',
			center: {x: locationData.pastLondon.center.x ,y: locationData.pastLondon.center.y - 100},
			radius: 10,
			color: '#c62828',
			parent: locationData.pastLondon,
			shape: 'circle',
			key: 'pastJail'
		};
		locationData.pastRexsHouse = {
			name: 'Rex\'s',
			center: {x: locationData.pastLondon.center.x - 40 ,y: locationData.pastLondon.center.y - 50},
			radius: 10,
			color: '#c62828',
			parent: locationData.pastLondon,
			shape: 'circle',
			key: 'pastRexsHouse'
		};
		locationData.pastCourt = {
			name: 'Court',
			center: {x: locationData.pastLondon.center.x + 40 ,y: locationData.pastLondon.center.y - 50},
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
			center: {x: 208, y: 786},
			radius: primarySize.radius,
			color: '#33691e',
			parent: locationData.present,
			shape: 'circle',
			key: 'presentBrideshead'
		};
		locationData.presentBridesheadChapel = {
			name: 'Chapel',
			center: {x: locationData.presentBrideshead.center.x - 100, y: locationData.presentBrideshead.center.y - 80},
			radius: tertiarySize.radius,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadChapel'
		};
		locationData.presentBridesheadSebastiansRoom = {
			name: 'Sebastian\'s Room',
			center: {x: locationData.presentBrideshead.center.x - 150, y: locationData.presentBrideshead.center.y + 25},
			radius: tertiarySize.radius,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadSebastiansRoom'
		};
		locationData.presentBridesheadJuliasRoom = {
			name: 'Julia\'s Room',
			center: {x: locationData.presentBrideshead.center.x + 130, y: locationData.presentBrideshead.center.y + 25},
			radius: 15,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadJuliasRoom'
		};
		locationData.presentBridesheadCdr = {
			name: 'Chinese Drawing Room',
			center: {x: locationData.presentBrideshead.center.x, y: locationData.presentBrideshead.center.y - 125},
			radius: secondarySize.radius,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadCdr'
		};
		locationData.presentBridesheadNanny = {
			name: 'Nursery',
			center: {x: locationData.presentBrideshead.center.x - 125, y: locationData.presentBrideshead.center.y - 25},
			radius: tertiarySize.radius,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadNanny'
		};
		locationData.presentBridesheadServantsEntrance = {
			name: 'Servants Entrance',
			center: {x: locationData.presentBrideshead.center.x, y: locationData.presentBrideshead.center.y + 130},
			radius: 10,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadServantsEntrance'
		};
		locationData.presentBridesheadLadyMarchmainsRoom = {
			name: 'Lady Marchmain\'s Room',
			center: {x: locationData.presentBrideshead.center.x + 125, y: locationData.presentBrideshead.center.y + 55},
			radius: 10,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadLadyMarchmainsRoom'
		};
		locationData.presentBridesheadDiningRoom = {
			name: 'Dining Room',
			center: {x: locationData.presentBrideshead.center.x, y: locationData.presentBrideshead.center.y + 60},
			radius: 10,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadDiningRoom'
		};
		locationData.presentBridesheadDrawingRoom = {
			name: 'Drawing Room',
			center: {x: locationData.presentBrideshead.center.x - 55, y: locationData.presentBrideshead.center.y + 105},
			radius: 10,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadDrawingRoom'
		};
		locationData.presentBridesheadTapestryHall = {
			name: 'Tapestry Hall',
			center: {x: locationData.presentBrideshead.center.x + 55, y: locationData.presentBrideshead.center.y + 115},
			radius: 10,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadTapestryHall'
		};
		locationData.presentBridesheadPaintedParlour = {
			name: 'Painted Parlour',
			center: {x: locationData.presentBrideshead.center.x + 100, y: locationData.presentBrideshead.center.y - 100},
			radius: tertiarySize.radius,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadPaintedParlour'
		};
		locationData.presentBridesheadColonnade = {
			name: 'Colonnade',
			center: {x: locationData.presentBrideshead.center.x + 120, y: locationData.presentBrideshead.center.y - 50},
			radius: 15,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadColonnade'
		};
		locationData.presentBridesheadFountain = {
			name: 'Terrace near Fountain',
			center: {x: locationData.presentBrideshead.center.x + 155, y: locationData.presentBrideshead.center.y - 5},
			radius: 15,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadFountain'
		};
		locationData.presentBridesheadRoof = {
			name: 'Roof',
			center: {x: locationData.presentBrideshead.center.x + 160, y: locationData.presentBrideshead.center.y - 40},
			radius: 15,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadRoof'
		};
		locationData.presentBridesheadLibrary = {
			name: 'Library',
			center: {x: locationData.presentBrideshead.center.x + 100, y: locationData.presentBrideshead.center.y + 100},
			radius: tertiarySize.radius,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadLibrary'
		};
		locationData.presentBridesheadGardenRoom = {
			name: 'Garden Room',
			center: {x: locationData.presentBrideshead.center.x + 35, y: locationData.presentBrideshead.center.y - 25},
			radius: 10,
			color: locationData.presentBrideshead.color,
			parent: locationData.presentBrideshead,
			shape: 'circle',
			key: 'presentBridesheadGardenRoom'
		};
		locationData.presentArmyCamp1 = {
					name: 'Army Camp 1',
					center: {x: 275, y: 275},
					color: '#2196F3',
					radius: 40,
					parent: locationData.present,
				  shape: 'circle',
				  key: 'presentArmyCamp1'
				};
		locationData.presentArmyCamp1Huts = {
					name: 'Huts',
					center: {x: 300, y: 325},
					color: '#2196F3',
					radius: tertiarySize.radius,
					parent: locationData.presentArmyCamp1,
				  shape: 'circle',
				  key: 'presentArmyCamp1Huts'
				};
		locationData.presentArmyCamp1NearbyCity= {
					name: 'City',
					center: {x: 255, y: 200},
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
					radius: 15,
					parent: locationData.present,
				  shape: 'circle',
				  key: 'presentTrain'
				};
		locationData.presentTrainCOsCarriage= {
					name: 'CO\'s Carriage',
					center: {x: 425, y: 485},
					color: '#3F51B5',
					radius: 10,
					parent: locationData.presentTrain,
				  shape: 'circle',
				  key: 'presentTrainCOsCarriage'
				};
		locationData.presentTrainStation1= {
					name: 'Train Station 1',
					center: {x: 425, y: 400},
					color: '#607D8B',
					radius: 20,
					parent: locationData.present,
				  shape: 'circle',
				  key: 'presentTrainStation1'
				};
		locationData.presentTrainStation2= {
					name: 'Train Station 2',
					center: {x: 460, y: 700},
					color: '#607D8B',
					radius: 20,
					parent: locationData.present,
				  shape: 'circle',
				  key: 'presentTrainStation2'
				};
		locationData.presentArmyCamp2= {
					name: 'Army Camp 2',
					center: {x: 475, y: 780},
					color: '#2196F3',
					radius: 40,
					parent: locationData.present,
				  shape: 'circle',
				  key: 'presentArmyCamp2'
				};
		locationData.presentArmyCamp2Huts= {
					name: 'Huts',
					center: {x: 475, y: 825},
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
		'presentArmyCamp1NearbyCity',
		'presentArmyCamp1',
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
	// Book 1: Chapter 1
	//
	plotPoints.push(new Point(locationData.pastOxfordCharlesRoom.center.x, locationData.pastOxfordCharlesRoom.center.y));
	plotPoints.push(new Point(locationData.pastCarFaxStation.center.x, locationData.pastCarFaxStation.center.y));
	plotPoints.push(new Point(locationData.pastBotleyRoad.center.x, locationData.pastBotleyRoad.center.y));
	plotPoints.push(new Point(locationData.pastSwindon.center.x, locationData.pastSwindon.center.y));
	plotPoints.push(new Point(locationData.pastPicturesqueSpot.center.x, locationData.pastPicturesqueSpot.center.y));
	plotPoints.push(new Point(locationData.pastOxfordCharlesRoom.center.x, locationData.pastOxfordCharlesRoom.center.y));
	plotPoints.push(new Point(locationData.pastOxfordClasses.center.x, locationData.pastOxfordClasses.center.y));
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
	plotPoints.push(new Point(854, 557));
	plotPoints.push(new Point(915, 560));
	plotPoints.push(new Point(locationData.pastOxfordAlexanders.center.x, locationData.pastOxfordAlexanders.center.y));
	plotPoints.push(new Point(locationData.pastOxfordCharlesRoom.center.x, locationData.pastOxfordCharlesRoom.center.y));
	plotPoints.push(new Point(locationData.pastOxfordTeashop.center.x, locationData.pastOxfordTeashop.center.y));
	plotPoints.push(new Point(1000, 670));
	plotPoints.push(new Point(locationData.pastOxfordSebastiansRoom.center.x, locationData.pastOxfordSebastiansRoom.center.y));
	// Book 1: Chapter 3
	// 
	plotPoints.push(new Point(1016, 353));
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
	plotPoints.push(new Point(1645, 701));
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
	plotPoints.push(new Point(1117, 719)); // point in oxford
	plotPoints.push(new Point(locationData.pastOxfordStEbbs.center.x, locationData.pastOxfordStEbbs.center.y));
	plotPoints.push(new Point(1117, 719)); // point in oxford
	plotPoints.push(new Point(locationData.pastOxfordStClements.center.x, locationData.pastOxfordStClements.center.y));
	plotPoints.push(new Point(1117, 719)); // point in oxford
	plotPoints.push(new Point(locationData.pastOxfordGardenersArms.center.x, locationData.pastOxfordGardenersArms.center.y));
	plotPoints.push(new Point(1117, 719)); // point in oxford
	plotPoints.push(new Point(locationData.pastOxfordNagsHead.center.x, locationData.pastOxfordNagsHead.center.y));
	plotPoints.push(new Point(1117, 719)); // point in oxford
	plotPoints.push(new Point(locationData.pastOxfordTurfInHellPassage.center.x, locationData.pastOxfordTurfInHellPassage.center.y));
	plotPoints.push(new Point(1087, 808)); // point in oxford
	plotPoints.push(new Point(locationData.pastBridesheadSebastiansRoom.center.x, locationData.pastBridesheadSebastiansRoom.center.y));
	plotPoints.push(new Point(1303, 610));
	plotPoints.push(new Point(locationData.pastMaMayfields.center.x, locationData.pastMaMayfields.center.y));
	plotPoints.push(new Point(locationData.pastJail.center.x, locationData.pastJail.center.y));
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
	plotPoints.push(new Point(1429, 847)); 
	plotPoints.push(new Point(locationData.pastBridesheadGardenRoom.center.x, locationData.pastBridesheadGardenRoom.center.y));
	plotPoints.push(new Point(1456, 826));
	plotPoints.push(new Point(locationData.pastBridesheadDrawingRoom.center.x, locationData.pastBridesheadDrawingRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadSebastiansRoom.center.x, locationData.pastBridesheadSebastiansRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadDiningRoom.center.x, locationData.pastBridesheadDiningRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadSebastiansRoom.center.x - 5, locationData.pastBridesheadSebastiansRoom.center.y));
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
	plotPoints.push(new Point(1425, 841));
	plotPoints.push(new Point(locationData.pastBridesheadGardenRoom.center.x, locationData.pastBridesheadGardenRoom.center.y));
	// Book 2: Chapter 1
	// 
	plotPoints.push(new Point(1463, 809));
	plotPoints.push(new Point(locationData.pastBridesheadDrawingRoom.center.x, locationData.pastBridesheadDrawingRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadSebastiansRoom.center.x, locationData.pastBridesheadSebastiansRoom.center.y));
	plotPoints.push(new Point(1434, 798));
	plotPoints.push(new Point(1488, 731));
	plotPoints.push(new Point(locationData.pastBridesheadPaintedParlour.center.x, locationData.pastBridesheadPaintedParlour.center.y));
	plotPoints.push(new Point(1488, 731));
	plotPoints.push(new Point(1434, 798));
	plotPoints.push(new Point(locationData.pastBridesheadSebastiansRoom.center.x, locationData.pastBridesheadSebastiansRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadGardenRoom.center.x, locationData.pastBridesheadGardenRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadSebastiansRoom.center.x, locationData.pastBridesheadSebastiansRoom.center.y));
	// Book 2: Chapter 2
	// 
	// At brideshead reliving the particulars of what was going on with Julia and Rex.
	// 
	// Book 2: Chapter 3
	// 
	plotPoints.push(new Point(1317, 736));
	plotPoints.push(new Point(locationData.pastLondon.center.x, locationData.pastLondon.center.y));
	plotPoints.push(new Point(locationData.pastLondonVictoria.center.x, locationData.pastLondonVictoria.center.y));
	plotPoints.push(new Point(1395, 189));
	plotPoints.push(new Point(locationData.pastLondonCafeRoyal.center.x, locationData.pastLondonCafeRoyal.center.y));
	plotPoints.push(new Point(1474, 358));
	plotPoints.push(new Point(locationData.pastMoroccoCasablanca.center.x, locationData.pastMoroccoCasablanca.center.y));
	plotPoints.push(new Point(locationData.pastMoroccoFez.center.x, locationData.pastMoroccoFez.center.y));
	plotPoints.push(new Point(locationData.pastMoroccoSebastiansHouse.center.x, locationData.pastMoroccoSebastiansHouse.center.y));
	plotPoints.push(new Point(locationData.pastMoroccoHospital.center.x, locationData.pastMoroccoHospital.center.y));
	plotPoints.push(new Point(locationData.pastMoroccoSebastiansHouse.center.x, locationData.pastMoroccoSebastiansHouse.center.y));
	plotPoints.push(new Point(locationData.pastTangier.center.x, locationData.pastTangier.center.y));
	plotPoints.push(new Point(1445, 353));
	plotPoints.push(new Point(locationData.pastLondon.center.x, locationData.pastLondon.center.y));
	plotPoints.push(new Point(1415, 461));
	plotPoints.push(new Point(1439, 684));
	
	// Book 3: Chapter 1
	// 
	plotPoints.push(new Point(locationData.pastBridesheadDrawingRoom.center.x, locationData.pastBridesheadDrawingRoom.center.y));
	plotPoints.push(new Point(1295, 837));
	plotPoints.push(new Point(1261, 614));
	plotPoints.push(new Point(1143, 527));
	plotPoints.push(new Point(980, 513));
	plotPoints.push(new Point(locationData.pastMexico.center.x, locationData.pastMexico.center.y));
	plotPoints.push(new Point(locationData.pastGuatamala.center.x, locationData.pastGuatamala.center.y));
	plotPoints.push(new Point(871, 378));
	plotPoints.push(new Point(locationData.pastNewYork.center.x, locationData.pastNewYork.center.y));
	plotPoints.push(new Point(locationData.pastNewYorkSavoyCarlton.center.x, locationData.pastNewYorkSavoyCarlton.center.y));
	plotPoints.push(new Point(1021, 264));
	plotPoints.push(new Point(locationData.pastCruiseShip.center.x, locationData.pastCruiseShip.center.y));
	plotPoints.push(new Point(locationData.pastCruiseShipHall.center.x, locationData.pastCruiseShipHall.center.y));
	plotPoints.push(new Point(locationData.pastCruiseShipCharlesCabin.center.x, locationData.pastCruiseShipCharlesCabin.center.y));
	plotPoints.push(new Point(1056, 195));
	plotPoints.push(new Point(1051, 123));
	plotPoints.push(new Point(1092, 114));
	plotPoints.push(new Point(1106, 180));
	plotPoints.push(new Point(locationData.pastCruiseShipCharlesCabin.center.x, locationData.pastCruiseShipCharlesCabin.center.y));
	plotPoints.push(new Point(1103, 156));
	plotPoints.push(new Point(locationData.pastCruiseShipJuliasCabin.center.x, locationData.pastCruiseShipJuliasCabin.center.y));
	plotPoints.push(new Point(locationData.pastCruiseShipLounge.center.x, locationData.pastCruiseShipLounge.center.y));
	plotPoints.push(new Point(locationData.pastCruiseShipSmokingRoom.center.x, locationData.pastCruiseShipSmokingRoom.center.y));
	plotPoints.push(new Point(locationData.pastCruiseShipSittingRoom.center.x, locationData.pastCruiseShipSittingRoom.center.y));
	plotPoints.push(new Point(locationData.pastCruiseShipCharlesCabin.center.x, locationData.pastCruiseShipCharlesCabin.center.y));
	plotPoints.push(new Point(locationData.pastCruiseShipLounge.center.x, locationData.pastCruiseShipLounge.center.y));
	plotPoints.push(new Point(1071, 119));
	plotPoints.push(new Point(locationData.pastCruiseShipRestaurant.center.x, locationData.pastCruiseShipRestaurant.center.y));
	// // Book 3: Chapter 2
	//
	plotPoints.push(new Point(locationData.pastArtGallery.center.x, locationData.pastArtGallery.center.y));
	plotPoints.push(new Point(locationData.pastBlueGrottoClub.center.x, locationData.pastBlueGrottoClub.center.y));
	plotPoints.push(new Point(1282, 586));
	plotPoints.push(new Point(1281, 846));
	plotPoints.push(new Point(1420, 854));
	// Book 3: Chapter 3
	// 
	plotPoints.push(new Point(1489, 725));
	plotPoints.push(new Point(locationData.pastBridesheadPaintedParlour.center.x, locationData.pastBridesheadPaintedParlour.center.y));
	plotPoints.push(new Point(1574, 788));
	plotPoints.push(new Point(locationData.pastBridesheadLibrary.center.x, locationData.pastBridesheadLibrary.center.y));
	plotPoints.push(new Point(1576, 815));
	plotPoints.push(new Point(locationData.pastBridesheadJuliasRoom.center.x, locationData.pastBridesheadJuliasRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadFountain.center.x, locationData.pastBridesheadFountain.center.y));
	plotPoints.push(new Point(1600, 775));
	plotPoints.push(new Point(locationData.pastBridesheadJuliasRoom.center.x, locationData.pastBridesheadJuliasRoom.center.y));
	plotPoints.push(new Point(1725, 828)); // Outside talking while gazing at the moon.
	// Book 3: Chapter 4
	// 
	plotPoints.push(new Point(locationData.pastBridesheadJuliasRoom.center.x, locationData.pastBridesheadJuliasRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadDrawingRoom.center.x, locationData.pastBridesheadDrawingRoom.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadNanny.center.x, locationData.pastBridesheadNanny.center.y));
	plotPoints.push(new Point(1420, 940));
	plotPoints.push(new Point(locationData.pastPark.center.x, locationData.pastPark.center.y));
	plotPoints.push(new Point(locationData.pastParkStoneBridge.center.x, locationData.pastParkStoneBridge.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadJuliasRoom.center.x, locationData.pastBridesheadJuliasRoom.center.y));
	// Book 3: Chapter 5
	//
	plotPoints.push(new Point(1700, 804));
	plotPoints.push(new Point(1691, 517));
	plotPoints.push(new Point(locationData.pastCharlesFlat.center.x, locationData.pastCharlesFlat.center.y));
	plotPoints.push(new Point(1405, 407));
	plotPoints.push(new Point(1281, 848));
	plotPoints.push(new Point(1436, 834));
	plotPoints.push(new Point(locationData.pastBridesheadCdr.center.x, locationData.pastBridesheadCdr.center.y));
	plotPoints.push(new Point(locationData.pastBridesheadJuliasRoom.center.x, locationData.pastBridesheadJuliasRoom.center.y));
	plotPoints.push(new Point(1746, 789));
	plotPoints.push(new Point(1688, 492));
	plotPoints.push(new Point(1394, 303));
	plotPoints.push(new Point(locationData.pastWarOffice.center.x, locationData.pastWarOffice.center.y));
	plotPoints.push(new Point(1465, 645));
	plotPoints.push(new Point(1484, 725));
	// Epilogue
	// 
	plotPoints.push(new Point(1451, 707));
	plotPoints.push(new Point(1306, 531));
	plotPoints.push(new Point(876, 522));
	plotPoints.push(new Point(locationData.presentArmyCamp2.center.x, locationData.presentArmyCamp2.center.y));
	plotPoints.push(new Point(locationData.presentBridesheadFountain.center.x, locationData.presentBridesheadFountain.center.y));
	plotPoints.push(new Point(locationData.presentBridesheadJuliasRoom.center.x, locationData.presentBridesheadJuliasRoom.center.y));
	plotPoints.push(new Point(locationData.presentBridesheadLadyMarchmainsRoom.center.x, locationData.presentBridesheadLadyMarchmainsRoom.center.y));
	plotPoints.push(new Point(locationData.presentBridesheadLibrary.center.x, locationData.presentBridesheadLibrary.center.y));
	plotPoints.push(new Point(locationData.presentBridesheadTapestryHall.center.x, locationData.presentBridesheadTapestryHall.center.y));
	plotPoints.push(new Point(locationData.presentBridesheadDrawingRoom.center.x, locationData.presentBridesheadDrawingRoom.center.y));
	plotPoints.push(new Point(locationData.presentBridesheadSebastiansRoom.center.x, locationData.presentBridesheadSebastiansRoom.center.y));
	plotPoints.push(new Point(140, 773));
	plotPoints.push(new Point(locationData.presentBridesheadCdr.center.x, locationData.presentBridesheadCdr.center.y));
	plotPoints.push(new Point(locationData.presentBridesheadPaintedParlour.center.x, locationData.presentBridesheadPaintedParlour.center.y));
	plotPoints.push(new Point(locationData.presentBridesheadGardenRoom.center.x, locationData.presentBridesheadGardenRoom.center.y));
	plotPoints.push(new Point(locationData.presentBridesheadDiningRoom.center.x, locationData.presentBridesheadDiningRoom.center.y));
	plotPoints.push(new Point(298, 782));
	plotPoints.push(new Point(locationData.presentBridesheadFountain.center.x, locationData.presentBridesheadFountain.center.y));
	plotPoints.push(new Point(239, 805));
	plotPoints.push(new Point(locationData.presentBridesheadNanny.center.x, locationData.presentBridesheadNanny.center.y));
	plotPoints.push(new Point(locationData.presentBridesheadChapel.center.x, locationData.presentBridesheadChapel.center.y));
	plotPoints.push(new Point(locationData.presentBridesheadChapel.center.x, locationData.presentBridesheadChapel.center.y));
	plotPoints.push(new Point(147, 782));
	plotPoints.push(new Point(100, 934));
	plotPoints.push(new Point(246, 955));
	plotPoints.push(new Point(431, 872));
	plotPoints.push(new Point(419, 806));
	plotPoints.push(new Point(locationData.presentArmyCamp2.center.x, locationData.presentArmyCamp2.center.y));
	plotPoints.push(new Point(locationData.presentArmyCamp2Huts.center.x, locationData.presentArmyCamp2Huts.center.y));
	
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

	segment1 = new Segment(new Point(400, 600), zeroZero, zeroZero);
	segment2 = new Segment(new Point(400, 601), zeroZero, zeroZero);

	bridesheadPath.add(segment1, segment2);
	bridesheadPath.position = new Point(locationData[[plotKeys[0]]].center.x, locationData[[plotKeys[0]]].center.y)
	
	project.activeLayer.addChild(charlesDot)
	
	// calculate the length of one part of the path
	length = bridesheadPath.length / amount;

	function drawCharlesPathPieces(){  	

  	var line; 

  	// Draw some unique symbol every 5th iteration
  	if(currentPosition % 2 != 0){
  		line = new Path.Line({
  		    from: [lastPosition.x, lastPosition.y],
  		    to: [charlesPosition.x, charlesPosition.y],
  		    strokeColor: (activeParentTree[0] == 'Past' ? '#FF0E00' : '#B1160E'),
			    strokeWidth: 4
  		});
  		line.sendToBack();
  	} 
  // 	else if(activeParentTree.indexOf('Train') != -1){
		// 	var line = new Path.Line({
		// 		from: [(charlesPosition.x - 5), charlesPosition.y],
		//     to: [(charlesPosition.x + 5), charlesPosition.y],
		//     strokeColor: '#B1160E',
		//     strokeWidth: 4
		// 	}).sendToBack();
		// }
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
	
	// Helpful for placing locations but not needed otherwise  
	// paper.tool.onMouseDown = function(event) {
	// 	var $mousePos = $('.mouse-pos');
	// 	if($mousePos.length == 0){
	// 		$('body').append('<div class="mouse-pos">' + event.point.x + ', ' + event.point.y + '</div>');
	// 	} else {
	// 		$mousePos.text(event.point.x + ', ' + event.point.y);
	// 	}
		
	// }
});