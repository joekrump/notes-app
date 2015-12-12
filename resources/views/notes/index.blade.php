@extends('layouts.index')

@section('content')
	<div id="notes" class="row">
		<div class="col-sm-12">
			<header class="page-header">
				<a href='/notes/new' class="btn btn-success-inverse pull-right">New Note</a>
				<h1>Notes</h1>
			</header>
			
			@if($courses->count())
				<div class="accordion" id="course-list">
				@foreach($courses as $course)
					@if($note_count = $course->notes()->count())
					<div class="accordion-group" id="{{ $course->name }}" data-note-count={{$note_count}}>
					  <div class="accordion-heading row list-header">
					    <a class="accordion-toggle" data-toggle="collapse" data-parent="#course-list" href="#collapse{{$course->id}}">
					      <div class="col-sm-12">
						      	<div class="title">
						      		<h4>{{ ucwords($course->name) }}</h4>
						      	</div>
						      	<div class="label label-inverse label-default">{{ $note_count }}</div>
					      </div>
					    </a>
					  </div>
					  <div id="collapse{{$course->id}}" class="accordion-body collapse row">
					      <ul class="list list-striped list-unstyled col-sm-12">
					      	@foreach($course->notes()->orderBy('created_at', 'DESC')->get() as $note)
					      	<li class="row" data-id="{{$note->id}}">
					      	@if($note->slug)
					      		<a href={{'notes/' . $note->slug}}>	
					      	@else
					      		<a href={{'notes/' . $note->id}}>	
					      	@endif
					      		
					      		<div class="col-sm-12">
					      			<div class="title">
					      				<span class="text">{{ $note->title }}</span>
					      			</div>
					      			<div class="label label-inverse label-default">{{ $note->created_at->toFormattedDateString() }}</div>
					      			<div class="pull-right">
					      				@if($note->status != 0)
					      					<button type="button" class="btn btn-xs btn-success-inverse" data-id="{{$note->id}}" data-action-status=1>set active</button>
					      				@endif
					      				@if($note->status != 1)
					      					<button type="button" class="btn btn-xs btn-primary" data-id="{{$note->id}}" data-action-status=1>archive</button>
					      				@endif
					      				@if($note->status != 2)
					      					<button type="button" class="btn btn-xs btn-secondary" data-id="{{$note->id}}" data-action-status=1>backup</button>
					      				@endif
					      				
					      				<button type="button" class="btn btn-xs btn-danger btn-delete" data-id="{{$note->id}}">&times;</button>
					      			</div>
					      		</div>
					      		</a>
					      	</li>
					      	@endforeach
					      </ul>
					  </div>
					</div>
					@endif
				@endforeach
				</div>
			@endif
		</div>
	</div>
@stop

@section('javascripts')

@stop