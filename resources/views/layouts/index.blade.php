<!DOCTYPE html>
<html>
<head>
  @yield('title')

  @yield('stylesheets')
  <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
  <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">

  <meta name="_token" content="{{ csrf_token() }}" />
</head>
<body>
  @include('../partials/top_nav')
  <div class="background"></div>
  <div class="index-page">

    <div class="container container-fluid content">
      @yield('content')
    </div>
		
	</div>
  <script type="text/javascript" src="{{ asset('js/react-nav.js') }}"></script>
	<script src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
	<script src="{{ asset('js/bootstrap.min.js') }}"></script>
  @yield('javascripts')
</body>
</html>
