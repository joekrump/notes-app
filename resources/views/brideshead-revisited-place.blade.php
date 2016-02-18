@extends('layouts.paper')


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
			var points = 2;
			var length = 20;
			var tool = new Tool();
			var myPath = createWorm('#b71c1c');
			
			function createWorm(color) {
				console.log('creating worm');
				var path = new paper.Path({
					strokeColor: color,
					strokeWidth: 20,
					strokeCap: 'round'
				});
				
				var start = new paper.Point(Math.random()*100,Math.random()*100);
				for(var i = 0; i < points; i++) {
					path.add(new paper.Point(i * length + start.x, 0 + start.y));
				}
				
				return path;
			}
		    
		    var x;
		    var y;
			function moveSeg(event) {
		        event.count = 1;
				if(event.count <= 100) {
				myPath.firstSegment.point._x += (x - myPath.firstSegment.point._x)/10;
		        myPath.firstSegment.point._y += (y - myPath.firstSegment.point._y)/10;
		            for (var i = 0; i < points - 1; i++) {
		                var segment = myPath.segments[i];
		                var nextSegment = segment.next;
		                var vector = new paper.Point(segment.point.x - nextSegment.point.x,segment.point.y - nextSegment.point.y);
		                vector.length = length;
		                nextSegment.point = new paper.Point(segment.point.x - vector.x,segment.point.y - vector.y);
		            }
		            myPath.smooth();
		        }
		    }
		    
			paper.tool.onMouseDown = function(event) {
				console.log('fired');
		        x = event.event.offsetX;
		        y = event.event.offsetY;
		        paper.view.attach('frame', moveSeg);
			}

		});
	</script>
@stop

