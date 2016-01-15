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
            @if(strpos($note->title, 'Enlightenment'))
                background-image: url("/images/enlightenment.jpg");
            @elseif(isset($note_course))
                background-image: url("/images/{{preg_replace('/\s+/', '_', $note_course->name)}}.jpg");
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
                     background-image: url("/images/app_background2.jpg");
                }
            </style> 
        @endif
        <meta name="_token" content="{{ csrf_token() }}" />
    </head>
    <body>
        <div class="background"></div>
        <div id="react-page">
        </div>

        <script type="text/javascript" src="{{ asset('js/react-page.js') }}"></script>
        <script src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>
        
        @yield('javascripts')
    </body>
</html>