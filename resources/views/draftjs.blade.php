<!DOCTYPE html>
<html>
    <head>
        {{-- @yield('title') --}}

        {{-- @yield('stylesheets') --}}
        {{-- <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"> --}}
        {{-- <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css"> --}}
        <link href="{{ asset('css/draft-js.css') }}" rel="stylesheet" type="text/css">
        {{-- @if(isset($note)) --}}
            <style>
             #draft-mount { width: 600px; }
                .background {
            @if(isset($note['courseName']))
                background-image: url("/images/{{preg_replace('/\s+/', '_', $note['courseName'])}}.jpg");
            @endif
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-position: left top;
                background-size: cover;
            }
            .RichEditor-root {
              background: #fff;
              border: 1px solid #ddd;
              font-family: 'Georgia', serif;
              font-size: 14px;
              padding: 15px;
            }

            .RichEditor-editor {
              border-top: 1px solid #ddd;
              cursor: text;
              font-size: 16px;
              margin-top: 10px;
            }

            .RichEditor-editor .public-DraftEditorPlaceholder-root,
            .RichEditor-editor .public-DraftEditor-content {
              margin: 0 -15px -15px;
              padding: 15px;
            }

            .RichEditor-editor .public-DraftEditor-content {
              min-height: 100px;
            }

            .RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root {
              display: none;
            }

            .RichEditor-editor .RichEditor-blockquote {
              border-left: 5px solid #eee;
              color: #666;
              font-family: 'Hoefler Text', 'Georgia', serif;
              font-style: italic;
              margin: 16px 0;
              padding: 10px 20px;
            }

            .RichEditor-editor .public-DraftStyleDefault-pre {
              background-color: rgba(0, 0, 0, 0.05);
              font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
              font-size: 16px;
              padding: 20px;
            }

            .RichEditor-controls {
              font-family: 'Helvetica', sans-serif;
              font-size: 14px;
              margin-bottom: 5px;
              user-select: none;
            }

            .RichEditor-styleButton {
              color: #999;
              cursor: pointer;
              margin-right: 16px;
              padding: 2px 0;
            }

            .RichEditor-activeButton {
              color: #5890ff;
            }

            </style>
  {{--       @else
            <style>
                .background {
                     background-image: url("/images/material_background.jpg");
                }
            </style> 
        @endif --}}
        <meta name="_token" content="{{ csrf_token() }}" />
        <meta charset="utf-8" />
    </head>
    <body>

        {{-- @include('../partials.top_nav') --}}

        {{-- <div class="background"></div> --}}
        <div id="draft-mount"></div>

        <script src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>
        
        {{-- @yield('javascripts') --}}

        <script type="text/javascript" src="{{ asset('js/draft-editor.js') }}"></script>
    </body>
</html>
