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
			@endif
		</div>
	</section>
@stop