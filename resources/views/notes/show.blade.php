@extends('layouts.master')

@section('stylesheets')
	<link href="{{ asset('css/bootstrap-ckeditor.css') }}" rel="stylesheet" type="text/css">
@stop

@section('content')
	<div class="background-dimmer">
		<div id="action-box" class="alert" style="display:none;">
			Saving...
		</div>
		<aside class="left-options">
			<a href="/notes">Back to Notes</a>
		</aside>
		<section class="container container-fluid">
			<div class="row">
				<form id="note-form" action="{{ isset($note) ? '/notes/' . $note->id : '/notes'}}" method="post">
					{!! csrf_field() !!}
					<div class="col-sm-8">
							<input class="form-control title-field transparent" type="text" name="title" placeholder="Title" value="{{isset($note) ? $note->title : null }}" />
					</div>
				
					@if(isset($courses) && $courses->count())
					<div class="col-sm-4">
						<div class="form-group">
						<select name="course_id" class="form-control title-field transparent">
						@foreach($courses as $course)
							<option value={{$course->id}} {{ isset($note_course) && ($note_course->id == $course->id) ? 'selected' : '' }}>{{$course->name}}</option>
						@endforeach
						</select>
						</div>
					</div>
					@endif
				</form>
				<div class="col-sm-12">
			    <p>
		        <textarea class="ckeditor" id="editor1" name="content" cols="100" rows="20"></textarea>
			    </p>
		    </div>
				{{-- Put content into a hidden text area initially. --}}
				<textarea style="display:none;" id="init-content">{{ isset($note) ? $note->content : '' }}</textarea>
			</div>
		</section>
	</div>
@stop

@section('javascripts')
	
	<!-- ckeditor -->
	<script type="text/javascript" src="{{ asset('js/ckeditor.js') }}"></script>

	<!-- jQuery -->
	<script type="text/javascript" src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/mousetrap.min.js') }}"></script>

	<script type="text/javascript">
		$(document).ready(function(e, element){
			$('.ckeditor').val($('#init-content').val());

			// Add event listener for ctrl+s in editor to do an AJAX save.
			var editor = CKEDITOR.instances.editor1;

			editor.on( 'contentDom', function( evt )
			{
				editor.document.on( 'keyup', function(event){
					if(event.data.$.keyCode == 17) isCtrl=false;
				});

				editor.document.on( 'keydown', function(event){
					if(event.data.$.keyCode == 17) isCtrl = true;
					if(event.data.$.keyCode == 83 && isCtrl == true){
						// The preventDefault() call prevents the browser's save popup to appear.
						// The try statement fixes a weird IE error.
						try {
							event.data.$.preventDefault();
						} catch(err) {}

						ajaxSave(editor);
						return false;
	        }
	      });
			}, editor.element.$);
	
			Mousetrap.bind('ctrl+s', function(e) {
				e.preventDefault();

				ajaxSave(editor);
			});
		});

		function ajaxSave(editor){
			var $form = $('#note-form');
			var data = editor.getData();
			var formData = $form.serializeArray();
			formData.push({name: 'content', value: data});

			$('#action-box').removeClass('alert-success').addClass('alert-info').text('Saving...').fadeIn(100);
			$.post($form.attr('action'), formData, function(response){
				console.log(response);
				$('#action-box').removeClass('alert-info').addClass('alert-success').fadeOut(500);
			});
		}
	</script>
@stop
