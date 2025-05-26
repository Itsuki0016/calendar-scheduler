<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function index()
    {
        return Event::all();
    }

    public function store(Request $request)
    {
        return Event::create($request->all());
    }

    public function destroy($id)
    {
        return Event::destroy($id);
    }
}