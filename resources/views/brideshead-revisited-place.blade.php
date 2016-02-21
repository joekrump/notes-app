@extends('layouts.paper')

@section('stylesheets')
	<style type="text/css">
		body {
			overflow: hidden;
		}
		.location-list {
			position: fixed;
			top: 0;
			left: 0;
			color: white;
		}
	</style>
@stop

@section('content')
	<ol class="location-list" id="most-inner-list">
		<li>Present</li>
	</ol>
  <canvas resize="true" id="paper"></canvas>
@stop

@section('javascripts')
	<script type="text/javascript" src="{{ asset('js/paper-full.min.js') }}"></script>
	<script type="text/javascript">
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
			var pathLocations = [];
			var pathLocationIndex;
			var latestLocationName = 'Present';
			var activeParentName 	 = 'Present';
			var locationsMetaData = [];
			var activeParentIndex = 0;
			var parentName = '';
			var listHasItems = false;

			function drawpathLocations(){
				var timeDefaults = {
					center: [250, 850],
				 	radius: 300,
				 	data: {
				 		name: 'default'
				 	}
				};

				var primarypathLocationDefaults = {
					center: [0, 0],
				 	radius: 100,
				 	data: {
				 		name: 'default'
				 	},
				 	hasParent: true
				};

				var secondarypathLocationDefaults = {
					center: [0, 0],
				 	radius: 50,
				 	data: {
				 		name: 'default'
				 	},
				 	hasParent: true
				};

				var tertiarypathLocationDefautls = {
					center: [0, 0],
				 	radius: 25,
				 	data: {
				 		name: 'default'
				 	},
				 	hasParent: true
				};

				// add present
				timeDefaults.fillColor = 'black';
				var rtop = new Point(0, 0);
				var rbot = new Point(580, $(window).height());
				var rect = new Rectangle(rtop, rbot);
				var prect = new Path.Rectangle(rect, 5);

				pathLocations.push(prect);
				locationsMetaData.push({name: 'Present'});
				numpathLocations++;
				// add past
				timeDefaults.fillColor = 'lightgrey';
				timeDefaults.center = [1400,540];
				timeDefaults.radius = 800;
				pathLocations.push(new Path.Circle(timeDefaults));
				locationsMetaData.push({name: 'Past'});
				numpathLocations++;
				
				// add Brideshead
				// 
				// Past
				primarypathLocationDefaults.fillColor = 'forestgreen';
				primarypathLocationDefaults.data.name = 'Brideshead';
				primarypathLocationDefaults.center = [1300,400];
				pathLocations.push(new Path.Circle(primarypathLocationDefaults));
				locationsMetaData.push({name: 'Brideshead', parentName: 'Past'});
				numpathLocations++;
				// Present
				primarypathLocationDefaults.center = [200,800];
				pathLocations.push(new Path.Circle(primarypathLocationDefaults));
				locationsMetaData.push({name: 'Brideshead', parentName: 'Present'});
				numpathLocations++;

				// add Oxford
				// 
				// Past
				primarypathLocationDefaults.fillColor = 'steelblue';
				primarypathLocationDefaults.center = [1700,400];
				pathLocations.push(new Path.Circle(primarypathLocationDefaults));
				locationsMetaData.push({name: 'Oxford', parentName: 'Past'});
				numpathLocations++;
				// Present
				// 
				
				insertText();
			}

			var plotPoints = [
				(new Point(400, 600)),
				(new Point(400, 500)),
				(new Point(1300,400)),
				(new Point(200,400)),
				(new Point(250, 850)),
				(new Point(1700,400)),
				(new Point(200,400)),
				(new Point(33,800)),
				(new Point(250, 850))
			];

			function insertText(){
					// text for Past circle
					var pastText = new PointText({
						point: [1500,100],
				    content: 'Past',
				    fillColor: 'black',
				    fontFamily: 'Tahoma',
				    fontWeight: 'bold',
				    fontSize: '1.5rem',
				    justification: 'center'
					});
					// text for Present circle
					var presentText = new PointText({
						point: [250, 500],
				    content: 'Present',
				    fillColor: 'white',
				    fontFamily: 'Tahoma',
				    fontWeight: 'bold',
				    fontSize: '1.5rem',
				    justification: 'center'
					});
					// text for Oxford Circle
					var oxfordText = new PointText({
						point: [1700,400],
				    content: 'Oxford',
				    fillColor: 'white',
				    fontFamily: 'Tahoma',
				    fontWeight: 'bold',
				    fontSize: '1.2rem',
				    justification: 'center'
					});	

					// Brideshead Text
					// 
					var bridesheadText = {
						point: [1300,400],
				    content: 'Brideshead',
				    fillColor: 'white',
				    fontFamily: 'Tahoma',
				    fontWeight: 'bold',
				    fontSize: '1.2rem',
				    justification: 'center'
					};
					// draw for past
					new PointText(bridesheadText);
					bridesheadText.point = [200, 800];
					// draw for present
					new PointText(bridesheadText);
			}
	
			drawpathLocations();
			// set a fade time for path segments
			// 	Once 4 new pathLocations have been hit then fade the one that occurred 4 ago.
			// 
			// create a list

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
		    		createPathCircle(carposition, 'tomato', 5).bringToFront();
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

			function insertListItem(pathLocationIndex){
				if(latestLocationName !== locationsMetaData[pathLocationIndex].name && (locationsMetaData[pathLocationIndex].name !== activeParentName)){
					if(pathLocations[pathLocationIndex].hasParent && !listHasItems){
						
						$('#most-inner-list').removeAttr('id').find('li:last').append('<ol id="most-inner-list"><li>' + locationsMetaData[pathLocationIndex].name + '</li></ol>');
						listHasItems = true;
						activeParentName = locationsMetaData[pathLocationIndex].parentName;
					} else {
						var mostInnerList = $('#most-inner-list');
						if(!pathLocations[pathLocationIndex].hasParent){
							activeParentIndex = pathLocationIndex;
							listHasItems = false;
							activeParentName= '';
							if(!mostInnerList.hasClass('location-list')){
								$('#most-inner-list').removeAttr('id').parents('ol').attr('id', 'most-inner-list');
							}
						}
						$('#most-inner-list').append('<li>' + locationsMetaData[pathLocationIndex].name + '</li>');
					}
					
					latestLocationName = locationsMetaData[pathLocationIndex].name;
				}
			}


			/**
			 * Check if the pathLocation of Charles is within a pathLocation.
			 * @param  {[type]}  charlesDot [description]
			 * @return {Boolean}            [description]
			 */
			function isInApathLocation(charlesDot){
				for(var j = 0; j < numpathLocations; j++){

					if(charlesDot.intersects(pathLocations[j])){
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
	</script>
@stop

