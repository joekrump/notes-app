@extends('cards.layouts.master')

@section('content')
		<header class="page-header">
			<div class="row">
				<div class="col-sm-6">
					<h1>{{ ucwords($card_type) }} Cards</h1>
				</div>
				
				<div class="col-sm-6">

					<div class="row pull-right">

						<div class="col-sm-6">
							<input id="search" class="form-control" name='search' placeholder="Search" data-url="/cards/search/" />
						</div>
						<div class="col-sm-6">
							<div class="btn-group pull-right">
								
								<a href="/cards/category/all" class="btn btn-default">All Cards</a>
				{{-- <a href="/cards/category/all" class="btn btn-primary">Show Categories</a> --}}
								<a href='/cards/new' class="btn btn-success-inverse">New Card</a>
							</div>
						</div>
					</div>
					
				</div>
			</div>
			
		</header>
		<div class="row">
			@if($cards->count())
			<div class="col-sm-4">
				<h3>{{ $cards->total() }} cards total</h3>
				<h3>{{ $blank_count }} blank cards</h3>
			</div>
			<div class="col-sm-4 text-center">
				{!! $cards->render() !!}
			</div>
			<div class="col-sm-4 toggle-actions text-right">
				<button id="latin-english-btn" type="button" class="btn btn-primary" data-showing-"latin">Latin</button>
			</div>
			<div id="pagination-content" class="col-sm-12">
				
				@foreach($cards as $card)
					<div class="card col-sm-4{{ trim($card->english) === '' || is_null($card->english) ? ' empty' : ''}}">
						<div class="row">
							<div class="latin {{ $show_latin ? '' : 'not-showing' }} col-sm-4">
								<a href={{ "/cards/" . $card->id }}>{!! $card->latin !!}</a>
							</div>
							<div class="col-sm-8">
								<div class="row">
									<div class="lesson-number col-sm-12">
									<div class="pull-right">
										{{ $card->lesson_num }}
									</div>
								</div>
								</div>
								<div class="english {{ $show_latin ? 'not-showing' : '' }} row">
									<div class="col-sm-12">
										<div class="definition">
											{{ $card->english }}
										</div>
									</div>
									<div class="col-sm-12">
										<div class="origin">
											{!! $card->origin !!}
										</div>
									</div>
								</div>
							</div>
								<div class="actions">
									<button class="btn btn-xs btn-success-inverse">&check;</button>
									<button class="btn btn-xs btn-danger btn-22">&times;</button>
								</div>
						</div>
					</div>
				@endforeach
				</div>
			@endif
		</div>
@stop

@section('javascripts')
	<script type="text/javascript">

		var showLatin = {{ $show_latin ? 'true' : 'false' }};
		var searchInProgress = false;

		$(document).ready(function(e, element){
			var $paginationList = $('.pagination');

			$paginationList.find('a').click(function(e){
				e.preventDefault();
				var $paginationBtnAnchor = $(this);
				handleLinkClick($paginationBtnAnchor);
			});

			$('#latin-english-btn').click(function(e){
				e.preventDefault();
				
				showLatin = !showLatin;

				if($(this).text() == 'Latin'){
					$(this).text('English');
				} else {
					$(this).text('Latin');
				}

				$('.latin').toggleClass('not-showing');
				$('.english').toggleClass('not-showing');
			});

			
			if(!searchInProgress){
				$('#search').change(function(e){
					var $searchInput = $(this);
					$searchInput.data('searching', true);

					issueSearchRequest($searchInput);
					$searchInput.data('searching', false);
				}).keydown(function(e){
					var $searchInput = $(this);
					var enterKey = 13;
					if((!$searchInput.data('searching')) && e.keyCode == enterKey){
						issueSearchRequest($searchInput);
					}
				});
			}
		});

		function issueSearchRequest($searchInput){
			searchInProgress = true;
			
			$.get($searchInput.data('url') + (showLatin ? 'ln/' : 'en/') + $searchInput.val(), function(response){
				searchInProgress = false;
				if(response.length > 0){
					$('#pagination-content').html(makeNewContent(response));
				} else {
					$('#pagination-content').html('<div class="alert alert-info"><p>No results found for "'+ $searchInput.val() +'".</p></div>');
				}
			});	
		}

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
			
			if(!($paginationBtnAnchor.parents('li').attr('rel') != 'next' || $paginationBtnAnchor.parents('li').attr('rel') != 'prev')){
				$paginationBtnAnchor.parents('li').addClass('active');
			}
			

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

		// Make a card div given the info contained in item.
		function makeCard(item){
			var noDefinition = item.english === null || item.english === '';
			return ['<a class="card col-sm-4',
						(noDefinition ? ' empty' : ''), '" href="/cards/', item.id, '">',
				'<div class="row">',
					'<div class="latin', (showLatin ? '' : ' not-showing'),' col-sm-4">',
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
						'<div class="english', (showLatin ? ' not-showing' : ''),' row">',
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