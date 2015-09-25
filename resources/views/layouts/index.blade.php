<!DOCTYPE html>
<html>
<head>
  <title>Note Taking App</title>

  @yield('stylesheets')
  <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
  <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">

  <meta name="_token" content="{{ csrf_token() }}" />
</head>
<body>
	<div class="index-page">
    <nav class="navbar navbar-static-top navbar-inverse">
      <div class="container container-fluid">
        <div class="row"> 
          <div class="col-sm-12">
            <ul class="nav navbar-nav navbar-left">
              <li><a href="/notes">Notes</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/cards ">Cards</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="container container-fluid content">
      @yield('content')
    </div>
		
	</div>
	<script src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
	<script src="{{ asset('js/bootstrap.min.js') }}"></script>
  <script>
    $(document).ready(function(e, element){
      $('.btn-delete').click(function(e){
        e.preventDefault();
        var $itemRow = $(this).parent().parent().parent('.row');
        $itemRow.fadeOut(300);
        $.ajax({
          url: '/{{$resource_type}}s/' + $(this).data('id'),
          method: 'DELETE',
          data: {_token: $('meta[name="_token"]').attr('content')},
          complete: function(response){
            if(response.status === 200){
              // do something on success
              $itemRow.remove();
            } else {
              $itemRow.show();
            }
          }
        });
      });
    });
  </script>
  @yield('javascripts')
</body>
</html>
