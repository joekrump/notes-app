@extends('cards.layouts.show')

@section('extras')
	<input type="text" name="type" class="form-control" value={{ $card_type }} />
@stop
