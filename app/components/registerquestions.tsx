"use client";

import React from 'react'
import { useState } from 'react'
import { FormData } from '@/types/types'
import { questions } from '@/data/RegisterQuestions'
import { Question } from '@/types/types'
import { CHECK_EMAIL_EXISTS } from '@/graphql/queries/emailQueries';
import { gql, useQuery } from '@apollo/client';



const SignUp: React.FC = () => {
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    password: '',
    genres: [],
    describeYourself: [],
    lookingFor: [],
    bio: '',
    website: '',
    location: '',
  });

  const handleNext = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (currentQuestion === 0) {
      const { data, loading, error } = await useQuery({
        query: CHECK_EMAIL_EXISTS,
        variables: { email: formData.email },
      });

      if (loading) return; // Handle loading state
      if (error) return; // Handle error state
      if (data.emailExists) {
        alert('An account with this email already exists.');
        return;
      }
    }
    setCurrentQuestion(prevState => prevState + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionSelect = (field: keyof FormData, option: string) => {
    setFormData((prevState) => {
      const currentValues = prevState[field];
      if (Array.isArray(currentValues)) {
        return {
          ...prevState,
          [field]: currentValues.includes(option)
            ? currentValues.filter((item) => item !== option)
            : [...currentValues, option],
        };
      }
      return prevState; 
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    
  };

  const renderQuestion = (question: Question) => {
    switch (question.inputType) {
      case 'text':
      case 'email':
      case 'password':
        return (
          
          
          <input
            className='bg-transparent p-3 focus-within:outline-none text-[40px] '
            type={question.inputType}
            name={question.field}
            value={formData[question.field].toString()}
            onChange={handleChange}
            placeholder={question.placeholder}
          />
        );
      case 'button':
        return (
          <div className='w-[50vh] h-40 flex-wrap space-x-2 space-y-2'>
            {question.options?.map((option) => (

              <button
                key={option}
                type="button"
                onClick={() => handleOptionSelect(question.field, option)}
                className={`${
                  formData[question.field].includes(option) ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                } transition-colors duration-300 ease-in-out hover:bg-gray-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                {option}
              </button>
          ))}
            </div>
        );
      default:
        return null;
    }
  };


  const currentQ = questions[currentQuestion];

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-8'>

      <h2 className='flex flex-row justify-start w-[40vw] text-2xl font-semibold'>{currentQ.question}</h2>
      <div className='flex items-center space-x-4'>
        
        {renderQuestion(currentQ)}
       
      {currentQuestion < questions.length - 1 ? (
        <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded z-10 ' type="button" onClick={handleNext}>Next</button>
        ) : (
          <button type="submit">Submit</button> 
          )}
          </div>
    </form>
  );
};

export default SignUp;