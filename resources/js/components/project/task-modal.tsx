'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

export const TaskModal = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [deadline, setDeadline] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    // Dummy data teman (bisa diganti nanti)
    const teamMembers = ['Ayu', 'Budi', 'Citra', 'Dewi'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            title,
            desc,
            complete: false,
            deadline,
            attachment: file ? file.name : null,
            assignedTo,
        };

        console.log('Task to add:', newTask);

        // Reset form
        setTitle('');
        setDesc('');
        setFile(null);
        setDeadline('');
        setAssignedTo('');
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 size-4" />
                    New Task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Task</DialogTitle>
                    <DialogDescription>Fill in the details below to add a new task.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="e.g., Design Hero Section" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="desc">Description</Label>
                        <Textarea id="desc" placeholder="Describe the task here..." value={desc} onChange={(e) => setDesc(e.target.value)} required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                    </div>

                    <div className="grid gap-2">
                        <Label>Assign To</Label>
                        <Select value={assignedTo} onValueChange={setAssignedTo}>
                            <SelectTrigger id="assignedTo">
                                <SelectValue placeholder="Select teammate" />
                            </SelectTrigger>
                            <SelectContent>
                                {teamMembers.map((member) => (
                                    <SelectItem key={member} value={member}>
                                        {member}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="attachment">Attachment (optional)</Label>
                        <Input id="attachment" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    </div>

                    <Button type="submit" className="w-full">
                        Add Task
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
