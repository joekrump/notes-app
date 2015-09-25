@extends('layouts.index')

@section('content')
	<header class="page-header">
		<a href='/courses/new' class="btn btn-success pull-right">New Course</a>
		<h1>Courses</h1>
	</header>
	<div class="row">
		<ul class="list list-striped list-unstyled">
		@if($courses->count())
			@foreach($courses as $course)
				<li class="col-sm-12">
					<div class="title">
						<a class="btn btn-secondary" href={{'courses/' . $course->id}}>{{ $course->name }}</a>
					</div>
				</li>
			@endforeach
		</ul>
		@else 
			<div class="col-sm-12">No courses yet.</div>
		@endif
	</div>
@stop