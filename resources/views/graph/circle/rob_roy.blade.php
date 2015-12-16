<!DOCTYPE html>
<html>
  <head>
    <title>Note Taking App</title>

    <!-- <link href="//fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css"> -->
    @yield('stylesheets')
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">

    <style>
      .background {
        background-image: url("/images/scotland.jpg");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: left top;
        background-size: cover;
      }
    </style>

  </head>
  <body>
    <div class="background"></div>
    <div class="background-dimmer">
      <section class="container container-fluid circle-graph-page">
        <div class="row">
          <div class="col-sm-12">
            <div class="circle circle-sm light-green">
              <div class="name">Sir Hildebrand Osbaldistone</div>
            </div>
            <div class="circle circle-sm green">
              <div class="name">Rashleigh Osbaldistone</div>
            </div>
            <div class="circle circle-sm deep-orange">
              <div class="name">Sir Frederick Vernon</div>
            </div>
            <div class="circle circle-xs-sm red">
              <div class="name">Diana Vernon</div>
            </div>
            <div class="circle circle-md yellow">
              <div class="name">Rob Roy (Robert McGregor Campbell)</div>
            </div>
            <div class="circle circle-sm amber2">
              <div class="name">Helen Campbell(Rob Roy's Wife)</div>
            </div>
            <div class="circle circle-lg lime">
              <div class="name">Francis Osbaldistone</div>
            </div>
            <div class="circle circle-xs-sm lime2">
              <div class="name" style="top: 45px;">William Osbaldistone (Frank's Father)</div>
            </div>
            <div class="circle circle-xs indigo">
              <div class="name">Mr. Justice Inglewood</div>
            </div>
            <div class="circle circle-xs-sm light-blue">
              <div class="name">Mr. Morris</div>
            </div>
            <div class="circle circle-sm grey">
              <div class="name">Andrew Fairservice</div>
            </div>
            <div class="circle circle-xs amber">
              <div class="name">Dougal</div>
            </div>
            <div class="circle circle-sm blue-grey">
              <div class="name">Mr. Owen</div>
            </div>
            <div class="circle circle-sm purple">
              <div class="name">Mr. Nicol Jarvie</div>
            </div>
            <div class="circle circle-sm cyan">
              <div class="name">Will (the character to whom the story is addressed)</div>
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