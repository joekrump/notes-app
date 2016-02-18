<!DOCTYPE html>
<html>
    <head>
        @yield('title')
        @yield('stylesheets')
        <style>
            body {
                background-color: black;
            }
        </style>

    </head>
    <body>
        @yield('content')

        <script src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>

        @yield('javascripts')
    </body>
</html>