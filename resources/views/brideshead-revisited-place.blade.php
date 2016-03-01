@extends('layouts.paper')

@section('stylesheets')
	<style type="text/css">
		body {
			overflow: hidden;
		}
		.mouse-pos {
			position: fixed;
			top: 15px;
			right: 15px;
			background:black;
			color: white;
			height: 40px;
		}
		#location-list {
			position: fixed;
			top: 10px;
			left: 10px;
			color: white;
			height: 800px;
			overflow-y: scroll;
		}
		/* Let's get this party started */
		 ::-webkit-scrollbar {
		    width: 8px;
		    display: none;
		    background-color: black; }
		  
		  /* Track */
		 ::-webkit-scrollbar-track {
		    background-color: black; }
		  
		  /* Handle */
		 ::-webkit-scrollbar-thumb {
		    background: #bdbdbd; }
		  
		 ::-webkit-scrollbar-thumb:window-inactive {
		    background-color: black; }
		ol {
			color: white;
		}
		li {
			transition: all 300;
			color: white;
		}
		ol {
			padding-left: 15px;
		}
		.start-button {
			position: fixed;
			bottom: 15px;
			left: 15px;
		}
	</style>
@stop

@section('content')
	<button class="btn btn-primary start-button">Start</button>
	<ol id="location-list">
		<li class="most-recent-li" data-name="Present">
			<span class="li-content">Present</span>
			<ol class="children">
			</ol>
		</li>
	</ol>
  <canvas resize="true" id="paper"></canvas>
@stop

@section('javascripts')
	<script type="text/javascript" src="{{ asset('js/paper-full.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/brideshead.js') }}"></script>
@stop

