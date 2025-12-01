export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface Project {
  title: string;
  subtitle?: string;
  period: string;
  description: string;
  tags: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  date: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
  achievements: Achievement[];
  certifications: Certification[];
  leetcode:string;
  hackerrank:string;
}