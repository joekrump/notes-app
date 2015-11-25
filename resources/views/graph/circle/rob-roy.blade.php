<!DOCTYPE html>
<html>
  <head>
    <title>Note Taking App</title>

    <!-- <link href="//fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css"> -->
    @yield('stylesheets')
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">
    @if(isset($note))
    <style>
      .background {
        background-image: url("/images/rob_roy.jpg");
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
    <div class="background-dimmer">
      <section class="container container-fluid">
        <div class="row">
          <div class="col-sm-12">
            <div class="circle circle-sm yellow">
              <div class="name"></div>
            </div>
            <div class="circle circle-sm red">
              <div class="name"></div>
            </div>
            <div class="circle circle-sm lime">
              <div class="name"></div>
            </div>
            <div class="circle circle-sm blue">
              <div class="name"></div>
            </div>
            <div class="circle circle-sm light-blue">
              <div class="name"></div>
            </div>
            <div class="circle circle-sm magenta">
              <div class="name"></div>
            </div>
            <div class="circle circle-sm purple">
              <div class="name"></div>
            </div>
            <div class="circle circle-sm grey">
              <div class="name"></div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <script src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>

    @yield('javascripts')
  </body>
</html>