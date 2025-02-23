export interface Volunteer {
  id: string;
  name: string;
  email: string;
  location: {
    lat: number;
    lng: number;
  };
  role: 'volunteer' | 'admin';
  created_at: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'ngo' | 'association';
  description: string;
  contact: string;
  website?: string;
  social_media?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  areas_of_activity: string[];
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  organization_id: string;
  status: 'active' | 'completed' | 'planned';
  start_date: string;
  end_date?: string;
  volunteers_needed: number;
  current_volunteers: number;
  skills_required: string[];
}