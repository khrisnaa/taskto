<?php

namespace App\Http\Controllers\Projects;

use App\Enums\ProjectDifficulty;
use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    public function index()
    {
        // 
    }

    public function create()
    {
        // 
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title'         => 'required|string|max:150',
            'description'   => 'required|string',
            'due_date'      => 'required|date_format:Y-m-d H:i:s|after_or_equal:now',
            'difficulty'    => [Rule::enum(ProjectDifficulty::class)],
            'character_id'  => 'required|exists:characters,id',
            'is_public'     => 'required|in:true,false'
        ]);

        $validatedData['is_public']  = (bool)$validatedData['is_public'];
        $validatedData['salt']       = str()->rand(12);

        /**
         * @var App/Models/User
         */
        $user = Auth::user();
        $validatedData['user_id'] = $user->id;

        $project = Project::create($validatedData);

        return redirect()->route('project.show', ['project' => $project])->with('success', 'New boss has deployed!');
    }

    public function show(Project $project)
    {
        // 
    }

    public function update(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'title'         => 'required|string|max:150',
            'description'   => 'required|string',
            'due_date'      => 'required|date_format:Y-m-d H:i:s|after_or_equal:now',
            'difficulty'    => [Rule::enum(ProjectDifficulty::class)],
            'character_id'  => 'required|exists:characters,id',
            'is_public'     => 'required|in:true,false'
        ]);

        $validatedData['is_public']  = (bool)$validatedData['is_public'];
    }
}
