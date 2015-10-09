@extends('layouts.index')

@section('content')
	<div class="row">
		<div class="col-sm-12">
			<header class="page-header">
				<a href='/notes/new' class="btn btn-success pull-right">New Note</a>
				<h1>Notes</h1>
			</header>
		
			@if($notes_by_course->count())
				@foreach($notes_by_course as $course_notes)

					<h2>{{ is_null($course = \App\Course::find($course_notes->first()->course_id)) ? 'Uncategorized' : ucwords($course->name) }}</h2>
					<ul class="list list-striped list-unstyled">
						@foreach($course_notes as $note)
						<li class="row">
							<div class="col-sm-12">
								<div class="title pull-left">
									<a class="btn btn-secondary" href={{'notes/' . $note->id}}>{{ $note->title }}</a>
									<div class="label label-inverse label-default">{{ $note->created_at->toFormattedDateString() }}</div>
								</div>
								<div class="pull-right">
									<button type="button" class="btn btn-sm btn-danger btn-delete" data-id="{{$note->id}}">x</button>
								</div>
							</div>
						</li>
						@endforeach
					</ul>
				@endforeach
			@endif
		</div>
	</div>
@stop
