<?php

namespace App\Http\Controllers\Project;

use App\Enums\TaskStatus;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskAttachment;
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

    public function update(Request $request, Task $task)
    {
        $validatedData = $request->validate([
            'assignee_id' => 'exists:users,id',
            'title' => 'required|string',
            'description' => 'required',
            'due_date' => 'required|date_format:Y-m-d H:i:s|after_or_equal:now',
            'status' => Rule::enum(TaskStatus::class),
        ]);

        $task->update($validatedData);

        return back()->with('success', 'Mission updated successfully!');
    }

    public function addAttachment(Request $request, Task $task)
    {
        $validatedData = $request->validate([
            'file' => 'required|mimes:pdf,xlx,csv|max:15024',
        ]);

        $fileName = public_path('task/attachments/') . time() . '.' . $request->file->gethostname() . '.' . $request->file->extensions();

        $request->file->move($fileName);

        $task->attachments()->create([
            'url' => $fileName,
        ]);

        return back()->with('success', 'Attacment added successfully!');
    }

    public function deleteAttachment(TaskAttachment $taskAttachment)
    {
        unset($taskAttachment->url);
        $taskAttachment->delete();
        return back()->with('success', 'Attacment added successfully!');
    }
}
