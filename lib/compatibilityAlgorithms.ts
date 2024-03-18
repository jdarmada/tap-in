interface User {
  id: string;
  genres: string[];
  lookingFor: string[];
  describeYourself: string[];
 
}


export function calculateCompatibility(userA: User, userB: User): number {
  const sharedGenresScore = calculateSharedGenresScore(userA.genres, userB.genres);
  const lookingForDescribeYourselfScore = calculateLookingForDescribeYourselfScore(userA.lookingFor, userB.describeYourself);
  const compatibilityScore = (sharedGenresScore + lookingForDescribeYourselfScore) / 2;
  return compatibilityScore;
}

function calculateSharedGenresScore(genresA: string[], genresB: string[]): number {
  const sharedGenres = genresA.filter(genre => genresB.includes(genre));
  const maxPossibleSharedGenres = Math.max(genresA.length, genresB.length);
  return (sharedGenres.length / maxPossibleSharedGenres) * 100; 
}

function calculateLookingForDescribeYourselfScore(lookingForA: string[], describeYourselfB: string[]): number {
  const matches = lookingForA.filter(item => describeYourselfB.includes(item));
  const maxPossibleMatches = Math.max(lookingForA.length, describeYourselfB.length);
  return (matches.length / maxPossibleMatches) * 100; 
}
