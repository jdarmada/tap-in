"use client"
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";


const USER = gql`
  query AllUsers {
    allUsers {
      id
      email
      name
    }
  }
`;

const Welcome = () => {
  const { data, loading, error } = useQuery(USER);
  if (loading) return <p>Loading...</p>;
  if (error) console.error("GraphQL Query Error:", error);
  console.log('Data',data);
  return (
    <div>USERS</div>
  )
}


export default Welcome;