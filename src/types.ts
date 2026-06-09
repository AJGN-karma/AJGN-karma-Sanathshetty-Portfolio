export interface Education {
  id: string;
  period: string;
  degree: string;
  institution: string;
  extra: string;
}

export interface Skill {
  name: string;
  level: number;
  category: "cybersecurity" | "languages" | "web-backend" | "database-tools" | "other";
  emoji?: string;
  theme?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "cybersecurity" | "web" | "all" | string;
  tags: string[];
  icon: string;
  learnings: string[];
  stars: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  icon: string;
  credentialId: string;
  skillsVerified: string[];
  imageUrl?: string;
  fileUrl?: string;
}

export interface Achievement {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface ProfileConfig {
  student_name: string;
  title: string;
  hero_subtitle: string;
  about_text: string;
  contact_email: string;
  github: string;
  linkedin: string;
  instagram: string;
  avatar_emoji: string;
  academic_year: string;
  profile_image_url?: string;
  
  // Customization Options
  accentColor: "cyan" | "emerald" | "pink" | "indigo" | "amber";
  themeMode: "cyber" | "terminal";
  
  // Array types
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  education: Education[];
}
