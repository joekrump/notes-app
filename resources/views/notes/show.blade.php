@extends('layouts.master')

@section('stylesheets')
	<link href="{{ asset('css/bootstrap-ckeditor.css') }}" rel="stylesheet" type="text/css">
@stop

@section('content')
	<div class="background-dimmer">
		<section class="container">
{{-- 			<div class="main" contenteditable="true">
				<article class="page">
					<p>Placeholder</p>
				</article>
			</div>
			<aside class="right-aside" contenteditable="true">
				<h4>Sidenote</h4>
				<p>
					sidenote content
				</p>
			</aside>
			<aside class="left-options">
				<h1>Header</h1>
				<h2>Header</h2>
				<h2>Header</h2>
				<h2>Header</h2>
				<h2>Header</h2>
				<span class="hlt1">Highlight</span>
				<span class="hlt2">Highlight</span>
				<em>Italics</em>
				<strong>Bold</strong>
				--}}
				{{-- <button id="submit-button" class="btn btn-save btn-primary" onclick="(){console.log('test')}">Save</button> --}}
			{{-- </aside>  --}}
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
		        <textarea class="ckeditor" id="editor1" name="content" cols="100" rows="20">
		        	@if(isset($note))
		        		{{ $note->content }}
		        	@endif
		        </textarea>
		    </p>
			</form>
		</section>
	</div>
@stop

@section('javascripts')
	
	<!-- ckeditor -->
	<script type="text/javascript" src="{{ asset('js/ckeditor.js') }}"></script>

	<!-- jQuery -->
	<script type="text/javascript" src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>

@stop
