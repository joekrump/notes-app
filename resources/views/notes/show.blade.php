@extends('layouts.master')

@section('stylesheets')
	<link href="{{ asset('css/bootstrap-ckeditor.css') }}" rel="stylesheet" type="text/css">
@stop

@section('content')
	<div class="background-dimmer">
		<div id="action-box" class="label label-inverse" style="display:none;">
			Saving...
		</div>
		<aside class="left-options">
			<a href="/notes" class="inverse-link">To Notes</a>
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
			    <div class="pull-left">
			    	<small id="word-count"></small>
			    </div>
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
			// Load 
			var initVal = $('#init-content').val();
			var isCtrl = false;
			var spaceRegex = /\s+/gi;
			var stripNBSPS = initVal.replace(/&nbsp;/gi,'');
			var taglessString = stripNBSPS.replace(/(<([^>]+)>)/ig, "");
			taglessString = stripNBSPS.replace(/&quot;/ig, "");
			var wordCount = taglessString.trim().replace(spaceRegex, ' ').split(' ').length;
			$('.ckeditor').val(stripNBSPS);
			$('#word-count').text(wordCount);

			// Add event listener for ctrl+s in editor to do an AJAX save.
			var editor = CKEDITOR.instances.editor1;
			editor.on('loaded', function (ev) {
			  var editor = ev.editor;
			  // add custom commands
			  addCustomEditorCommands(editor);
			  // bind the custom events to hotkeys
			  editor.setKeystroke(CKEDITOR.CTRL + 49 /*1*/, 'heading-h1');
			  editor.setKeystroke(CKEDITOR.CTRL + 50 /*2*/, 'heading-h2');
			  editor.setKeystroke(CKEDITOR.CTRL + 51 /*3*/, 'heading-h3');
			  editor.setKeystroke(CKEDITOR.CTRL + 52 /*4*/, 'heading-h4');
			});

			// Set hotkey listner for ctrl+s in editor
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
			
			// Set hotkey listener for ctrl+s saving outside editor.
			Mousetrap.bind('ctrl+s', function(e) {
				e.preventDefault();
				ajaxSave(editor);
			});
		});

		function addCustomEditorCommands(editor){
			editor.addCommand('heading-h1', {
				exec: function (editor) {
					CKEDITOR.tools.callFunction(201,'h1');
				}
			});
			editor.addCommand('heading-h2', {
				exec: function (editor) {
					CKEDITOR.tools.callFunction(201,'h2');
				}
			});
			editor.addCommand('heading-h3', {
				exec: function (editor) {
					CKEDITOR.tools.callFunction(201,'h3');            
				}
			}); 
			editor.addCommand('heading-h4', {
				exec: function (editor) {
					CKEDITOR.tools.callFunction(201,'h4'); 
				}
			}); 
		}

		function ajaxSave(editor){
			var $form = $('#note-form');
			var noteId = {{isset($note) ? $note->id : 'undefined'}};
			var data = editor.getData().replace(/&nbsp;/ig, "");
			var spaceRegex = /\s+/gi;
			var taglessString = data.replace(/(<([^>]+)>)/ig, "");
			taglessString = taglessString.replace(/&quot;/ig, "");
			var wordCount = taglessString.trim().replace(spaceRegex, ' ').split(' ').length;
			$('#word-count').text(wordCount);

			var formData = $form.serializeArray();
			formData.push({name: 'content', value: data});

			$('#action-box').removeClass('label-success').addClass('label-info').text('Saving...').fadeIn(100);
			$.post($form.attr('action'), formData, function(response){
				// console.log(response);
				if(response.id !== noteId){
					noteId = response.id;
					$form.attr('action', '/notes/' + noteId)
				}
				$('#action-box').removeClass('label-info').addClass('label-success').fadeOut(500);
			}).error(function(response){
				// console.log(response)
				alert(response);
			});
		}
	</script>
@stop
