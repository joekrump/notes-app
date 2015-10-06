<!DOCTYPE html>
<html>
    <head>
        <title>Note Taking App</title>

        <!-- <link href="//fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css"> -->
        @yield('stylesheets')
        <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">
        @if(isset($note_course))
        <style>
            .background {
                background-image: url("/images/{{preg_replace('/\s+/', '_', $note_course->name)}}.jpg");
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-position: left top;
                background-size: cover;
            }
        </style>
        @endif
        <meta name="_token" content="{{ csrf_token() }}" />
        
    </head>
    <body>
        <div class="background"></div>
        @yield('content')

        <script src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>
        
        @yield('javascripts')
    </body>
</html>