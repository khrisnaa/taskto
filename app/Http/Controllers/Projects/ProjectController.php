<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('project');
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
            'is_public'     => 'required|in:true,false'
        ]);

        $validatedData['is_public']  = (bool)$validatedData['is_public'];

        $project->update($validatedData);

        return redirect()->route('project.edit', ['project', $project])->with('success', 'The quest has been updated!');
    }

    public function destroy(Project $project)
    {
        /**
         * @var App/Models/User
         */
        $user = Auth::user();

        if ($user->id != $project->user_id) {
            abort(403);
        }

        $project->delete();
        return redirect()->route('project.index')->with('success', 'The quest has been deleted!');
    }

    public function addAttachment(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'file' => 'required|mimes:pdf,xlx,csv|max:15024',
        ]);

        $fileName = public_path('project/attachments/') . time() . '.' . $request->file->gethostname() . '.' . $request->file->extensions();

        $request->file->move($fileName);

        $project->attachments()->create([
            'url' => $fileName,
        ]);

        return back()->with('success', 'Attacment added successfully!');
    }

    public function deleteAttachment(ProjectAttachment $projectAttachment)
    {
        unset($projectAttachment->url);
        $projectAttachment->delete();
        return back()->with('success', 'Attacment added successfully!');
    }

    public function markAsDone(Project $project)
    {
        $project->update(['is_finished' => true]);

        return back()->with('success', 'The quest has marked as done!');
    }
}
