"use client";
import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { calculateCompatibility } from '@/lib/compatibilityAlgorithms'
import { gql, useQuery } from '@apollo/client'


interface User {
  id: string;
  name: string;
  genres: string[];
  describeYourself: string[];
  lookingFor: string[];
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
    }
  }
`;

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const { data, loading, error } = useQuery<{ allUsers: User[] }>(GET_ALL_USERS_QUERY);

  useEffect(() => {
    // This effect is only responsible for setting the current user from local storage
    const storedUserData = localStorage.getItem('currentUser');
    if (storedUserData) {
      const userData: User = JSON.parse(storedUserData);
      setCurrentUser(userData);
    }
  }, []); // Empty dependency array means this effect only runs once on mount
  
  useEffect(() => {
    // This effect is responsible for calculating matches when currentUser and data are available
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
  }, [currentUser, data]); // This effect depends on currentUser and data
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users: {error.message}</div>;

  return (
    <div>
      <h1>Matches</h1>
      <ul>
        {matches.map(match => (
          <li key={match.user.id}>
            {match.user.name} - Compatibility: {match.score}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Matches;