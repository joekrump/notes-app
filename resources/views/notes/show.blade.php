@extends('layouts.master')

@section('stylesheets')
	<link href="{{ asset('css/bootstrap-ckeditor.css') }}" rel="stylesheet" type="text/css">
@stop

@section('content')
	<div id="note-page" class="background-dimmer">
		<div id="action-box" class="label label-inverse" style="display:none;">
			Saving...
		</div>
	{{-- 	<aside class="left-options">
			
		</aside> --}}
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
						<select id="course_name" name="course_id" class="form-control title-field transparent">
						@foreach($courses as $course)
							<option value={{$course->id}} {{ isset($note->course) && ($note->course->id == $course->id) ? 'selected' : '' }}>{{$course->name}}</option>
						@endforeach
						</select>
						</div>
					</div>
					@endif
				</form>
				<div class="col-sm-12">

	        <textarea class="ckeditor" id="editor1" name="content" cols="100" rows="20" style="display: none;">
	        </textarea>

			    <div class="left-word-count">
			    	<small id="word-count"></small>
			    </div>
		    </div>
		    <div class="col-sm-12">
		    {{-- 	<textarea class="ckeditor" id="editor2" name="content" cols="100" rows="20" style="display: none;">
		       </textarea> --}}
		    </div>
				{{-- Put content into a hidden text area initially. --}}
				<textarea style="display:none;" id="init-content">{{ isset($note) ? $note->content : '<div class="header"><div class="pull-left"><p></p></div><div class="pull-right"><p>Joseph Krump</p></div></div><p focus=focus></p>' }}</textarea>
			</div>
		</section>
	</div>

	@include('partials.footer')

@stop

@section('javascripts')
	
	<!-- ckeditor -->
	<script type="text/javascript" src="{{ asset('js/ckeditor.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/plugins/plugins.js') }}"></script>

	<!-- jQuery -->
	<script type="text/javascript" src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/mousetrap.min.js') }}"></script>

	<script type="text/javascript">

		var courseName = '{{isset($note) ? $note['courseName'] : ''}}';

		if(courseName === '') {
			courseName = undefined;
		}

		function updateWordCount(contents){
			var initVal = contents === undefined ? $('#init-content').val() : contents;
			var spaceRegex = /\s+/gi;
			var noNBSPcontent = stripNBSP(initVal);
			var taglessString = noNBSPcontent.replace(/(<([^>]+)>)/ig, "");
			taglessString = noNBSPcontent.replace(/&quot;/ig, "");
			var wordCount = taglessString.trim().replace(spaceRegex, ' ').split(' ').length;
			
			return {
				wordCount: wordCount,
				noNBSPcontent: noNBSPcontent // content with &nbsp; instances striped.
			};
		}

		function stripNBSP(initVal){
			var noNBSPcontent = initVal.replace(/&nbsp;/gi, " ");
			return noNBSPcontent;
		}

		function scrollToText(iframe, searchTerm) {
			var $lastTerm = $(iframe.contentDocument).find("*:contains('" + searchTerm + "'):last");
			if($lastTerm.length > 0) {
				iframe.contentWindow.scrollTo(0, $lastTerm.offset().top);	
			}
		}

		$(document).ready(function(e, element){
			var isCtrl = false;
			var initVal = $('#init-content').val();
			var searchTerm = "{{ isset($search_term) ? $search_term : '' }}";
			var Note = {
				id: {{isset($note) ? $note->id : 'undefined'}}
			};
			$('.ckeditor').val(initVal);



			var editor = CKEDITOR.instances.editor1;

			$('#word-count').text(updateWordCount(initVal).wordCount);

			editor.on('loaded', function (ev) {
			  var editor = ev.editor;
			  // bind the custom events to hotkeys
			  editor.setKeystroke(CKEDITOR.CTRL + 49 /*1*/, 'heading-h1');
			  editor.setKeystroke(CKEDITOR.CTRL + 50 /*2*/, 'heading-h2');
			  editor.setKeystroke(CKEDITOR.CTRL + 51 /*3*/, 'heading-h3');
			  editor.setKeystroke(CKEDITOR.CTRL + 52 /*4*/, 'heading-h4');
			});

			editor.on('change', function( evt ) {
		    // getData() returns CKEditor's HTML content.
		    $('#word-count').text(updateWordCount(editor.getData()).wordCount);
			});

			

			editor.addContentsCss( '/css/editor-print.css' );

			// Set hotkey listener for ctrl+s in editor
			editor.on('contentDom', function( evt )
			{
				var cke_wysiwyg_frame = document.querySelector(".cke_wysiwyg_frame");

				$('#course_name').change(function(e){
					var $headerCourseName = $(cke_wysiwyg_frame.contentDocument).find('.header .pull-left p:first');
					console.log($headerCourseName)
					if($headerCourseName){
						$headerCourseName.text($(this).find('option[value='+$(this).val()+']').text());
					}
					
				});
				// if there is a search term when the page is loaded, scroll to it
				if(searchTerm !== null && searchTerm !== ''){	
					var iframe_body = cke_wysiwyg_frame.contentDocument.body;
					/*create a new RegExp object using search variable as a parameter,
					the g option is passed in so it will find more than one occurence of the
					search parameter*/                                          
					var result = new RegExp(searchTerm, 'g');

					iframe_body.innerHTML = iframe_body.innerHTML.replace(result,"<span class='search-found'>" + searchTerm + "</span>");
					scrollToText(cke_wysiwyg_frame, searchTerm);
				}

				// Register listener for Ctrl+s saving from context of the editor.
				editor.document.on('keydown', function(event){

					if(event.data.$.keyCode == 17){
						isCtrl = true;
						setTimeout(function(){
							isCtrl = false;
						}, 500);
					} 
					if(event.data.$.keyCode == 83 && isCtrl == true){
						try {
							event.data.$.preventDefault();
						} catch(err) {}
						// The preventDefault() call prevents the browser's save popup to appear.
						// The try statement fixes a weird IE error.
						ajaxSave(editor, Note, searchTerm);
						isCtrl=false;
						return false;
	        }
	      });

			}, editor.element.$);
			
			// Set hotkey listener for ctrl+s saving outside editor.
			Mousetrap.bind('ctrl+s', function(e) {
				e.preventDefault();

				ajaxSave(editor, Note, searchTerm);

			});
		});
		
		/**
		 * Issue an AJAX post request to save editor content
		 * @param  {Object} editor [description]
		 * @param  {Object} Note   [description]
		 * @return {int}        	 [description]
		 */
		function ajaxSave(editor, Note, searchTerm){
			var $form = $('#note-form');
			var data = stripNBSP(editor.getData());
			var fileName;
			var formData = $form.serializeArray();

			if(searchTerm !== null){
				$('.search-found').replaceWith(searchTerm);
      }

			formData.push({name: 'content', value: data});

			$('#action-box').removeClass('label-success').addClass('label-info').text('Saving...').fadeIn(100);
			$.post($form.attr('action'), formData, function(response){
				// update URL if there is a new slug
				if(Note.slug !== response.slug){
					var state = {};
					history.pushState(state, Note.title, "/notes/" + response.slug);
				}
				// update the action of the Note form if the Note has somehow had its id updated.	
				if(Note.id !== response.id){
					$form.attr('action', '/notes/' + response.id);
				}
				// now update Note value
				Note = response;

				// Only update the background if the course has changed.
				if(courseName !== Note.courseName.toLowerCase()){
					courseName = Note.courseName;
					fileName = Note.courseName.replace(/\s+/, '_').toLowerCase();
					$('.background').fadeOut(200, function(){
						$('.background').css({'background-image': 'url("/images/' + fileName + '.jpg")'});
					}).fadeIn(500);
				}

				$('#action-box').removeClass('label-info').addClass('label-success').fadeOut(500);
			}).error(function(response){
				console.warn('Error');
				console.warn(response);
				// update the token
				$.get('/new-token', function(newToken){
					$form.find('input[name=_token]').val(newToken);
					ajaxSave(editor, Note, searchTerm);
				});
			});

			return 0;
		}

	</script>
@stop
