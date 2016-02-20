@extends('layouts.paper')

@section('stylesheets')
<link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
<link href="{{ asset('css/fm.css') }}" rel="stylesheet" type="text/css">
@stop

@section('content')
<div class="container">
  <div class="row">
    @if($images->count())
    @foreach($images as $image)
    <div class="col-sm-2 img-container">
      <img class="img-responsive img-thumbnail" src="{{$image->url}}" onclick="returnFileUrl('{{$image->url}}')" style="display:none;"/>
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

  /**
   * [resizeThumbnails description]
   * @param  {[type]} thumbnailContainerWidthPx [description]
   * @param  {[type]} init                      [description]
   * @return {[type]}                           [description]
   */
  function resizeThumbnails($imgThumbnails, thumbnailContainerWidthPx, init) {
    var $currentThumbnailObject = null;
    
    var paddingPx = 30;
    $imgThumbnails.each(function(index, thumbnail){
      $currentThumbnailObject = $(thumbnail);

      if($currentThumbnailObject.height() >= thumbnailContainerWidthPx){
        $currentThumbnailObject.css({height : thumbnailContainerWidthPx, width : 'auto'});
      } else {
        $currentThumbnailObject.css({width : thumbnailContainerWidthPx - paddingPx, height : 'auto'});
      }
    });
    if(init){
      console.log('fade')
      $imgThumbnails.fadeIn(200);
    }
  }

  $(document).ready(function(){
    var $imageContainers = $('.img-container');
    var containerWidthPx = $imageContainers.width();
    var $imageThumbnails = $('.img-container .img-thumbnail');

    resizeThumbnails($imageThumbnails, containerWidthPx, true);
    
    $(window).on('resize', function(){
      containerWidthPx = $imageContainers.width();
      $imageContainers.css('height', containerWidthPx);
      resizeThumbnails($imageThumbnails, containerWidthPx);
    });
  });
        
</script>
@stop