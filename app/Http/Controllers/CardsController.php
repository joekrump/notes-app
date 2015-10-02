<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class CardsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        
        $resource_type = 'course';
        $card_type = $request->request->get('card_type');
        $lesson_num = $request->request->get('lesson_num');

        $cards = \App\Card::where("type", $card_type);
        $path = '/cards/category/' . $card_type;

        if(!is_null($lesson_num)){
            $cards = $cards->where('lesson_num', $lesson_num);
            $path = '/cards/category/' . $card_type . '/' . $lesson_num;
        }

        $cards = $cards->orderby('lesson_num', 'desc')->orderby('latin')->paginate(9);

        if($cards->count() < 1) {
            $card_type = 'all';
            $cards = \App\Card::paginate(9);
            $path = '/cards/category/' . $card_type;
        }

        if($request->ajax()){
            return $cards;
        }

        $cards->setPath($path);
        
        return view('cards.index', compact(['cards', 'card_type', 'resource_type']));
    }

    public function search($search){
        // $search_term = $response->input('search');
        if(intval($search)){
            $cards = \App\Card::where('lesson_num', $search)->select(['id', 'latin', 'english', 'origin', 'lesson_num'])->orderby('latin')->get();
        } else {
            $cards = \App\Card::where('latin', 'like', '%'.$search.'%')->select(['id', 'latin', 'english', 'origin', 'lesson_num'])->orderby('latin')->get();
        }

        return $cards;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create($card_type = 'default')
    {
        return view('cards.show', compact(['card_type']));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $card = new \App\Card($request->request->all());
        $card->save();

        return redirect('/cards/' . $card->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {   
        $card_type = 'default';
        $cards = \App\Card::where('english', $id);
        if($cards->count() > 0) {
            $card = $cards->first();
            $card_type = $card->type;
        } else {
            $card = \App\Card::find($id);
            $card_type = $card->type;
        }
        return view('cards.show', compact(['card', 'card_type']));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
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
        $card = \App\Card::find($id);
        $card->update($request->request->all());
        $card_type = $card->type;
        return view('cards.show', compact(['card', 'card_type']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        \App\Card::find($id)->delete();
    }
}
