export interface Organization {
  id: string;
  name: string;
  type: "ngo" | "association";
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

export interface OrganizationInput {
  name: string;
  type: "ngo" | "association";
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
}
