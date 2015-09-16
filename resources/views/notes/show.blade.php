@extends('layouts.master')

@section('content')
  <!DOCTYPE html>
	<div class="background-dimmer">
		<section class="container">
			<div class="main" contenteditable="true">
				<article class="page">
					<p>Placeholder</p>
				</article>
			</div>
			<aside class="right-aside" contenteditable="true">
				<h4>Sidenote</h4>
				<p>
					sidenote content
				</p>
			</aside>
			<aside class="left-options">
				<h1>Header</h1>
				<h2>Header</h2>
				<h2>Header</h2>
				<h2>Header</h2>
				<h2>Header</h2>
				<span class="hlt1">Highlight</span>
				<span class="hlt2">Highlight</span>
				<em>Italics</em>
				<strong>Bold</strong>
			</aside>
		</section>
	</div>
@stop
