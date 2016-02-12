/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	config.skin = 'moono-dark';
	config.uiColor = '#000000';
	config.disableNativeSpellChecker = false;
	config.removePlugins = 'liststyle,tabletools,scayt,contextmenu,resize,save,magicline';
	config.extraPlugins = 'lineutils,notification,notificationaggregator,filetools,widget,uploadwidget,uploadimage';
	config.resize_enabled = false;   //Disallow resizing
	config.filebrowserBrowseUrl = '/browser',
  config.filebrowserUploadUrl = '/uploader'
	config.toolbarGroups = [
	    { name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
	    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
	  	{ name: 'insert',      groups: [ 'image']},
	    { name: 'editing',     groups: [ 'find', 'selection'] },
	    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
	    
	    // { name: 'forms' },
	    // '/',
	    // { name: 'links' },
	    // { name: 'insert' },
	    // '/',
	    { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'image' ] },
	    { name: 'styles' },
	    { name: 'colors' },
	    { name: 'tools' },
	    { name: 'others' }
	];

};
