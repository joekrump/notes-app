@extends('../../layouts.master')

@section('top_nav')
	@include('../../partials.top_nav')
@stop

@section('content')
	<div id="card-page" class="container container-fluid">
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
				<h3>{{ $cards->total() }} cards total</h3>
				<h3>{{ $blank_count }} blank cards</h3>
			</div>
			<div class="col-sm-4 text-center">
				{!! $cards->render() !!}
			</div>
			<div class="col-sm-4 toggle-actions text-right">
				<button id="latin-english-btn" type="button" class="btn btn-primary" data-showing-"latin">Latin</button>
			</div>
			<div class="col-sm-12">
				<nav class="nav">
					<ul class="nav-tabs">
						<li>
							<button id="complete-filter-btn" type="button" class="btn btn-success">Completed</button>
						</li>
						<li>
							<button id="incomplete-filter-btn" type="button" class="btn btn-danger">Incomplete</button>
						</li>
						<li>
							<button id="all-filter-btn" type="button" class="btn btn-default active">All</button>
						</li>
					</ul>
				</nav>
			</div>
			<div id="pagination-content" class="col-sm-12">
				
				@foreach($cards as $card)
					<div class="card col-sm-4{{ trim($card->english) === '' || is_null($card->english) ? ' empty' : ''}}" data-id="{{$card->id }}">
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
								<button class="btn btn-xs btn-success mark-complete" 
											data-action="complete" 
											data-id="{{ $card->id }}" 
											data-current-page="{{$cards->currentPage()}}">&check;
								</button>
								<button class="btn btn-xs btn-danger btn-22 mark-incomplete" 
											data-action="incomplete" 
											data-id="{{ $card->id }}" 
											data-current-page="{{$cards->currentPage()}}">&times;
								</button>
							</div>
						</div>
					</div>
				@endforeach
				</div>
			@endif
		</div>
	</div>
@stop

@section('javascripts')
	<script type="text/javascript">

		/**
		 * [showLatin description]
		 * @type {Object}
		 */
		var showLatin = {{ $show_latin ? 'true' : 'false' }};
		/**
		 * [searchInProgress description]
		 * @type {Boolean}
		 */
		var searchInProgress = false;
		/**
		 * [showMode description]
		 * @type {Object}
		 */
		var showMode = "{{ $show_mode }}";

		/**
		 * [setCardActionListeners description]
		 */
		function setCardActionListeners(){
			
			var $markCompleteBtns   = $('.mark-complete');
			var $markIncompleteBtns = $('.mark-incomplete');

			$markCompleteBtns.unbind().click(function(e){
				e.preventDefault();
				console.log('complete');
				if(showMode == 'incomplete'){
					var cardId = $(this).data('id');
					$('.card[data-id="' + cardId + '"]').fadeOut();
					$.ajax({
					  url: '/cards/' + cardId + '/mark-as-complete/1',
					  method: 'POST',
					  data: {_token: $('meta[name="_token"]').attr('content')},
					  complete: function(response){
					    console.log(response);
					  }
					});
				}
			});
			
			$markIncompleteBtns.unbind().click(function(e){
				e.preventDefault();
				console.log('incomplete');
				if(showMode == 'complete'){
					var cardId = $(this).data('id');
					$('.card[data-id="' + cardId + '"]').fadeOut();

					$.ajax({
					  url: '/cards/' + cardId + '/mark-as-complete/0',
					  method: 'POST',
					  data: {_token: $('meta[name="_token"]').attr('content')},
					  complete: function(response){
					    console.log(response);
					  }
					});
				}
			});
		}

		/**
		 * [setFilterBtnListeners description]
		 */
		function setFilterBtnListeners(){
			var $completeFilterBtn = $('#complete-filter-btn');
			var $incompleteFilterBtn = $('#incomplete-filter-btn');
			var $allFilterBtn = $('#all-filter-btn');

			$completeFilterBtn.click(function(e){
				e.preventDefault();
				// set complete as active
				showMode = 'complete';
				// send a request to get first page of all cards
				// 
				// display cards
				// 
			});
			$incompleteFilterBtn.click(function(e){
				e.preventDefault();
				// set incomplete as active on button and showMode
				showMode = 'incomplete';
				// send a request to get first page of all cards
				// 
				// display cards
				// 
			});
			$allFilterBtn.click(function(e){
				e.preventDefault();
				// set all as active on button and show mode
				showMode = 'all';
				// send a request to get first page of all cards
				// 
				// display cards
				// 
			});
		}

		/**
		 * [setToggleLangauageListener description]
		 */
		function setToggleLangauageListener(){
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
		}

		/**
		 * [setPaginationListener description]
		 */
		function setPaginationListener(){
			var $paginationList = $('.pagination');
			$paginationList.find('a').click(function(e){
				e.preventDefault();
				var $paginationBtnAnchor = $(this);
				handleLinkClick($paginationBtnAnchor);
			});
		}

		$(document).ready(function(e, element){
			
			setCardActionListeners();

			setFilterBtnListeners();
			
			setPaginationListener();

			setToggleLangauageListener();
			
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

		/**
		 * [issueSearchRequest description]
		 * @param  {[type]} $searchInput [description]
		 * @return {[type]}              [description]
		 */
		function issueSearchRequest($searchInput){
			searchInProgress = true;
			
			$.get($searchInput.data('url') + (showLatin ? 'ln/' : 'en/') + $searchInput.val(), function(response){
				searchInProgress = false;
				if(response.length > 0){
					$('#pagination-content').html(makeNewContent(response));
				} else {
					$('#pagination-content').html('<div class="alert alert-info"><p>No results found for "'+ $searchInput.val() +'".</p></div>');
				}
				setCardActionListeners();
			});	
		}

		/**
		 * [handleLinkClick description]
		 * @param  {[type]} $link [description]
		 * @return {[type]}       [description]
		 */
		function handleLinkClick($link){
			$.get($link.attr('href'), function(response){

				updatePaginationLinks($link, response);

				$('#pagination-content').html(makeNewContent(response));
				setCardActionListeners();
			});
		}

		/**
		 * [updatePaginationLinks description]
		 * @param  {[type]} $paginationBtnAnchor [description]
		 * @param  {[type]} response             [description]
		 * @return {[type]}                      [description]
		 */
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
		function makeNewContent(response){
			var $cardDiv;
			var newContent = '';
			var data = response;

			if(response.data !== undefined){
				data = response.data;
			}
			$.each(data, function(index, item){
				$cardDiv = makeCard(item, response.next_page_url);
				newContent += $cardDiv;
			});

			return newContent;
		}

		// Make a card div given the info contained in item.
		function makeCard(item, nextPageUrl){
			var noDefinition = item.english === null || item.english === '';
			console.log(nextPageUrl);
			return ['<div class="card col-sm-4',
						(noDefinition ? ' empty' : ''), '" data-id="',item.id,'">',
				'<div class="row">',
					'<div class="latin', (showLatin ? '' : ' not-showing'),' col-sm-4"><a href="/cards/', item.id, '">',
						item.latin,
					'</a></div>',
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
					( nextPageUrl !== undefined ? 
					['<div class="actions">',
						'<button class="btn btn-xs btn-success mark-complete" ',
									'data-action="complete" ',
									'data-id="',item.id,'" ',
									'data-next-page-url="',nextPageUrl,'">&check;',
						'</button>&nbsp;',
						'<button class="btn btn-xs btn-danger btn-22 mark-incomplete" ',
									'data-action="incomplete" ',
									'data-id="',item.id,'" ',
									'data-next-page-url="',nextPageUrl,'">&times;',
						'</button>',
					'</div>'].join('') : ''),
				'</div>',
			'</div>'].join('');
		}
	</script>
@stop