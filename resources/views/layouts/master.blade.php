<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>

        <link href="//fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link href="{{ elixir('css/app.css') }}" rel="stylesheet" type="text/css">

        <style>

        </style>
    </head>
    <body>
        @yield('content')

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>

        <script type="text/jsx" src="{{ asset('js/bundle.js') }}"></script>
        <script type="text/jsx" src="{{ asset('js/components.js') }}"></script>

        @yield('javascripts')
    </body>
</html>
