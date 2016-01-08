<!DOCTYPE html>
<html>
    <head>
        <meta name="_token" content="{{ csrf_token() }}" />
    </head>
    <body>
        <div id="cards">
        </div>
        <script type="text/javascript" src="{{ asset('js/react-cards.js') }}"></script>
    </body>
</html>