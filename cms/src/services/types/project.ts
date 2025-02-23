export interface Project {
  id: string;
  title: string;
  description: string;
  organization_id: string;
  status: "active" | "completed" | "planned";
  start_date: string;
  end_date?: string;
  volunteers_needed: number;
  current_volunteers: number;
  skills_required: string[];
}

export interface ProjectInput {
  title: string;
  description: string;
  organization_id: string;
  status: "active" | "completed" | "planned";
  start_date: string;
  end_date?: string;
  volunteers_needed: number;
  current_volunteers?: number;
  skills_required: string[];
}
