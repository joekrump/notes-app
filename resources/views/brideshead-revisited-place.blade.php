@extends('layouts.paper')

@section('stylesheets')
	<style type="text/css">
		body {
			overflow: hidden;
		}
	</style>
@stop

@section('content')
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
			var amount = 0.2; // controls the speed at which the movement will occur
			var tool = new Tool();

			function drawLocations(){
				var timeDefaults = {
					center: [400, 400],
				 	radius: 400
				};

				var primaryLocationDefaults = {
					center: [0, 0],
				 	radius: 100
				};

				var secondaryLocationDefaults = {
					center: [0, 0],
				 	radius: 50
				};

				var tertiaryLocationDefautls = {
					center: [0, 0],
				 	radius: 25
				};

				// add present
				timeDefaults.fillColor = 'lightgreen';
				new Path.Circle(timeDefaults);
				// add past
				timeDefaults.fillColor = 'lightgrey';
				timeDefaults.center = [1500,400];
				new Path.Circle(timeDefaults);
				
				// add Brideshead
				// 
				// Past
				primaryLocationDefaults.fillColor = 'forestgreen';
				primaryLocationDefaults.center = [1300,400];
				new Path.Circle(primaryLocationDefaults);
				// Present
				primaryLocationDefaults.center = [200,400];
				new Path.Circle(primaryLocationDefaults);

				// add Oxford
				// 
				// Past
				primaryLocationDefaults.fillColor = 'steelblue';
				primaryLocationDefaults.center = [1700,400];
				new Path.Circle(primaryLocationDefaults);
				// Present
				// 
				insertText();
			}

			function insertText(){
					// text for Past location circle
					var pastText = new PointText({
						point: [1500,100],
				    content: 'Past',
				    fillColor: 'black',
				    fontFamily: 'Tahoma',
				    fontWeight: 'bold',
				    fontSize: '1.5rem',
				    justification: 'center'
					});
					// text for Present location circle
					var presentText = new PointText({
						point: [400, 100],
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
	
			drawLocations();
			
			segment1 = new Segment(new Point(400, 600), zeroZero, zeroZero);
			segment2 = new Segment(new Point(400, 601), zeroZero, zeroZero);

			bridesheadPath.add(segment1, segment2);
			bridesheadPath.strokeColor ='rgba(0,0,0,0.0)';
			bridesheadPath.strokeWidth = 4;
			bridesheadPath.closed = false;
			bridesheadPath.fullySelected = false;
			bridesheadPath.position = new Point(400, 600);
			
			project.activeLayer.addChild(charlesDot)
			
			//calculate the length of one part of the path
			length = bridesheadPath.length / amount;

			// animate the circle, moving from position to position along the bridesheadPath

			function onFrame(event){
		    if((currentPosition * length) < bridesheadPath.length){
		    	carposition = bridesheadPath.getPointAt(currentPosition * length);
		    	charlesDot.position = carposition;
		    	++currentPosition; // Move charles Dot ahead by one position
		    	if(currentPosition % 5 == 0){
		    		// Drop a 'tomato' coloured circle every fifth position change
		    		createPathCircle(carposition);
		    		charlesDot.bringToFront();
		    	}
		    } else {
		    	// Keep charlesDot at its current position
		    	charlesDot.position = lastPosition;
		    }
			}

			function createPathCircle(carposition){
    		var pathCircle = new Path.Circle(carposition, 5);
    		pathCircle.fillColor = 'tomato';
    		pathCircle.shadowColor = new Color(0, 0, 0);
		    pathCircle.shadowBlur = 4;
		    pathCircle.shadowOffset = new Point(1, 1);
		    return pathCircle;
			}
			
		  // var previousLength;
			paper.tool.onMouseDown = function(event) {
        x = event.event.offsetX;
        y = event.event.offsetY;
        lastPosition = new Point(x, y);
        bridesheadPath.add(new Segment(lastPosition, new Point(0,0), new Point(0,0)));

        amount = bridesheadPath.length / length;
        // previousLength = length;
        length = bridesheadPath.length / amount;

        paper.view.attach('frame', onFrame);
			}
		});
	</script>
@stop

