
"use client";
import React from 'react'
import { ApolloProvider } from "@apollo/client";
import SignUp from '../components/registerquestions';
import apolloClient from '@/utils/apollo-client';

const Register: React.FC = () => {
  return (
    <div className='flex flex-col justify-center h-[60vh] '>
      <ApolloProvider client={apolloClient} >

        <SignUp />
      </ApolloProvider>
    </div>
  )


 
}

export default Register
