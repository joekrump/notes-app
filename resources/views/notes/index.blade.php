@extends('layouts.index')

@section('content')
	<div class="background-dimmer">
		<section class="container">
			<header class="page-header">
				<h1>Notes</h1>
			</header>
			<a href='/notes/new' class="btn btn-primary">New Note</a>
			@if($notes_by_course->count())
				@foreach($notes_by_course as $course_notes)
					<h2>Course #{{$course_notes->first()->course_id}}</h2>
					@foreach($course_notes as $note)
					<div class="row">
						<span class="title">{{ $note->title }}</span>
						<div class="actions">
							<a class="btn btn-secondary" href={{'notes/' . $note->id}}>Edit</a>
						</div>
					</div>
					@endforeach
				@endforeach
			@endif
		</section>
	</div>
@stop