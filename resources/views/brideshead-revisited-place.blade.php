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
		<li data-name="Present">Present</li>
	</ol>
  <canvas resize="true" id="paper"></canvas>
@stop

@section('javascripts')
	<script type="text/javascript" src="{{ asset('js/paper-full.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/brideshead.js') }}"></script>
@stop

