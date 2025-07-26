import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Character {
  id: number;
  name: string;
  image_url: string;
  is_boss: boolean;
  created_at: Date;
  updated_at: Date;
  [key: string]: unknown;
}

export interface User {
  id: number;
  character_id: number | null;
  name: string;
  email: string;
  avatar_url: string;
  exp: number;
  remember_token: string | null;
  created_at: Date;
  updated_at: Date;
  [key: string]: unknown;
}

export interface PasswordResetToken {
  email: string;
  token: string;
  created_at: Date | null;
  [key: string]: unknown;
}

export interface Session {
  id: string;
  user_id: number | null;
  ip_address: string | null;
  user_agent: string | null;
  payload: string;
  last_activity: number;
  [key: string]: unknown;
}

export interface Project {
  id: string;
  character_id: number;
  user_id: number;
  title: string;
  description: string;
  due_date: Date | null;
  salt: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
  is_finished: boolean;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
  [key: string]: unknown;
}

export interface ProjectAttachment {
  id: number;
  project_id: string;
  url: string;
  created_at: Date;
  updated_at: Date;
  [key: string]: unknown;
}

export interface Task {
  id: number;
  project_id: string;
  user_id: number;
  assignee_id: number;
  title: string;
  description: string;
  exp: number;
  due_date: Date;
  status: 'draft' | 'on_progress' | 'completed';
  created_at: Date;
  updated_at: Date;
  [key: string]: unknown;
}

export interface TaskAttachment {
  id: number;
  task_id: number;
  url: string;
  created_at: Date;
  updated_at: Date;
  [key: string]: unknown;
}

export interface ProjectUser {
  project_id: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  [key: string]: unknown;
}

export enum ProjectDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export enum TaskStatus {
  Draft = 'draft',
  OnProgress = 'on_progress',
  Completed = 'completed'
}
