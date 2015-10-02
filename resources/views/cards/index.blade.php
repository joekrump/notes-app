@extends('cards.layouts.master')

@section('content')
	<section class="container container-fluid">
		<header class="page-header">
			<div class="pull-right col-sm-6">
				<div class="row">
					<div class="col-sm-6">
						<input id="search" class="form-control" name='search' placeholder="Search" data-url="/cards/search/" />
					</div>
					<div class="col-sm-6">
						<div class="btn-group pull-right">
							
							<a href="/cards/category/all" class="btn btn-primary">All Cards</a>
			{{-- <a href="/cards/category/all" class="btn btn-primary">Show Categories</a> --}}
							<a href='/cards/new' class="btn btn-success">New Card</a>
						</div>
					</div>
				</div>
			</div>
			<h1>{{ ucwords($card_type) }} Cards</h1>
		</header>
		<div class="row">
			@if($cards->count())
			<div class="col-sm-4 col-sm-offset-4 text-center">
				{!! $cards->render() !!}
			</div>
			<div id="pagination-content" class="col-sm-12">
				
				@foreach($cards as $card)
					<a class="card col-sm-4" href={{ "/cards/" . $card->id }}>
						<div class="row">
							<div class="latin col-sm-4">
								{!! $card->latin !!}
							</div>
							<div class="col-sm-8">
								<div class="row">
									<div class="lesson-number col-sm-12">
									<div class="pull-right">
										{{ $card->lesson_num }}
									</div>
								</div>
								</div>
								
								<div class="english row">
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
						</div>
					</a>
				@endforeach
				</div>
			@endif
		</div>
	</section>
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
						console.log(response);
					});	
				});
			}
		});

		function handleLinkClick($link){
			$.get($link.attr('href'), function(response){

				updatePaginationLinks($link, response);

				$('#pagination-content').html(makeNewContent(response));
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
		function makeNewContent(response){
			var $cardDiv;
			var newContent = '';
			$.each(response.data, function(index, item){

				$cardDiv = ['<a class="card col-sm-4" href="/cards/"', item.id, '>',
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

				newContent += $cardDiv;
			});

			return newContent;
		}
	</script>
@stop