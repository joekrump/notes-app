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
			height: 650px;
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
			font-weight: bold;
		}
		ol {
			padding-left: 15px;
		}
		.controls {
			position: fixed;
			bottom: 15px;
			left: 15px;
		}
		.float-left {
			pull: left;
		}
	</style>
@stop

@section('content')
	<div class="controls">
		<button class="btn btn-primary start-button float-left">Start</button>
	{{-- 	<button class="btn btn-primary up-speed float-left">+</button>
		<button class="btn btn-primary down-speed float-left">-</button> --}}
	</div>
	
	<ol id="location-list">
		<li class="most-recent-li" data-name="Present">
			<span class="li-content">Present</span>
			<ol class="children">
				<li class="most-recent-li" data-name="City"><span class="li-content" style="color: rgb(96, 125, 139);">City</span><ol class="children"></ol></li>
			</ol>
		</li>
	</ol>
  <canvas resize="true" id="paper"></canvas>
@stop

@section('javascripts')
	<script type="text/javascript" src="{{ asset('js/paper-full.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/brideshead.js') }}"></script>
@stop

