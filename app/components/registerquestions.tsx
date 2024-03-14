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
            className='fixed w-[70vw] translate-x-[20vw] translate-y-[25vh] bg-transparent p-3 focus-within:outline-none text-[40px] '
            type={question.inputType}
            name={question.field}
            value={formData[question.field].toString()}
            onChange={handleChange}
            placeholder={question.placeholder}
          />
        );
      case 'button':
        return (
          question.options?.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleOptionSelect(question.field, option)}
              className={formData[question.field].includes(option) ? 'selected' : ''}
            >
              {option}
            </button>
          ))
        );
      default:
        return null;
    }
  };


  const currentQ = questions[currentQuestion];

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='fixed text-2xl translate-x-20 translate-y-60 '>{currentQ.question}</h2>
      {renderQuestion(currentQ)}
      {currentQuestion < questions.length - 1 ? (
        <button type="button" onClick={handleNext}>Next</button>
      ) : (
        <button type="submit">Submit</button> 
      )}
    </form>
  );
};

export default SignUp;