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
			<div id="cards-list" class="col-sm-12">
				
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
				$(this).parents('.pagination').find('li.active').removeClass('active');
				$(this).parents('li').addClass('active');

				var cards = '';
				var $cardDiv;

				$.get($(this).attr('href'), function(response){
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

						cards += $cardDiv;
					});
					$('#cards-list').html(cards);
				});
			});
		});
	</script>
@stop