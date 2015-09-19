@extends('layouts.master')

@section('stylesheets')
	<link href="{{ asset('css/bootstrap-ckeditor.css') }}" rel="stylesheet" type="text/css">
@stop

@section('content')
	<div class="background-dimmer">
		<section class="container">
		@if($notes_by_course->count())
			@foreach($notes_by_course as $course_notes)
				<h2>Course #{{$course_notes->first()->course_id}}</h2>
				@foreach($course_notes as $note)
				<div>
					<span>{{ $note->title }}</span>
					<a class="btn" href={{'notes/' . $note->id}}>Edit</a>
				</div>
				@endforeach
			@endforeach
		@endif
		</section>
	</div>
@stop