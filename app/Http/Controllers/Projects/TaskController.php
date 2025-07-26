<?php

namespace App\Http\Controllers\Project;

use App\Enums\TaskStatus;
use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    public function store(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'assignee_id' => 'exists:users,id',
            'title' => 'required|string',
            'description' => 'required',
            'exp' => 'required|integer',
            'due_date' => 'required|date_format:Y-m-d H:i:s|after_or_equal:now',
            'status' => Rule::enum(TaskStatus::class),
        ]);

        /**
         * @var App/Models/User
         */
        $user = Auth::user();
        $validatedData['user_id'] = $user->id;

        $project->tasks()->create($validatedData);

        return redirect()->route('task.index')->with('success', 'New mission has successfully deployed!');
    }

    // public function update(Request $reque)
}
