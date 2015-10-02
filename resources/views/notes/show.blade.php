@extends('layouts.master')

@section('stylesheets')
	<link href="{{ asset('css/bootstrap-ckeditor.css') }}" rel="stylesheet" type="text/css">
@stop

@section('content')
	<div class="background-dimmer">
		<aside class="left-options">
			<a href="/notes">Back to Notes</a>
		</aside>
		<section class="container container-fluid">
			<div class="row">
				<form id="note-form" action="{{ isset($note) ? '/notes/' . $note->id : '/notes'}}" method="post">
					{!! csrf_field() !!}
					<div class="col-sm-8">
							<input class="form-control title-field transparent" type="text" name="title" placeholder="Title" value="{{isset($note) ? $note->title : null }}" />
					</div>
				
					@if(isset($courses) && $courses->count())
					<div class="col-sm-4">
						<div class="form-group">
						<select name="course_id" class="form-control title-field transparent">
						@foreach($courses as $course)
							<option value={{$course->id}} {{ isset($note_course) && ($note_course->id == $course->id) ? 'selected' : '' }}>{{$course->name}}</option>
						@endforeach
						</select>
						</div>
					</div>
					@endif
					<div class="col-sm-12">
				    <p>
			        <textarea class="ckeditor" id="editor1" name="content" cols="100" rows="20"></textarea>
				    </p>
			    </div>
				</form>
				{{-- Put content into a hidden text area initially. --}}
				<textarea style="display:none;" id="init-content">{{ isset($note) ? $note->content : '' }}</textarea>
			</div>
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
				CKEDITOR.tools.callFunction(7,this);
				$formData = $('#note-form').serialize();
			});			

		});

		// $('iframe').ready(function(e, element){

		// 	$(this).ready(function(e, element){
		// 		Mousetrap.bind('ctrl+s', function() { 
		// 			CKEDITOR.tools.callFunction(7,this);
		// 			$formData = $('#note-form').serialize();
		// 		});
		// 		Mousetrap.bind('ctrl+shift+1', function() { 
		// 			console.log('h1');
		// 			CKEDITOR.tools.callFunction(201,'h1'); 
		// 		});
		// 		Mousetrap.bind('ctrl+shift+2', function() { 
		// 			CKEDITOR.tools.callFunction(201,'h2'); 
		// 		});
		// 	});

		// });


	</script>
@stop
