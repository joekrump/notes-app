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
	        <textarea class="ckeditor" id="editor1" name="latin" cols="100" rows="4"></textarea>
		    </p>
		    <div class="row">
		    	<div class="col-sm-6">
				    <p>
				    	<input type="text" class="form-control" name="english" placeholder="English Translation" value="{{ (isset($card) && !is_null($card)) ? $card->english : null }}" />
				    </p>
				    <p>
				    	<textarea class="form-control" name="origin" rows="10" placeholder="Origin the Word">{{ (isset($card) && !is_null($card)) ? $card->origin : null }}</textarea>
				    </p>
				    <p>
				    	<input class="form-control" type="number" name="lesson_num" placeholder="Lesson Number" value={{isset($card) ? $card->lesson_num : NULL }} />
				    </p>
				    @yield('extras')
			    </div>
		    </div>
			</form>
			{{-- Put content into a hidden text area initially. --}}
			<textarea style="display:none;" id="init-content">{{ isset($card) ? $card->latin : '<ul><li></li></ul>' }}</textarea>
			@if(isset($card))
				<button class="btn btn-danger btn-delete" data-url="{{ '/cards/' . $card->id }}">Delete</button>
			@endif
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

			$('.btn-delete').click(function(e){
				e.preventDefault();
				$.ajax({
				  url: $(this).data('url'),
				  method: 'DELETE',
				  data: {_token: $('meta[name="_token"]').attr('content')},
				  complete: function(response){
				    if(response.status === 200){
				      // do something on success
				      window.location="/cards/category/all";
				    }
				  }
				});
			})
		});

	</script>
@stop
