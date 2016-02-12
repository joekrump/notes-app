@extends('layouts.master')

@section('stylesheets')
	<link rel="stylesheet" href="{{ asset('css/farbtastic.css') }}" rel="stylesheet" type="text/css">
@stop
@section('content')
	<div class="background-dimmer">
		<section id="course-page" class="container container-fluid">
			<div class="row">
				<div class="col-sm-12">
					<form id="course-form" action={{isset($course) ? '/courses/' . $course->id : '/courses'}} method="post">
						{!! csrf_field() !!}
						<div class="row">
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
									<div id="colorpicker" class="pull-left"></div>

									<div class="col-md-4">
										<input type="text" id="colour" class="form-control" name="colour" value="{{ isset($course) ? $course->colour : '#123456' }}" placeholder="#123456" />
									</div>
								</div>
							</div>
							<div class="col-sm-12">
								<div class="form-group">
									<button type="submit" class="btn btn-success">Submit</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	</div>
@stop

@section('javascripts')

	<!-- jQuery -->
	<script type="text/javascript" src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/mousetrap.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/farbtastic.js') }}"></script>
	<script type="text/javascript">
		$(document).ready(function(e, element){
			$('#colorpicker').farbtastic('#colour');

			Mousetrap.bind('ctrl+shift+s', function() {
				$form = $('#course-form');
				$.post($form.attr('action'), $form.serialize(), function(response){
					window.location = '/courses';
				});
			});			
		});
	</script>
@stop
