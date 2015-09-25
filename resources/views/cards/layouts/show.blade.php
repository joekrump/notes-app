@extends('cards.layouts.master')

@section('stylesheets')
	<link href="{{ asset('css/bootstrap-ckeditor.css') }}" rel="stylesheet" type="text/css">
@stop

@section('content')
	<div id="cards" class="background-dimmer">
		<aside class="left-options">
			<div class="btn-group">
				<a href={{"/cards/category" . (isset($card) ? ('/' . $card->type) : '/default') }} class="btn btn-default">Back to Cards</a>
				<a href='/cards/new' class="btn btn-success pull-right">New Card</a>
			</div>
		</aside>
		<section class="container">
			<form id="card-form" class="form" action={{isset($card) ? '/cards/' . $card->id : '/cards'}} method="post">
				{!! csrf_field() !!}
		    <p>
	        <textarea class="ckeditor" id="editor1" name="latin" cols="100" rows="5"></textarea>
		    </p>
		    <p>
		    	<textarea class="form-control" name="english" placeholder="English Translation">{{ (isset($card) && !is_null($card)) ? $card->english : null }}</textarea>
		    </p>
		    <p>
		    	<textarea class="form-control" name="origin" placeholder="Origin the Word">{{ (isset($card) && !is_null($card)) ? $card->origin : null }}</textarea>
		    </p>
		    <p>
		    	<input class="form-control" type="number" name="lesson_num" placeholder="Lesson Number" value={{isset($card) ? $card->lesson_num : NULL }} />
		    </p>
		    @yield('extras')
			</form>
			{{-- Put content into a hidden text area initially. --}}
			<textarea style="display:none;" id="init-content">{{ isset($card) ? $card->latin : '<ul><li></li></ul>' }}</textarea>
		</section>
	</div>
@stop

@section('javascripts')
	
	<!-- ckeditor -->
	<script type="text/javascript" src="{{ asset('js/ckeditor.js') }}"></script>

	<!-- jQuery -->
	<script type="text/javascript" src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/mousetrap.min.js') }}"></script>

	<script type="text/javascript">
		$(document).ready(function(e, element){
			$('.ckeditor').val($('#init-content').val());

			Mousetrap.bind('ctrl+s', function() { 
				CKEDITOR.tools.callFunction(7,this);return false;
				$formData = $('#card-form').serialize();
			});
		});

	</script>
@stop
