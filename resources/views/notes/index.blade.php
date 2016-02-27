@extends('layouts.index')

@section('title')
<title>Notes</title>
@stop

@section('content')
	<div id="notes" class="row" data-filter-status={{ $status }}>
		<div class="col-sm-12">
			<header class="page-header">
				@if($status == 2)
					<a href="/notes" class="btn btn-primary pull-right">Active</a>
				@else
					<a href="/notes/status/backup" class="btn btn-primary pull-right">Backups</a>
				@endif
				<form id="note-search" class="pull-right col-sm-10" action="/notes/search/" method="GET">
					<button type="submit" class="btn btn-secondary pull-right">Search</button>
					<div class="col-sm-3 pull-right">
						<input id="search-field" type="search" class="form-control" name="term" placeholder="Search" />
					</div>
				</form>
				<h1>Notes</h1>
			</header>
			<div class="row">
				<div class="col-sm-12 search-container">
					
					<div class="search-results-container">
						<div class="row">
							<div class="col-sm-12 results-header" style="display: none;">
								<h2>Search Results:</h2>
							</div>
							<div class="col-sm-6 no-results" style="display: none;">

							</div>
							<div class="list list-striped list-unstyled col-sm-12 results-container">
								<div class="results row">

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			@if($courses->count())
				<div class="accordion" id="course-list">
				@foreach($courses as $course)

					@if(($notes = $course->notes()->where('status', $status)) && ($note_count = $notes->count()))
					<div class="accordion-group" id="{{ $course->name }}" data-note-count={{ $note_count }}>
					  <div class="accordion-heading row list-header" {{is_null($course->colour) ?: 'style=border-color:'.$course->colour }}>
					    <a class="accordion-toggle" data-toggle="collapse" data-parent="#course-list" href="#collapse{{$course->id}}">
					      <div class="col-sm-12">
						      	<div class="title">
						      		<h4>{{ ucwords($course->name) }}</h4>
						      	</div>
						      	<div class="label label-inverse label-default note-count-label" {{is_null($course->colour) ?: 'style=border-color:'.$course->colour }}>{{ $note_count }}</div>
					      </div>
					    </a>
					  </div>
					  <div id="collapse{{$course->id}}" class="accordion-body collapse row">
			      	@foreach($notes->orderBy('created_at', 'DESC')->get() as $note)
			      	<div class="card col-sm-2" data-id="{{ $note->id }}" data-course-name="{{ $note->course->name }}" {{is_null($course->colour) ?: 'style=border-color:'.$course->colour.'' }}>
			      		<a href={{'/notes/' . ($note->slug ? $note->slug : $note->id) }}>	
				      		<div class="row">
				      			<div class="title col-sm-12">
				      				<span class="text">{{ $note->title }}</span>
				      			</div>
				      			<div class="col-sm-12">
				      				<div class="label label-inverse label-default">{{ $note->created_at->toFormattedDateString() }}</div>
				      			</div>
				      			<div class="pull-right index-actions">
				      				@if($note->status != 0)
				      					<button type="button" class="btn btn-sm btn-success" data-id="{{$note->id}}" data-action-status=0>Set Active</button>
				      				@endif
				      				@if($note->status != 1)
				      					<button type="button" class="btn btn-sm btn-primary" data-id="{{$note->id}}" data-action-status=1>A</button>
				      				@endif
				      				@if($note->status != 2)
				      					<button type="button" class="btn btn-sm btn-secondary" data-id="{{$note->id}}" data-action-status=2>B</button>
				      				@endif
				      				<button type="button" class="btn btn-sm btn-danger btn-delete" data-id="{{$note->id}}">&times;</button>
				      			</div>
				      		</div>
			      		</a>
			      	</div>
			      	@endforeach
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
<script>
	function makeListItem(note, searchValue){
		var createdAt = new Date(note.created_at);

  	var li = ['<div class="col-sm-2 card" data-id="',note.id,'" data-course-name="', note.name,'" style="border-top:3px solid ', note.colour,'">',
  		'<a href="/notes/',(note.slug ? note.slug : note.id),'?s=',searchValue,'">',
    		'<div class="row">',
    			'<div class="title col-sm-12">',
    				'<span class="text">',note.title,'</span>',
    			'</div>',
    			'<div class="col-sm-12">',
    			'<div class="label label-inverse label-default">',createdAt.toDateString(),'</div>',
    			'</div>',
    			'<div class="pull-right index-actions">'];
    				if(note.status != 0){
    					li.push('<button type="button" class="btn btn-sm btn-success" data-id="{{$note->id}}" data-action-status=0>Set Active</button>');
    				}
    				if(note.status != 1){
    					li.push('<button type="button" class="btn btn-sm btn-primary" data-id="{{$note->id}}" data-action-status=1>A</button>');
    				}
    				if(note.status != 2){
    					li.push('<button type="button" class="btn btn-sm btn-secondary" data-id="{{$note->id}}" data-action-status=2>B</button>');
    				}
    				li.push('<button type="button" class="btn btn-sm btn-danger btn-delete" data-id="',note.id,'">&times;</button>');
    			li.push('</div>');
    		li.push('</div>');
  		li.push('</a>');
  	li.push('</div>');
  	return li.join('');
	}
  $(document).ready(function(e, element){
  	var $accordionBody;
  	var maxHeightPx;
  	$(window).on('resize', function(){
  		$('.accordion-body').each(function(){
  			$accordionBody = $(this);
  			maxHeightPx = $accordionBody.css('max-height').split('px')[0];
  			if($accordionBody.height() < maxHeightPx){
  				$accordionBody.css({'overflow-y' : 'hidden', 'margin-right' : '-15px'})
  			}
  		});
  	}).resize();
  	
  	$('#note-search').submit(function(e){
  		e.preventDefault();
  		var searchValue = $('#search-field').val();
  		$.get('/notes/search/' + searchValue, function(response){
  			if(response.length == 0){
  				$('.results-header').hide();
  				$('.no-results').html('<div>No results matching "' + searchValue + '"</div>').fadeIn();
  				$('.results-container').slideUp();
  				$('#course-list').fadeIn(300);

  				return 1;
  			} else {
  				$('#course-list').fadeOut(300);
  				$('.no-results').fadeOut();
  				$('.results-header').fadeIn(500);
  				// response = response.sort(function(a, b){
  				// 	return a.course.name > b.course.name;
  				// });
  				var $results = '';
  				$(response).each(function($index, $note){
  					$results += makeListItem($note, searchValue);
  				});

  				$('.results').html($results);
  				$('.results-container').slideDown();
  			}
  			
  		});
  		return false;
  	});

    $('.btn-delete').click(function(e){
      e.preventDefault();
      var $itemRow = $('.row [data-id="' + $(this).data('id') + '"]');
      // Hide row by positive assertion.
      $itemRow.slideUp(300);
      var accordionHeader = $('#'+ $itemRow.data('course-name'));
      console.log(accordionHeader);
      var courseNoteCount = accordionHeader.data('note-count');
      console.log(courseNoteCount);

      if(--courseNoteCount == 0){
      	accordionHeader.slideUp(300, function(){
      		$(this).remove();
      	});
      } else {
      	accordionHeader.data('note-count', courseNoteCount);
      	accordionHeader.find('.note-count-label').text(courseNoteCount);
      }

      $.ajax({
        url: '/{{$resource_type}}s/' + $(this).data('id'),
        method: 'DELETE',
        data: {_token: $('meta[name="_token"]').attr('content')},
        complete: function(response){
          if(response.status === 200){
            // Remove DOM element
            $itemRow.remove();
            
          } else {
            // If the deletion fails then show the row again.
            $itemRow.slideDown(300);
          }
        }
      });
    });
  });
</script>
@stop