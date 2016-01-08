@extends('../../layouts.master')

@section('top_nav')
    @include('../../partials.top_nav')
@stop

@section('content')
    <div id="card-page" class="container container-fluid">
    </div>
@stop

@section('javascripts')
    <script type="text/javascript" src="{{ asset('js/react-cards.js') }}"></script>
@stop