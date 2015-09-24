<!DOCTYPE html>
<html>
<head>
  <title>Note Taking App</title>

  @yield('stylesheets')
  <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">

  <meta name="_token" content="{{ csrf_token() }}" />
</head>
<body>
	<div class="index-page">
		@yield('content')
	</div>
  @yield('javascripts')
</body>
</html>
