@extends('layouts.master')

@section('content')
	<div class="background-dimmer">
		<aside class="left-options">
			<a href="/courses">Back to Courses</a>
		</aside>
		<section class="container container-fluid">
			<div class="row">
				<form id="course-form" action={{isset($course) ? '/courses/' . $course->id : '/courses'}} method="post">
					{!! csrf_field() !!}
					<div class="col-md-8">
						<h2>
							<input class="form-control title-field" type="text" name="name" placeholder="Name" value="{{isset($course) ? $course->name : '' }}" />
						</h2>
					</div>
					<div class="col-md-8">
						<div class="form-group">
							<input type="number" name="instructor_id" class="form-control" placeholder="Instructor ID" value="{{ isset($course) ? $course->instructor_id : ''}}" />
						</div>
						<div class="form-group">
							<input type="number" name="year" class="form-control" placeholder="YYYY" value="{{ isset($course) ? $course->year : new strftime(new Date(), 'YYYY') }}"/>
						</div>
						<div class="form-group">
							<button type="submit" class="btn btn-success-inverse">Submit</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	</div>
@stop

@section('javascripts')

	<!-- jQuery -->
	<script type="text/javascript" src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/mousetrap.min.js') }}"></script>

	<script type="text/javascript">
		$(document).ready(function(e, element){

			Mousetrap.bind('ctrl+shift+s', function() {
				$form = $('#course-form');
				$.post($form.attr('action'), $form.serialize(), function(response){
					console.log(response);
				});
			});			

		});
	</script>
@stop
