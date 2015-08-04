<!DOCTYPE html>
<html>
    <head>
        <title>Toogl React App</title>

        <link href="//fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">

        <meta name="_token" content="{{ csrf_token() }}" />

        <style>

        </style>
    </head>
    <body>
        @yield('content')

        <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>


        @yield('javascripts')
    </body>
</html>
