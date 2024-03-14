import { Question } from "@/types/types";

export const questions: Question[] = [
  {
    id: 'email',
    field: 'email',
    question: 'What is your email?',
    inputType: 'email',
    placeholder: 'you@example.com',
  },
  {
    id: 'name',
    field: 'name',
    question: 'What is your name?',
    inputType: 'text',
    placeholder: 'Your full name',
  },
  {
    id: 'password',
    field: 'password',
    question: 'Create a password',
    inputType: 'password',
    placeholder: 'Your secure password',
  },
  {
    id: 'describeYourself',
    field: 'describeYourself',
    question: 'How would you describe yourself?',
    inputType: 'button',  
    options: ['Sound Engineer', 'Rapper', 'Singer', 'Producer', 'Guitarist', 'Drummer', 'Bassist', 'Pianist', 'Song-Writer', 'Studio']
  },
  {
    id: 'genres',
    field: 'genres',
    question: 'What are your favorite music genres?',
    inputType: 'button',  
    options: ['Jazz', 'Rock', 'Classical', 'Pop', 'Electronic', 'Hip Hop', 'Folk', 'Blues', 'Country', 'Reggae', 'Metal', 'Punk', 'R&B', 'Latin', 'World', 'Other']
  },
  {
    id: 'lookingFor',
    field: 'lookingFor',
    question: 'What are you looking for in this community?',
    inputType: 'button', 
    options: ['Sound Engineer', 'Rapper', 'Singer', 'Producer', 'Guitarist', 'Drummer', 'Bassist', 'Pianist', 'Song-Writer', 'Studio'], 
  },
  {
    id: 'bio',
    field: 'bio',
    question: 'Tell us about yourself',
    inputType: 'textarea',
    placeholder: 'Your bio',
  },
  {
    id: 'website',
    field: 'website',
    question: 'Do you have a website or portfolio?',
    inputType: 'url',
    placeholder: 'https://yourwebsite.com',
  },
  {
    id: 'location',
    field: 'location',
    question: 'Where are you based?',
    inputType: 'text',
    placeholder: 'Your city or region',
  },
];
