
export type Challenge = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hint: string;
  link?: string;
};

export const challenges: Challenge[] = [
  {
    id: "1",
    title: "SQL Injection Playground",
    description: "A dummy login form is rumored to be vulnerable to SQL injection. Can you bypass the authentication and find the flag?",
    difficulty: "Easy",
    hint: "Try using a classic tautology-based injection. The database might be old and doesn't sanitize inputs.",
    link: "/challenges/sql-injection"
  },
  {
    id: "2",
    title: "Find the Secret Message",
    description: "There's a hidden message somewhere on the admin panel. Your mission is to find it.",
    difficulty: "Easy",
    hint: "Look for UI elements that might not seem interactive at first glance. Sometimes secrets are hidden in plain sight.",
  },
  {
    id: "3",
    title: "Beginner's Quiz",
    description: "Answer the four questions on the homepage to prove your basic knowledge.",
    difficulty: "Easy",
    hint: "Most answers can be found on the homepage itself. For the flags, think about who the master of Gotham is and the spirit of the holidays.",
  },
];
