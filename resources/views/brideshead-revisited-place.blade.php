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
	/*	.active {
			color: green;
		}*/
	</style>
@stop

@section('content')
	<ol id="location-list">
		<li class="active" data-name="Present">
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

