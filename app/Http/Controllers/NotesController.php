<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($status = 0)
    {
      $courses = \App\Course::orderBy('name', 'ASC')->get();
      if($status !== 0 && $status == 'backup'){
        $status = 2;
      }
      $resource_type = 'note';
      return view('notes.index', compact(['courses', 'resource_type', 'status']));
    }

    /**
     * Show view for creating a new Note
     *
     * @return Response
     */
    public function create()
    {
      $courses = \App\Course::orderBy('name', 'ASC')->get();

      return view('notes.show', compact(['courses']));    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
      $note = new \App\Note($request->input());
      
      $note->set_slug($request->title);
      $note->save();

      $note->set_subject_name();

      return $note;
    }

    /**
     * Display a note that has a specific slug
     *
     * @param  Request  $request
     * @param  string   $slug
     * @return Response
     */
    public function show(Request $request, $slug)
    {
      $note = \App\Note::whereSlug($slug)->first();
      $courses = \App\Course::all();

      if(!$note){
        $note = \App\Note::find($slug);
      }

      $search_term = $request->request->get('s');

      // check if there is already a backup of the note.
      $existingBackup = \App\Note::where('original_note_id', $note->id)
        ->where('status', 2)
        ->first();

      $newNote = $note->replicate();
        // Set the status of the new note to 2 :'backup'
      $newNote->setAttribute('status', 2);

      if($existingBackup){
        $newNote->setAttribute('id', $existingBackup->id);
        $newNote->update();
      } else {
        $newNote->setAttribute('id', null);
        $newNote->setAttribute('original_note_id', $note->id);
        $newNote = new \App\Note($newNote->toArray());
        $newNote->save();
      }

      if($note){
        $note->set_subject_name();
      }

      return view('notes.show', compact(['note', 'courses', 'search_term']));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
      $note = \App\Note::find($id);
      $previous_title = $note->title;
      $note->update($request->input());
      if($previous_title !== $note->title){
        $note->set_slug($request->title);
      }
      $note->save();

      $note->set_subject_name();

      return $note;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
      if($note = \App\Note::find($id)){
        $note->delete();
      }
    }

    public function search($term){
      $notes = \App\Note::where('status', 0)->where('content', 'like', "%{$term}%")
        ->with('course')->orderBy('course_id')->get();
      return $notes;
    }
  }
