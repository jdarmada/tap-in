"use client";

import React from 'react'
import { useState } from 'react'
import { FormData } from '@/types/types'
import { questions } from '@/data/RegisterQuestions'
import { Question } from '@/types/types'

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

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
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
      return prevState;  // For non-array fields, do nothing (or handle as needed)
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Submit formData to backend or next step
  };

  const renderQuestion = (question: Question) => {
    switch (question.inputType) {
      case 'text':
      case 'email':
      case 'password':
        return (
          
          
          <input
            className='fixed translate-x-[10vw] translate-y-[25vh] bg-transparent p-3 focus-within:outline-none text-[40px] '
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
    <form onSubmit={handleSubmit}>
      <h2 className='fixed translate-y-40 translate-x-20'>{currentQ.question}</h2>
        
        {renderQuestion(currentQ)}
       
      {currentQuestion < questions.length - 1 ? (
        <button className='fixed translate-x-[75vw] translate-y-[28vh] bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded z-10 ' type="button" onClick={handleNext}>Next</button>
      ) : (
        <button type="submit">Submit</button> 
      )}
    </form>
  );
};

export default SignUp;