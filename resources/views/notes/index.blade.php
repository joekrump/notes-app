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
				<h1>Notes</h1>
			</header>
			<div class="row">
				<div class="col-sm-12">
					<form id="note-search" action="/notes/search/" method="GET">
						<button type="submit" class="btn btn-secondary pull-right">Search</button>
						<div class="col-sm-3 pull-right">
							<input id="search-field" type="search" class="form-control" name="term"/>
						</div>
					</form>
					<div class="search-results">
					</div>
				</div>
			</div>
			@if($courses->count())
				<div class="accordion" id="course-list">
				@foreach($courses as $course)

					@if(($notes = $course->notes()->where('status', $status)) && ($note_count = $notes->count()))
					<div class="accordion-group" id="{{ $course->name }}" data-note-count={{ $note_count }}>
					  <div class="accordion-heading row list-header" {{is_null($course->colour) ?: 'style=border-color:'.$course->colour.'' }}>
					    <a class="accordion-toggle" data-toggle="collapse" data-parent="#course-list" href="#collapse{{$course->id}}">
					      <div class="col-sm-12">
						      	<div class="title">
						      		<h4>{{ ucwords($course->name) }}</h4>
						      	</div>
						      	<div class="label label-inverse label-default" {{is_null($course->colour) ?: 'style=border-color:'.$course->colour }}>{{ $note_count }}</div>
					      </div>
					    </a>
					  </div>
					  <div id="collapse{{$course->id}}" class="accordion-body collapse row">
					      <ul class="list list-striped list-unstyled col-sm-12">
					      	@foreach($notes->orderBy('created_at', 'DESC')->get() as $note)
					      	<li class="row" data-id="{{$note->id}}" {{is_null($course->colour) ?: 'style=border-color:'.$course->colour }}>
					      	@if($note->slug)
					      		<a href={{'/notes/' . $note->slug}}>	
					      	@else
					      		<a href={{'/notes/' . $note->id}}>
					      	@endif
					      		
					      		<div class="col-sm-12">
					      			<div class="title">
					      				<span class="text">{{ $note->title }}</span>
					      			</div>
					      			<div class="label label-inverse label-default">{{ $note->created_at->toFormattedDateString() }}</div>
					      			<div class="pull-right index-actions">
					      				@if($note->status != 0)
					      					<button type="button" class="btn btn-xs btn-success" data-id="{{$note->id}}" data-action-status=1>set active</button>
					      				@endif
					      				@if($note->status != 1)
					      					<button type="button" class="btn btn-xs btn-primary" data-id="{{$note->id}}" data-action-status=1>A</button>
					      				@endif
					      				@if($note->status != 2)
					      					<button type="button" class="btn btn-xs btn-secondary" data-id="{{$note->id}}" data-action-status=1>B</button>
					      				@endif
					      				
					      				<button type="button" class="btn btn-xs btn-danger btn-delete" data-id="{{$note->id}}">&times;</button>
					      			</div>
					      		</div>
					      		</a>
					      	</li>
					      	@endforeach
					      </ul>
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
  $(document).ready(function(e, element){

  	$('#note-search').submit(function(e){
  		e.preventDefault();
  		$.get('/notes/search/' + $('#search-field').val(), function(response){
  			response = response.sort(function(a, b){
  				return a.course.name > b.course.name;
  			});
  			var $results = '<ul class="list-unstyled">';
  			$(response).each(function($index, $note){
  				$results += '<li><a href="/notes/'+ $note.slug +'">' + $note.course.name + ': ' + $note.title + '</a></li>';
  			});
  			$results += '</ul>';
  			$('.search-results').html($results);
  		});
  		return false;
  	});

    $('.btn-delete').click(function(e){
      e.preventDefault();
      var $itemRow = $('.row [data-id="' + $(this).data('id') + '"]');
      // Hide row by positive assertion.
      $itemRow.slideUp(300);

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