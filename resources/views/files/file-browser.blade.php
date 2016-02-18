@extends('layouts.paper')

@section('stylesheets')
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
@stop

@section('content')
<div class="container">
    <div class="row">
      <div class="col-sm-4">
        <img class="img-thumbnail img-responsive" src="/images/uploads/StJoseph.jpg" onclick="returnFileUrl()"/>
      </div>
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
        function returnFileUrl() {

            var funcNum = getUrlParam( 'CKEditorFuncNum' );
            var fileUrl = "/images/uploads/StJoseph.jpg";
            window.opener.CKEDITOR.tools.callFunction( funcNum, fileUrl );
            window.close();
        }
    </script>
@stop