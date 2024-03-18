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


export interface User {
  email: string;
  name: string;
  password: string;
  genres: string[];
  describeYourself: string[];
  lookingFor: string[];
  bio: string;
  website: string;
  location: string;
}
