@extends('layouts.index')

@section('content')
	<div class="row">
		<div class="col-sm-12">
			<header class="page-header">
				<a href='/courses/new' class="btn btn-success pull-right">New Course</a>
				<h1>Courses</h1>
			</header>

			@if($courses->count())
				@foreach($courses as $course)
					<div class="row list-header" {{is_null($course->colour) ?: 'style=border-color:'.$course->colour.'' }}>
						<a href={{'courses/' . $course->id}}>
							<div class="col-sm-12">
								<div class="title">
									<h4>{{ $course->name }}</h4>
								</div>
							</div>
						</a>
					</div>
				@endforeach
			@else
				<div class="row">
					<div class="col-sm-12">
						No courses yet... <a href='/courses/new' class="btn btn-success pull-right">Add a New Course</a>
					</div>
				</div>
			@endif
		</div>
	</div>
@stop