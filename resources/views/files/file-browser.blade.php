@extends('layouts.paper')

@section('stylesheets')
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
@stop

@section('content')
<div class="container">
    <div class="row">
    @if($images->count())
        @foreach($images as $image)
          <div class="col-sm-4">
            <img class="img-thumbnail img-responsive" src="{{$image->url}}" onclick="returnFileUrl('{{$image->url}}')"/>
          </div>
        @endforeach
    @endif
    </div>
</div>
@stop

@section('javascripts')
    <script>
        // Helper function to get parameters from the query string.
        function getUrlParam( paramName ) {
            var reParam = new RegExp( '(?:[\?&]|&)' + paramName + '=([^&]+)', 'i' );
            var match = window.location.search.match( reParam );

            return ( match && match.length > 1 ) ? match[1] : null;
        }
        // Simulate user action of selecting a file to be returned to CKEditor.
        function returnFileUrl(url) {

            var funcNum = getUrlParam( 'CKEditorFuncNum' );
            var fileUrl = url;
            window.opener.CKEDITOR.tools.callFunction( funcNum, fileUrl );
            window.close();
        }
    </script>
@stop