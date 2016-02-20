@extends('layouts.paper')

@section('stylesheets')
	<style type="text/css">
		body {
			overflow: hidden;
		}
		#location-list {
			position: fixed;
			top: 0;
			left: 0;
			color: white;
		}
	</style>
@stop

@section('content')
	<ol id="location-list">

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
			var amount = 0.25; // controls the speed at which the movement will occur
			var tool = new Tool();
			var numpathLocations = 0;
			var pathLocations = [];
			var listpathLocation;

			function drawpathLocations(){
				var timeDefaults = {
					center: [250, 850],
				 	radius: 200,
				 	data: {
				 		name: 'test'
				 	}
				};

				var primarypathLocationDefaults = {
					center: [0, 0],
				 	radius: 100
				};

				var secondarypathLocationDefaults = {
					center: [0, 0],
				 	radius: 50
				};

				var tertiarypathLocationDefautls = {
					center: [0, 0],
				 	radius: 25
				};

				// add present
				timeDefaults.fillColor = 'lightgreen';
				pathLocations.push(new Path.Circle(timeDefaults));
				numpathLocations++;
				// add past
				timeDefaults.fillColor = 'lightgrey';
				timeDefaults.center = [1400,540];
				timeDefaults.radius = 800;
				pathLocations.push(new Path.Circle(timeDefaults));
				numpathLocations++;
				
				// add Brideshead
				// 
				// Past
				primarypathLocationDefaults.fillColor = 'forestgreen';
				primarypathLocationDefaults.center = [1300,400];

				pathLocations.push(new Path.Circle(primarypathLocationDefaults));
				numpathLocations++;
				// Present
				primarypathLocationDefaults.center = [200,400];
				pathLocations.push(new Path.Circle(primarypathLocationDefaults));
				numpathLocations++;

				// add Oxford
				// 
				// Past
				primarypathLocationDefaults.fillColor = 'steelblue';
				primarypathLocationDefaults.center = [1700,400];
				pathLocations.push(new Path.Circle(primarypathLocationDefaults));
				numpathLocations++;
				// Present
				// 
				

				insertText();
			}

			var plotPoints = [
				(new Point(400, 600)),
				(new Point(400, 500)),
				(new Point(1000, 500)),
				(new Point(700, 600)),
				(new Point(1400, 1000)),
				(new Point(700, 600)),
				(new Point(700, 200)),
				(new Point(1400,540)),
				(new Point(200, 500))
			];

			function insertText(){
					// text for Past pathLocation circle
					var pastText = new PointText({
						point: [1500,100],
				    content: 'Past',
				    fillColor: 'black',
				    fontFamily: 'Tahoma',
				    fontWeight: 'bold',
				    fontSize: '1.5rem',
				    justification: 'center'
					});
					// text for Present pathLocation circle
					var presentText = new PointText({
						point: [250, 750],
				    content: 'Present',
				    fillColor: 'black',
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
					bridesheadText.point = [200, 400];
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
		    	carposition = bridesheadPath.getPointAt(currentPosition * length);
		    	charlesDot.position = carposition;
		    	++currentPosition; // Move charles Dot ahead by one position
		    	if(currentPosition % 5 == 0){
		    		// Drop a 'tomato' coloured circle every fifth position change
		    		createPathCircle(carposition, 'tomato', 5);
		    		charlesDot.bringToFront();
		    	} else {
		    		createPathCircle(carposition, 'red', 3);
		    	}
		    	if((listpathLocation = isInApathLocation(charlesDot)) !== false){
		    		insertListItem(listpathLocation);
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
    		
		    return pathCircle;
			}

			function insertListItem(pathLocation){
				$('#location-list').append('<li>' + pathLocation.data.name+ '</li>');

			}


			/**
			 * Check if the pathLocation of Charles is within a pathLocation.
			 * @param  {[type]}  charlesDot [description]
			 * @return {Boolean}            [description]
			 */
			function isInApathLocation(charlesDot){
				for(var j = 0; j < numpathLocations; j++){
					if(charlesDot.intersects(pathLocations[j])){
						return pathLocations[j];
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

