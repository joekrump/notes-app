<!DOCTYPE html>
<html>
    <head>
        @yield('title')

        @yield('stylesheets')
        <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">
        @if(isset($note))
            <style>
                .background {
            @if(isset($note['courseName']))
                background-image: url("/images/{{preg_replace('/\s+/', '_', $note['courseName'])}}.jpg");
            @endif
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-position: left top;
                background-size: cover;
            }
            </style>
        @else
            <style>
                .background {
                     background-image: url("/images/material_background.jpg");
                }
            </style> 
        @endif
        <meta name="_token" content="{{ csrf_token() }}" />
    </head>
    <body>

        @include('../partials.top_nav')

        <div class="background"></div>
        @yield('content')

        <script type="text/javascript" src="{{ asset('js/react-nav.js') }}"></script>
        <script src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>
        
        @yield('javascripts')
    </body>
</html>