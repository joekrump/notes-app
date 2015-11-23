@extends('layouts.index')

@section('content')
	<div id="notes" class="row">
		<div class="col-sm-12">
			<header class="page-header">
				<a href='/notes/new' class="btn btn-success-inverse pull-right">New Note</a>
				<h1>Notes</h1>
			</header>
			
			@if($notes_by_course->count())
				<div class="accordion" id="course-list">
				@foreach($notes_by_course as $course_notes)

					<div class="accordion-group">
					  <div class="accordion-heading row list-header">
					    <a class="accordion-toggle" data-toggle="collapse" data-parent="#course-list" href="#collapse{{$course_notes->first()->course_id}}">
					      <div class="col-sm-12">
					      	<h4>{{ is_null($course = \App\Course::find($course_notes->first()->course_id)) ? 'Uncategorized' : ucwords($course->name) }}</h4>
					      </div>
					    </a>
					  </div>
					  <div id="collapse{{$course->id}}" class="accordion-body collapse row">
					    {{-- <div class="accordion-inner"> --}}
					      <ul class="list list-striped list-unstyled col-sm-12">
					      	@foreach($course_notes as $note)
					      	<li class="row">
					      	@if($note->slug)
					      		<a href={{'notes/' . $note->slug}}>	
					      	@else
					      		<a href={{'notes/' . $note->id}}>	
					      	@endif
					      		
					      		<div class="col-sm-12">
					      			<div class="title pull-left">
					      				<span class="text">{{ $note->title }}</span>
					      				<div class="label label-inverse label-default">{{ $note->created_at->toFormattedDateString() }}</div>
					      			</div>
					      			<div class="pull-right">
					      				<button type="button" class="btn btn-xs btn-danger btn-delete" data-id="{{$note->id}}">x</button>
					      			</div>
					      		</div>
					      		</a>
					      	</li>
					      	@endforeach
					      </ul>
					  {{--   </div> --}}
					  </div>
					</div>
				@endforeach
				</div>
			@endif
		</div>
	</div>
@stop

@section('javascripts')

@stop