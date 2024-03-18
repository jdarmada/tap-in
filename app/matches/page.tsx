"use client";
import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { calculateCompatibility } from '@/lib/compatibilityAlgorithms'
import { gql, useQuery } from '@apollo/client'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


interface User {
  id: string;
  name: string;
  genres: string[];
  describeYourself: string[];
  lookingFor: string[];
  location: string;
}

interface Match {
  user: User;
  score: number;
}

const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    allUsers {
      id
      name
      genres
      describeYourself
      lookingFor
      location
    }
  }
`;

const Matches: React.FC = () => {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const { data, loading, error } = useQuery<{ allUsers: User[] }>(GET_ALL_USERS_QUERY);

  useEffect(() => {
    // Get the current user from local storage
    const storedUserData = localStorage.getItem('currentUser');
    if (storedUserData) {
      const userData: User = JSON.parse(storedUserData);
      setCurrentUser(userData);
    }
  }, []); 
  
  useEffect(() => {
    
    if (currentUser && data && data.allUsers) {
      const computedMatches = data.allUsers
        .filter(user => user.id !== currentUser.id)
        .map(user => ({
          user,
          score: calculateCompatibility(currentUser, user),
        }))
        .sort((a, b) => b.score - a.score);
  
      setMatches(computedMatches);
    }
  }, [currentUser, data]); 

  const handleLogOut = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users: {error.message}</div>;

  return (
    <div>

<button onClick={handleLogOut} className='bg-blue-500 text-white p-2 rounded-lg absolute translate-x-[80vw] translate-y-[10vh]'>Log Out</button>
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-3xl font-bold mb-[40px]">Matches by Collaboration Score</h1>
        {matches.map((match, index) => (
          <motion.div
            key={match.user.id}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 w-full max-w-md"
          >
            <div className="group flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
              <div className='text-black'>
                <h2 className="text-xl font-semibold">{match.user.name}</h2>
                <p className=" ">{match.user.location}</p> 
                <div className="hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"> 
                  <p>Genres: {match.user.genres.join(', ')}</p>
                  <p>Looking for: {match.user.lookingFor.join(', ')}</p>
                </div>
              </div>
              <div className="flex items-center">
                <svg className="mr-2 w-10 h-10 text-green-500" viewBox="0 0 36 36">
                  <path
                    className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 0 0 31.831
                      a 15.9155 15.9155 0 0 0 0 -31.831"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="4"
                  />
                  <path
                    className="circle"
                    strokeDasharray={`${match.score}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeLinecap="round"
                    stroke="#4cc790"
                    strokeWidth="4"
                  />
                  <text x="18" y="20.35" className="percentage" fill="#4cc790" fontSize="8" textAnchor="middle">{`${Math.ceil(match.score)}%`}</text>
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
    </div>
  );
};

export default Matches;