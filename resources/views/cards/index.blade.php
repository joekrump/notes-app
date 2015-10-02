@extends('cards.layouts.master')

@section('content')
	<section class="container container-fluid">
		<header class="page-header">
			<div class="btn-group pull-right">
				<a href="/cards/category/all" class="btn btn-primary">All Cards</a>
{{-- 				<a href="/cards/category/all" class="btn btn-primary">Show Categories</a> --}}
				<a href='/cards/new' class="btn btn-success">New Card</a>
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

				var $activePaginationLink = $(this).parents('.pagination').find('li.active');
				var currentPageNum = $activePaginationLink.text();

				$activePaginationLink.removeClass('active');
				$(this).parents('li').addClass('active');

				var $previousPageBtnLink = $activePaginationLink.siblings().first().find('a');
				var $nextPageBtnLink     = $activePaginationLink.siblings().last().find('a');

				var previousPageURL = $previousPageBtnLink.attr('href');
				var nextPageURL     = $nextPageBtnLink.attr('href');

				$.get($(this).attr('href'), function(response){
					$('#pagination-content').html(makeNewContent(response));
				});
			});
		});

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
			console.log(newContent)
			return newContent;
		}
	</script>
@stop