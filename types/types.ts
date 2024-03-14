export interface FormData {
  email: string;
  name: string;
  password: string;
  describeYourself: string[];
  genres: string[];
  lookingFor: string[];
  bio: string;
  website: string;
  location: string;
}

export interface Question {
  id: string;
  field: keyof FormData;
  question: string;
  inputType: string;
  placeholder?: string;  
  options?: string[];    
}