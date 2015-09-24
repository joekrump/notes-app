@extends('layouts.master')

@section('stylesheets')
	<link href="{{ asset('css/bootstrap-ckeditor.css') }}" rel="stylesheet" type="text/css">
@stop

@section('content')
	<div class="background-dimmer">
		<aside class="left-options">
			<a href="/notes">Back to Notes</a>
		</aside>
		<section class="container">
			<form action={{isset($note) ? '/notes/' . $note->id : '/notes'}} method="post">
				{!! csrf_field() !!}
				@if(isset($courses) && $courses->count())
					<select name="course_id">
					@foreach($courses as $course)
						<option value={{$course->id}}>$course->name</option>
					@endforeach
					</select>
				@endif
				<h2>
					<input class="form-control" type="text" name="title" placeholder="Title" value={{isset($note) ? $note->title : null }} />
				</h2>
		    <p>
	        <textarea class="ckeditor" id="editor1" name="content" cols="100" rows="20"></textarea>
		    </p>
			</form>
			{{-- Put content into a hidden text area initially. --}}
			<textarea style="display:none;" id="init-content">{{ isset($note) ? $note->content : '' }}</textarea>
		</section>
	</div>
@stop

@section('javascripts')
	
	<!-- ckeditor -->
	<script type="text/javascript" src="{{ asset('js/ckeditor.js') }}"></script>

	<!-- jQuery -->
	<script type="text/javascript" src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>

	<script type="text/javascript">
		$(document).ready(function(e, element){
			$('.ckeditor').val($('#init-content').val());

			// var $saveBtn = $('#cke_17');
			// console.log($saveBtn.length);
			// $saveBtn.click(function(e){
			// 	e.preventDefault();
			// 	console.log('trying to save');
			// });
			// $saveBtn.removeAttr('onclick');

		});

	</script>
@stop
