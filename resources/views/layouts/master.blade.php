<!DOCTYPE html>
<html>
    <head>
        <title>Note Taking App</title>

        <link href="//fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">

        <meta name="_token" content="{{ csrf_token() }}" />

    </head>
    <body>
        @yield('content')

        <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>

        @yield('javascripts')
    </body>
</html>
