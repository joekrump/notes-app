<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class CardsController extends Controller
{
    public function cards_list(Request $request){
        $cards = \App\Card::orderby('latin', 'asc')->get();
        return view('cards.list', compact(['cards']));
    }
    /**
     * Display a listing of cards
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
            $cards = \App\Card::orderby('lesson_num', 'desc')->orderby('latin')->paginate(9);
            $path = '/cards/category/' . $card_type;
        }

        // return a list of cards in json format if this is an AJAX request.
        if($request->ajax()){
            return $cards;
        }

        $cards->setPath($path);
        $blank_count = \App\Card::whereRaw('english = ""')->count();
        $show_latin = true;
        
        return view('cards.index', compact(['cards', 'card_type', 'resource_type', 'show_latin', 'blank_count']));
    }

    public function search($language, $search_term){

        // if the search_term value is a number then we assume that the user is trying to filter by lesson number.
        if(intval($search_term)){
            $cards = \App\Card::where('lesson_num', $search_term);
        } else {
            $likeString = '%' . $search_term . '%';
            // Search based on the language that we are searching for.
            if($language == 'ln'){
                $cards = \App\Card::where('latin', 'like', $likeString);
            } else if($language == 'en') {
                $cards = \App\Card::where('english', 'like', '%' . $likeString);
            }
        }

        return $cards->select(['id', 'latin', 'english', 'origin', 'lesson_num'])->orderby('latin')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create($card_type = 'latin')
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

        return $card;
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
        $card->save();

        return $card;
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
