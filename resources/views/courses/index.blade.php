@extends('layouts.index')

@section('content')
	<div class="row">
		<div class="col-sm-12">
			<header class="page-header">
				<a href='/courses/new' class="btn btn-success-inverse pull-right">New Course</a>
				<h1>Courses</h1>
			</header>
		</div>
	</div>
	<div class="row">
		<ul class="list list-striped list-unstyled">
		@if($courses->count())
			@foreach($courses as $course)
				<li class="col-sm-12">
					<div class="title">
						<a class="btn btn-secondary" href={{'courses/' . $course->id}}><h4>{{ $course->name }}</h4></a>
					</div>
				</li>
			@endforeach
		</ul>
		@else 
			<div class="col-sm-12">
				No courses yet... <a href='/courses/new' class="btn btn-success-inverse pull-right">Add a New Course</a>
			</div>
		@endif
	</div>
@stop