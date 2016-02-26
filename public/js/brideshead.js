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
	var amount = 0.3; // controls the speed at which the movement will occur
	var tool = new Tool();
	var numpathLocations = 0;
	var pathLocationsShapes = [];
	var pathLocationIndex;
	var currentLocationName = 'Present';
	var activeParentTree 	 = ['Present'];
	var locationsMetaData = [];
	var locationKeys = [
		'past',
		'pastBrideshead',
		'pastBridesheadChapel',
		'pastBridesheadCdr',
		'pastBridesheadNanny',
		'pastBridesheadServantsEntrance',
		'pastOxford',
		'pastOxfordCharlesRoom',
		'pastOxfordClasses',
		'pastOxfordSebastiansRoom',
		'pastOxfordBotanicalGardens',
		'pastGodstow',
		'pastTrout',
		'pastOxfordAlexanders',
		'pastOxfordTeashop',
		'pastCarFaxStation',
		'pastBotleyRoad',
		'pastSwindon',
		'pastRavenna',
		'present',
		'presentBrideshead',
		'presentBridesheadChapel',
		'presentBridesheadNanny',
		'presentArmyCamp1',
		'presentArmyCamp1Huts',
		'presentNearbyCity',
		'presentNearbyCityMadhouse',
		'presentTrain',
		'presentTrainCOsCarriage',
		'presentTrainStation1',
		'presentTrainStation2',
		'presentArmyCamp2',
		'presentArmyCamp2Huts',
		'presentFarmToEat'
	];
	var locationData = {};
	var plotPoints = [];

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
		
		var timeSize = {
		 	radius: 800
		};
		var primarySize = {
		 	radius: 100
		};
		var secondarySize = {
		 	radius: 50
		};
		var tertiarySize = {
		 	radius: 25
		};
		// Past locations
		// 
		locationData.past = {name: 'Past', center: {x: 1400, y:400}, color: 'lightgrey', radius: timeSize.radius, shape: 'circle', key: 'past'};
		locationData.pastBrideshead = {
					name: 'Brideshead',
					center: {x: 1300, y:300},
					radius: primarySize.radius,
					color: '#4CAF50',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastBrideshead'
				};
		locationData.pastBridesheadChapel = {
					name: 'Chapel',
					center: {x: 1425, y: 300},
					radius: secondarySize.radius,
					color: '#4CAF50',
					parent: locationData.pastBrideshead,
					shape: 'circle',
					key: 'pastBridesheadChapel'
				};
		locationData.pastBridesheadCdr = {
					name: 'Chinese Drawing Room',
					center: {x: 1300, y: 175},
					radius: secondarySize.radius,
					color: '#4CAF50',
					parent: locationData.pastBrideshead,
					shape: 'circle',
					key: 'pastBridesheadCdr'
				};
		locationData.pastBridesheadNanny = {
					name: 'Nursery',
					center: {x: 1175, y: 300},
					radius: secondarySize.radius,
					color: '#4CAF50',
					parent: locationData.pastBrideshead,
					shape: 'circle',
					key: 'pastBridesheadCdr'
				};
		locationData.pastBridesheadServantsEntrance = {
					name: 'Servants Entrance',
					center: {x: 1300, y:425},
					radius: secondarySize.radius,
					color: '#4CAF50',
					parent: locationData.pastBrideshead,
					shape: 'circle',
					key: 'pastBridesheadServantsEntrance'
				};
		locationData.pastOxford = {
					name: 'Oxford',
					center: {x: 1700,y: 600},
					radius: primarySize.radius,
					color: 'steelblue',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastOxford'
				};

		locationData.pastOxfordCharlesRoom = {
					name: 'Charles\' room',
					center: {x: 1600,y: 700},
					radius: secondarySize.radius,
					color: 'steelblue',
					parent: locationData.pastOxford,
					shape: 'circle',
					key: 'pastOxfordFirstFloorRoom'
				};
		locationData.pastOxfordClasses = {
					name: 'Classes',
					center: {x: 1575,y: 600},
					radius: secondarySize.radius,
					color: 'steelblue',
					parent: locationData.pastOxford,
					shape: 'circle',
					key: 'pastOxfordClasses'
				};
		locationData.pastOxfordSebastiansRoom = {
					name: 'Sebastian\'s Room',
					center: {x: 1700,y: 725},
					radius: secondarySize.radius,
					color: 'steelblue',
					parent: locationData.pastOxford,
					shape: 'circle',
					key: 'pastOxfordSebastiansRoom'
				};
		locationData.pastOxfordBotanicalGardens = {
					name: 'Botanical Gardens',
					center: {x: 1700,y: 425},
					radius: secondarySize.radius,
					color: 'steelblue',
					parent: locationData.pastOxford,
					shape: 'circle',
					key: 'pastOxfordBotanicalGardens'
				};
		locationData.pastGodstow = {
					name: 'Godstow',
					center: {x: 1400,y: 475},
					radius: secondarySize.radius,
					color: 'steelblue',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastGodstow'
				};
		locationData.pastTrout = {
					name: 'The Trout',
					center: {x: 1450,y: 575},
					radius: secondarySize.radius,
					color: 'steelblue',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastTrout'
				};
		locationData.pastOxfordAlexanders = {
					name: 'Alexander\'s',
					center: {x: 1600,y: 300},
					radius: secondarySize.radius,
					color: 'steelblue',
					parent: locationData.pastOxford,
					shape: 'circle',
					key: 'pastOxfordAlexanders'
				};
		locationData.pastOxfordTeashop = {
					name: 'Tea shop',
					center: {x: 1825,y: 400},
					radius: secondarySize.radius,
					color: 'steelblue',
					parent: locationData.pastOxford,
					shape: 'circle',
					key: 'pastOxfordTeashop'
				};
		locationData.pastCarFaxStation = {
					name: 'Carfax Sation',
					center: {x: 1200,y: 800},
					radius: tertiarySize.radius,
					color: '#BAB7AF',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastCarFaxStation'
				};
		locationData.pastBotleyRoad = {
					name: 'Botley Road',
					center: {x: 900, y: 600},
					radius: tertiarySize.radius,
					color: '#B4800C',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastBotleyRoad'
				};
		locationData.pastSwindon = {
					name: 'Swindon',
					center: {x: 900,y: 400},
					radius: secondarySize.radius,
					color: '#9B7113',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastSwindon'
				};
		locationData.pastRavenna = {
					name: 'Revenna',
					center: {x: 900, y: 200},
					radius: secondarySize.radius,
					color: '#DDD723',
					parent: locationData.past,
					shape: 'circle',
					key: 'pastRavenna'
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
					center: {x: 255, y: 245},
					color: '#2196F3',
					radius: tertiarySize.radius,
					parent: locationData.presentArmyCamp1,
				  shape: 'circle',
				  key: 'presentArmyCamp1Huts'
				};
		locationData.presentNearbyCity= {
					name: 'City (near Army Camp 1)',
					center: {x: 305, y: 450},
					color: '#607D8B',
					radius: 40,
					parent: locationData.present,
				  shape: 'circle',
				  key: 'presentNearbyCity'
				};
		locationData.presentNearbyCityMadhouse= {
					name: 'Mad House',
					center: {x: 305, y: 495},
					color: '#607D8B',
					radius: tertiarySize.radius,
					parent: locationData.presentNearbyCity,
				  shape: 'circle',
				  key: 'presentNearbyCityMadhouse'
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
		locationData.presentFarmToEat= {
			name: 'Farm',
			center: {x: 290, y: 350},
			color: '#673AB7',
			radius: tertiarySize.radius,
			parent: locationData.present,
		  shape: 'circle',
		  key: 'presentFarmToEat'
		};

		$(locationKeys).each(function(index, value){
			// console.log(value);
			if(locationData[value].shape === 'circle'){
				
				pathLocationsShapes.push(new Path.Circle({
					fillColor: locationData[value].color,
					center: [locationData[value].center.x, locationData[value].center.y],
					radius: [locationData[value].radius],
					shadowColor: 'rgb(10,10,10)',
					shadowBlur: 4,
					shadowOffset: new Point(2, 2)
				}));
				numpathLocations++; // rect has already been added and accounted for so just add circle count

				locationsMetaData.push({
					name: locationData[value].name,
					key: value,
					parent: (locationData[value].parent ? {
						name: locationData[value].parent.name 
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
		'presentArmyCamp1Huts',
		'presentFarmToEat',
		'presentNearbyCity',
		'presentNearbyCityMadhouse',
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

	// set charles dot and set start point to be the x,y coords of the first location according to the order in plotKeys
	// 
	charlesDot = new Path.Circle({
			center: [0, 0],
		 	radius: 10,
		 	fillColor: 'white', 
		 	position: lastPosition
	});

	$(plotKeys).each(function(index, value){
		plotPoints.push(new Point(locationData[value].center.x, locationData[value].center.y));
	});
	plotPoints.push(new Point(1080, 750)); // intermediate point so doesn't go through a location it is not supposed to
	plotPoints.push(new Point(locationData.pastOxfordCharlesRoom.center.x, locationData.pastOxfordCharlesRoom.center.y));
	plotPoints.push(new Point(1330, 675));
	plotPoints.push(new Point(locationData.pastBridesheadServantsEntrance.center.x, locationData.pastBridesheadServantsEntrance.center.y));
	plotPoints.push(new Point(locationData.pastGodstow.center.x, locationData.pastGodstow.center.y));
	plotPoints.push(new Point(locationData.pastTrout.center.x, locationData.pastTrout.center.y));
	plotPoints.push(new Point(locationData.pastOxfordCharlesRoom.center.x, locationData.pastOxfordCharlesRoom.center.y));

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
			    fontSize: locationData[value].radius == 100 ? '1.2rem' : fontSize,
			    justification: 'center'
				});
			} else {
				var y = (locationData[value].center.y - (locationData[value].name == 'Past' ? 300 : 400));
				var color =  locationData[value].name == 'Past' ? '#363636' : 'white';
				fontSize = '1.5rem';
				new PointText({
					point: [locationData[value].center.x, y],
			    content: locationData[value].name,
			    fillColor: color,
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
  	var segment3 = new Segment(lastPosition);
  	var segment4 = new Segment(charlesPosition);

  	// Draw some unique symbol every 5th iteration
  	if(currentPosition % 5 == 0){
  		
  		if(activeParentTree.indexOf('Train') != -1){
  			var line = new Path.Line({
  				from: [(charlesPosition.x - 5), charlesPosition.y],
			    to: [(charlesPosition.x + 5), charlesPosition.y],
			    strokeColor: '#F44336',
			    strokeWidth: 4
  			}).sendToBack();
  			setTimeout(function(){
  				line.scale(0.0);
  			}, 3000);
  		} else {
  			createPathCircle( charlesPosition, '#F44336', 5).sendToBack();
  			// charlesDot
  		}
  	} else {
  		railPath.add(segment3, segment4);
  	}
		lastPosition = charlesPosition;
	}

	function moveCharlesDot(){
		charlesPosition = bridesheadPath.getPointAt(currentPosition * (length ));
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

	function appendListItemToList($listToAppendTo, $listItemName){
		$('.most-recent-li').removeClass('most-recent-li');
		$listToAppendTo.append('<li class="most-recent-li" data-name="' + $listItemName + '"><span class="li-content" style="display:none;">' + $listItemName + '</span><ol class="children"></ol></li>');
		// Animate the item sliding down for 500ms
		$('.most-recent-li').find('.li-content').slideDown(500);
	}

	function insertListItem(pathLocationIndex){
		insertNewLocationContent(locationsMetaData[pathLocationIndex]);
	}

	function insertNewLocationContent(newLocation, recursive){
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
					appendListItemToList($locationList, newLocation.name);
				} else {
					return;
				}
			} else if(newLocation.parent.name == activeParentTree[0] && (activeParentTree[1] !== newLocation.name) && ($('.most-recent-li').data('name') != newLocation.name)){
				activeParentTree[1] = newLocation.name;
				appendListItemToList($locationList.find('[data-name="' + newLocation.parent.name + '"]:last').children('.children'), newLocation.name);
			}
			else if(newLocation.parent.name == currentLocationName && ($('.most-recent-li').data('name') != newLocation.name)){						
				// attach the new list item to the parent
				$parentList = $locationList.find('[data-name="' + currentLocationName + '"]:last').children('.children');
				
				appendListItemToList($parentList, newLocation.name);
			} // otherwise, insert the parent as well as the child list-item 
			else if(activeParentTree.indexOf(newLocation.parent.name) == -1){
		  	activeParentTree[1] = newLocation.parent.name;
		  	appendListItemToList($activeParentListItem.children('.children'), newLocation.parent.name);
		  	currentLocationName = newLocation.parent.name;
		  	// recursively check to see if the parent's parent exists up the current tree
		  	insertNewLocationContent(newLocation, true);
		  } else {

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
				insideLocation = true;
				return j;
			}
		}
		return false;
	}

	paper.tool.onMouseDown = function(event) {
		$('body').append('<div class="mouse-pos">x: ' + event.point.x + ',y: ' + event.point.y + '</div>');
    for(var i = 0; i < plotPoints.length; i++){
    	bridesheadPath.add(new Segment(plotPoints[i], new Point(0,0), new Point(0,0)));
    	amount = bridesheadPath.length / length;
    	length = bridesheadPath.length / amount;
    }
    paper.view.attach('frame', onFrame);
	}
});