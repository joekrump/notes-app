@extends('cards.layouts.master')

@section('content')
		<header class="page-header">
			<div class="row">
				<div class="col-sm-6">
					<h1>Cards List</h1>
				</div>
				
				<div class="col-sm-6">

					<div class="row pull-right">

						<div class="col-sm-6">
							<input id="search" class="form-control" name='search' placeholder="Search" data-url="/cards/search/" />
						</div>
						<div class="col-sm-6">
							<div class="btn-group pull-right">
								<a href='/cards/new' class="btn btn-success">New Card</a>
							</div>
						</div>
					</div>
					
				</div>
			</div>
			
		</header>
		<div class="row">
			@if($cards->count())
			<div class="col-sm-4">
				<h3>You currently have {{ $cards->count() }} cards</h3>
			</div>
			<div  class="col-sm-12">
				@if($cards->count())
				<ul class="list list-unstyled">
				
					@foreach($cards as $card)
						<li class="col-sm-12">
							<div class="row">
								<div class="col-sm-3">
									{!! $card->latin !!}
								</div>
								<div class="col-sm-3">{{ $card->english }}</div>
								</div>
						</li>
					@endforeach
				</ul>
				@endif
			</div>
			@endif
		</div>
@stop

@section('javascripts')
	<script type="text/javascript">

		$(document).ready(function(e, element){
			var $paginationList = $('.pagination');
			$paginationList.find('a').click(function(e){
				e.preventDefault();
				var $paginationBtnAnchor = $(this);
				handleLinkClick($paginationBtnAnchor);
			});

			var searchInProgress = false;
			if(!searchInProgress){
				$('#search').change(function(e){
					searchInProgress = true;
					var $searchInput = $(this);
					
					$.get($searchInput.data('url') + $searchInput.val(), function(response){
						searchInProgress = false;
						if(response.length > 0){
							$('#pagination-content').html(makeNewContent(response));
						} else {
							$('#pagination-content').html('<div class="alert alert-info"><p>No results found for "'+ $searchInput.val() +'".</p></div>');
						}
						
					});	
				});
			}
		});

		function handleLinkClick($link){
			$.get($link.attr('href'), function(response){

				updatePaginationLinks($link, response);

				$('#pagination-content').html(makeNewContent(response.data));
			});
		}

		function updatePaginationLinks($paginationBtnAnchor, response){
			var $paginationList = $paginationBtnAnchor.parents('.pagination');
			var $activePaginationLink = $paginationList.find('li.active');
			var $paginationListItems = $paginationList.find('li');
			var $previousBtn = $paginationListItems.first();
			var $nextBtn = $paginationListItems.last();
			var baseUrl = response.next_page_url === null ? response.prev_page_url : response.next_page_url;
			baseUrl = baseUrl.substring(0, baseUrl.length - 1);

			var currentPage = response.current_page;

			$paginationListItems.each(function(index, element){
				var $span = $(element).find('span');
				var $pageNum = $span.text();

				if($span.length > 0 && parseInt($pageNum)){
					var $newLink = $('<a href="'+ baseUrl + $pageNum + '">' + $pageNum +'</a>');
					$newLink.click(function(e){
						e.preventDefault();
						handleLinkClick($(this));
					});

					$span.replaceWith($newLink);
				}
			});

			$activePaginationLink.removeClass('active');
			$paginationBtnAnchor.parents('li').addClass('active');

			if(currentPage == response.last_page) {
				$nextBtn.addClass('disabled');
			} else if($nextBtn.hasClass('disabled')) {
				$nextBtn.removeClass('disabled');
			}

			if(currentPage == 1) {
				$previousBtn.addClass('disabled');
			} else if($previousBtn.hasClass('disabled')) {
				$previousBtn.removeClass('disabled');
			}

			var $newNextLink = $('<a href="'+ response.next_page_url+ '" rel="next">»</a>');
			$newNextLink.click(function(e){
				e.preventDefault();
				handleLinkClick($(this));
			});

			var $newPrevLink = $('<a href="'+ response.prev_page_url+ '" rel="previous">«</a>');
			$newPrevLink.click(function(e){
				e.preventDefault();
				handleLinkClick($(this));
			});

			$nextBtn.children().replaceWith($newNextLink);
			$previousBtn.children().replaceWith($newPrevLink);
		}

		/**
		 * Makes the html content that is to be inserted into the page.
		 * @param  {Object} response The json response
		 * @return {String}          A string container HTML which is to be inserted.
		 */
		function makeNewContent(data){
			var $cardDiv;
			var newContent = '';
			$.each(data, function(index, item){

				$cardDiv = makeCard(item);

				newContent += $cardDiv;
			});

			return newContent;
		}

		function makeCard(item){
			return ['<a class="card col-sm-4" href="/cards/', item.id, '">',
				'<div class="row">',
					'<div class="latin col-sm-4">',
						item.latin,
					'</div>',
					'<div class="col-sm-8">',
						'<div class="row">',
							'<div class="lesson-number col-sm-12">',
								'<div class="pull-right">',
									item.lesson_num,
								'</div>',
							'</div>',
						'</div>',
						'<div class="english row">',
							'<div class="col-sm-12">',
								'<div class="definition">',
									item.english,
								'</div>',
							'</div>',
							'<div class="col-sm-12">',
								'<div class="origin">',
									item.origin,
								'</div>',
							'</div>',
						'</div>',
					'</div>',
				'</div>',
			'</a>'].join('');
		}
	</script>
@stop