@extends('cards.layouts.show')

@section('extras')
	<input type="text" name="type" class="form-control" value={{ $card_type }} />
	{{-- Add these fields once ready --}}
	{{-- <input type="number" name="word_type" class="form-control" value={{ isset($card) ? $card->word_type : null }} />
	<input type="number" name="word_category" class="form-control" value={{ isset($card) ? $card->word_category : null }} /> --}}
@stop
