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

			//DRAW A RACING TRACK
			var bridesheadPath = new Path();

			bridesheadPath.strokeColor ='rgba(255,255,255,0.1)';
			bridesheadPath.strokeWidth = 4;

			var handleInTop = new Point(-90, 0);
			var handleOutTop = new Point(90, 0);
			var handleInSide = new Point(0, -90);
			var handleOutSide = new Point(0, 90);
			var lastPosition;
			var dots = new Path();

			Segment1 = new Segment(new Point(230, 100), handleOutTop, handleInTop);
			Segment2 = new Segment(new Point(100, 275), handleInSide, handleOutSide);
			Segment3 = new Segment(new Point(230, 450), handleInTop, handleOutTop);
			Segment4 = new Segment(new Point(435, 450), handleInTop, handleOutTop);
			Segment5 = new Segment(new Point(765, 100), handleInTop, handleOutTop);
			Segment6 = new Segment(new Point(970, 100), handleInTop, handleOutTop);
			Segment7 = new Segment(new Point(1100, 275), handleInSide, handleOutSide);
			Segment8 = new Segment(new Point(970, 450), handleOutTop, handleInTop);
			Segment9 = new Segment(new Point(765, 450), handleOutTop, handleInTop);
			Segment10 = new Segment(new Point(435, 100), handleOutTop, handleInTop);

			bridesheadPath.add(Segment1, Segment2, Segment3, Segment4, Segment5, Segment6, Segment7, Segment8, Segment9, Segment10);
			bridesheadPath.closed = false;

			bridesheadPath.fullySelected=false;
			bridesheadPath.position = view.center;

			// charlesDot
			var charlesDot = new Path.Circle(new Point(10, 10), 10);
			charlesDot.fillColor = 'white';	

			var handleInRightCar = new Point(0, 13)
			var handleOutRightCar = new Point(0, -13)

			FirstCorner = new Point(100, 100);
			SecondCorner = new Point(100, 100);
			ThirdCorner = new Point(140, 496);
			FourthCorner = new Segment(new Point(145, 483), handleInRightCar, handleOutRightCar);
			FifthCorner = new Point(140, 470);

			// charlesDot.add(FirstCorner, SecondCorner, ThirdCorner, FourthCorner, FifthCorner);
			// charlesDot.closed = true;

			// Put Charles at the starting point
			var offset = 0;
			var startposition = bridesheadPath.getPointAt(offset);
			charlesDot.position = startposition;


			// set the number of parts the path is divided into
			var amount = 600;
			
			//calculate the length of one part of the path
			var length = bridesheadPath.length / amount;

			// animate the circle, moving from position to position along the bridesheadPath
			var carposition = new Point();
			var currentPosition = 0;
			var cloneCircle;

			function onFrame(event){
		    if((currentPosition * length) < bridesheadPath.length){
		    	carposition = bridesheadPath.getPointAt(currentPosition * length);
		    	charlesDot.position = carposition;
		    	++currentPosition;
		    	if(currentPosition % 5 == 0){
		    		cloneCircle = new Path.Circle(carposition, 5);
		    		cloneCircle.fillColor = 'tomato';	
		    		dots.add(cloneCircle);
		    	}
		    	
		    } else {
		  
		    	// console.log((currentPosition * length));
		    	// console.log(bridesheadPath.length);
		    	charlesDot.position = lastPosition;
		    }
			}
			var tool = new Tool();
		    
			paper.tool.onMouseDown = function(event) {
        x = event.event.offsetX;
        y = event.event.offsetY;
        lastPosition = new Point(x, y);
        bridesheadPath.add(new Segment(lastPosition, new Point(0,0), new Point(0,0)));
        amount = bridesheadPath.length / length;
        length = bridesheadPath.length / amount;
        paper.view.attach('frame', onFrame);
			}



		});
	</script>
@stop

