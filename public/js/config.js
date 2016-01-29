/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
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
	    { name: 'links' },
	  	{ name: 'insert' },
	    { name: 'editing',     groups: [ 'find', 'selection'] },
	    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
	    { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'image' ] },
	    // { name: 'forms' },
	    // '/',
	    // { name: 'links' },
	    // { name: 'insert' },
	    '/',
	    { name: 'styles' },
	    { name: 'colors' },
	    { name: 'tools' },
	    { name: 'others' }
	];
};
