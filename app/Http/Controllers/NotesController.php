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
    public function index()
    {
        $notes_by_course = \App\Note::all()->groupBy('course_id');
        $resource_type = 'note';

        return view('notes.index', compact(['notes_by_course', 'resource_type']));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        return view('notes.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $note = new \App\Note($request->request->all());
        $note->save();

        return redirect('/notes/' . $note->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $notes = \App\Note::where('title', $id);
        $courses = \App\Course::all();

        if($notes->count() > 0) {
            $note = $notes->first();
            $note_course = \App\Course::find($note->course_id);
        } else {
            $note = \App\Note::find($id);
            if($note){
                $note_course = \App\Course::find($note->course_id);
            }   
        }

        return view('notes.show', compact(['note', 'courses', 'note_course']));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        return view('notes.edit');
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
        $note->update($request->request->all());
        return redirect('/notes/' . $note->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        \App\Note::find($id)->delete();
    }
}
