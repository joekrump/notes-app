paper.install(window);
$(function() {
	if(!('getContext' in document.createElement('canvas'))){
		alert('Sorry, it looks like your browser does not support canvas!');
		return false;
	}
    
	paper.setup($('canvas')[0]);

	// The path that will be followed
	var bridesheadPath = new Path();
	var zeroZero = new Point(0, 0);
	var lastPosition;
	var dots = new Path();
	// charlesDot (The dot that will be moving along bridesheadPath)
	var charlesStartPosition = new Point(400, 600);
	var charlesDot = new Path.Circle({
			center: [0, 0],
		 	radius: 10,
		 	fillColor: 'white', 
		 	position: charlesStartPosition
	});
	var offset = 0;
	// Put Charles at the starting point
	var carposition = new Point();
	var currentPosition = 0;
	var cloneCircle;
	var length;	
	var amount = 0.1; // controls the speed at which the movement will occur
	var tool = new Tool();
	var numpathLocations = 0;
	var pathLocationsShapes = [];
	var pathLocationIndex;
	var currentLocationName = 'Present';
	var activeParentTree 	 = ['Present'];
	var parentTreeMaxIndex = 0;
	var locationsMetaData = [];
	var locationKeys = [
		'past',
		'pastBrideshead',
		'pastBridesheadChapel',
		'pastBridesheadCdr',
		'pastOxford',
		'present',
		'presentBrideshead',
		'presentBridesheadChapel'
	];
	var locationData = {};

	function drawpathLocations(){

		var rtop = new Point(0, 0);
		var rbot = new Point(580, $(window).height());
		var rect = new Rectangle(rtop, rbot);

		var pRect = new Path.Rectangle(rect, 5);
		pRect.strokeColor = 'blue';
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
		locationData.past = {name: 'Past', center: {x: 1400, y:400}, color: 'slategrey', radius: timeSize.radius, childKeys: ['pastBrideshead', 'pastOxford'], shape: 'circle'};
		locationData.pastBrideshead = {
					name: 'Brideshead',
					center: {x: 1300, y:400},
					radius: primarySize.radius,
					color: 'forestgreen',
					parent: locationData.past,
					childKeys: ['pastBridesheadChapel', 'pastBridesheadCdr'],
					shape: 'circle'
				};
		locationData.pastBridesheadChapel = {
					name: 'Chapel',
					center: {x: 1300, y:525},
					radius: secondarySize.radius,
					color: 'forestgreen',
					parent: locationData.pastBrideshead,
					shape: 'circle'
				};
		locationData.pastBridesheadCdr = {
					name: 'Chinese Drawing Room',
					center: {x: 1300, y: 275},
					radius: secondarySize.radius,
					color: 'forestgreen',
					parent: locationData.pastBrideshead,
					shape: 'circle'
				};
		locationData.pastOxford = {
					name: 'Oxford',
					center: {x: 1700,y: 400},
					radius: primarySize.radius,
					color: 'steelblue',
					parent: locationData.past,
					shape: 'circle'
				};

		// Present Locations
		// 
		locationData.present = {name: 'Present', childKeys: ['presentBrideshead'], shape: 'rect', radius: 800, center: {x: 250, y: 500}};
		locationData.presentBrideshead = {
					name: 'Brideshead',
					center: {x: 250, y: 800},
					color: 'forestgreen',
					radius: primarySize.radius,
					parent: locationData.present,
					childKeys: ['presentBridesheadChapel'],
				  shape: 'circle'
				};
		locationData.presentBridesheadChapel = {
					name: 'Chapel',
					center: {x: 250, y: 925},
					radius: secondarySize.radius,
					color: 'forestgreen',
					parent: locationData.presentBrideshead,
					shape: 'circle'
				};

		$(locationKeys).each(function(index, value){
			if(locationData[value].shape === 'circle'){
				pathLocationsShapes.push(new Path.Circle({
					fillColor: locationData[value].color,
					center: [locationData[value].center.x, locationData[value].center.y],
					radius: [locationData[value].radius]
				}));
				numpathLocations++; // rect has already been added and accounted for so just add circle count

				locationsMetaData.push({
					name: locationData[value].name,
					key: value,
					parentName: locationData[value].parent ? locationData[value].parent.name : undefined
				});
			}
		});
		// console.log(locationsMetaData);
		// console.log(numpathLocations);
		insertText();
		// console.log(locationsMetaData);
		// console.log(locationData);
	}

	var plotPoints = [
		(new Point(400, 600)),
		// (new Point(400, 500)),
		// (new Point(1300,400)),
		(new Point(200,400)),
		(new Point(250, 850)),
		(new Point(1700,400)),
		(new Point(200,400)),
		(new Point(33,800)),
		(new Point(250, 850))
	];

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
				var y = (locationData[value].center.y - 300);
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

	drawpathLocations();

	// Once 4 new pathLocations have been hit then fade the one that occurred 4 ago.

	segment1 = new Segment(new Point(400, 600), zeroZero, zeroZero);
	segment2 = new Segment(new Point(400, 601), zeroZero, zeroZero);

	bridesheadPath.add(segment1, segment2);
	bridesheadPath.strokeColor = 'rgba(0,0,0,0)';
	bridesheadPath.strokeWidth = 4;
	bridesheadPath.closed = false;
	bridesheadPath.fullySelected = false;
	bridesheadPath.position = new Point(400, 600);
	
	project.activeLayer.addChild(charlesDot)
	
	// calculate the length of one part of the path
	length = bridesheadPath.length / amount;

	// animate the circle, moving from position to position along the bridesheadPath

	function onFrame(event){
    if((currentPosition * length) < bridesheadPath.length){
    	carposition = bridesheadPath.getPointAt(currentPosition * (length ));
    	charlesDot.position = carposition;
    	++currentPosition; // Move charles Dot ahead by one position
    	if(currentPosition % 5 == 0){
    		// Drop a 'tomato' coloured circle every fifth position change
    		createPathCircle(carposition, 'red', 5).bringToFront();
    		charlesDot.bringToFront();
    	} else {
    		createPathCircle(carposition, 'red', 3);
    	}
    	if((pathLocationIndex = isInApathLocation(charlesDot)) !== false){
    		insertListItem(pathLocationIndex);
    	}
    } else {
    	// Keep charlesDot at its current position
    	charlesDot.position = lastPosition;
    }
	}

	function createPathCircle(carposition, color, size){
		var pathCircle = new Path.Circle(carposition, size);
		pathCircle.fillColor = color;
		if(size === 5){
			pathCircle.shadowColor = new Color(0, 0, 0);
    	pathCircle.shadowBlur = 4;
    	pathCircle.shadowOffset = new Point(1, 1);
		}
		// Fade out the circle by scaling after 5 seconds.
		setTimeout(function(){
			pathCircle.scale(0.0);
		}, 5000);
    return pathCircle;
	}

	function insertNewInnerList(parentName){
		$('#location-list').append('<ol data-name="' + parentName + '"><li id="last-li" class="active"><span class="li-content" style="display:none;">' + parentName + '</span></li></ol>');
		$('.active').find('.li-content').slideDown(500);
	}

	/**
	 * Resets the array containing the names of the parent elements in the active list tree
	 * @param  {string} parentLocation - the name of the parent to be placed at index 0 of the array
	 * @return {underfined}
	 */
	function resetParentTree(parentLocation){
		activeParentTree = [parentLocation];
		parentTreeMaxIndex = 0;
	}

	function insertListItem(pathLocationIndex){
	
		// This is a root location such as Past, or Present
		if(locationsMetaData[pathLocationIndex].parentName === undefined){
			
			var $locationList = $('#location-list');
			var lastElementContent = $locationList.children('li:last').children('.li-content').text();
			
			// if this isn't a repeat element then append a list item to the root of the list
			// 
			if(lastElementContent != locationsMetaData[pathLocationIndex].name){
				resetParentTree(locationsMetaData[pathLocationIndex].name);
				$('.active').removeClass('active');
				$locationList.append('<li class="active" data-name="' + locationsMetaData[pathLocationIndex].name + '"><span class="li-content" style="display:none;">' + locationsMetaData[pathLocationIndex].name + '</span></li>');
				$('.active').find('.li-content').slideDown(500);
			} else {
				console.log('else')
				console.log('undefined parent for: ' + locationsMetaData[pathLocationIndex].name)
			}
			currentLocationName = locationsMetaData[pathLocationIndex].name;
			
		} else if(currentLocationName != locationsMetaData[pathLocationIndex].name){
			// console.log('Tree:');
			// console.log(activeParentTree);
			var indexOfParent = activeParentTree.indexOf(locationsMetaData[pathLocationIndex].parentName);
			// if the lowest parent is the same as the new location being inserted.
			if(indexOfParent != -1){

			} 
		} else {
			console.log('else')
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
				return j;
			}
		}
		return false;
	}

	/**
	 * If a pathLocation has a parent return true, else false
	 * @param  {[type]} pathLocation [description]
	 * @return {[type]}          [description]
	 */
	function pathLocationHasParent(pathLocation){

	}

	paper.tool.onMouseDown = function(event) {
    // x = event.event.offsetX;
    // y = event.event.offsetY;
    // lastPosition = new Point(x, y);
    for(var i = 0; i < plotPoints.length; i++){
    	bridesheadPath.add(new Segment(plotPoints[i], new Point(0,0), new Point(0,0)));
    	amount = bridesheadPath.length / length;
    	length = bridesheadPath.length / amount;
    }
    

    paper.view.attach('frame', onFrame);
	}
});