export type Article = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageId: string;
};

export const articles: Article[] = [
  {
    id: '1',
    title: 'Nmap for Beginners: A Gotham Scan',
    description: 'Learn how to use Nmap to scan your network, like a detective in the dark. Find open ports like secrets in the shadows.',
    category: 'Network Security',
    imageId: '1'
  },
  {
    id: '2',
    title: 'Cracking Passwords with John the Ripper',
    description: 'Unmask the secrets of password cracking. We\'ll explore how John the Ripper can test password strength.',
    category: 'Cryptography',
    imageId: '2'
  },
  {
    id: '3',
    title: 'Web Security: Avoiding the Joker\'s XSS',
    description: 'Protect your web applications from Cross-Site Scripting (XSS) attacks. Don\'t let the Joker get the last laugh.',
    category: 'Web Security',
    imageId: '3'
  },
  {
    id: '4',
    title: 'Intro to Metasploit: A Hacker\'s Utility Belt',
    description: 'A beginner\'s guide to the Metasploit Framework, the most versatile tool for delivering payloads.',
    category: 'Exploitation',
    imageId: '4'
  },
  {
    id: '5',
    title: 'Wi-Fi Hacking with Aircrack-ng',
    description: 'Listen to the whispers of network packets. Learn the basics of wireless network security testing.',
    category: 'Wireless Security',
    imageId: '5'
  },
  {
    id: '6',
    title: 'Social Engineering: The Riddler\'s Mind Games',
    description: 'Understand the art of manipulation and how to protect yourself from social engineering tactics.',
    category: 'Human Factor',
    imageId: '6'
  }
];

export type Challenge = {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  hint: string;
};

export const challenges: Challenge[] = [
  {
    id: '1',
    title: 'The Riddler\'s Message',
    difficulty: 'Easy',
    description: 'The Riddler left a cryptic message: "SGF2ZSB5b3UgdHJpZWQgdXNpbmcgYSBCYXNlNjQgZGVjb2Rlcj8=". Can you decode it to find his next target?',
    hint: 'This type of encoding is very common. The padding character at the end is a big giveaway.'
  },
  {
    id: '2',
    title: 'Secure the GCPD Mainframe',
    difficulty: 'Medium',
    description: 'The GCPD\'s mainframe login is vulnerable to SQL injection. The login page is at `/login` and it takes `username` and `password` as POST parameters. Can you bypass the login? The flag is on the dashboard.',
    hint: 'Try classic SQL injection payloads like `\' OR \'1\'=\'1\' -- ` in the username or password field.'
  },
  {
    id: '3',
    title: 'Reverse the Bat-Signal',
    difficulty: 'Hard',
    description: 'A rogue signal is interfering with the Bat-Signal. It is controlled by a small binary file that asks for a password. Reverse engineer the binary to find the correct password and shut it down.',
    hint: 'Use a disassembler like Ghidra or IDA Free to analyze the binary. Look for string comparisons near the password input function.'
  }
];

export type ForumPost = {
  id: string;
  topic: string;
  author: string;
  replies: number;
  lastPost: string;
};

export const forumPosts: ForumPost[] = [
  {
    id: '1',
    topic: 'What\'s the best OS for a beginner vigilante?',
    author: 'NoobMaster69',
    replies: 42,
    lastPost: '2 minutes ago'
  },
  {
    id: '2',
    topic: 'I\'m stuck on the "Riddler\'s Message" challenge',
    author: 'BoyWonder',
    replies: 5,
    lastPost: '1 hour ago'
  },
  {
    id: '3',
    topic: 'How does HTTPS actually work?',
    author: 'ProtoBat',
    replies: 12,
    lastPost: '3 hours ago'
  },
  {
    id: '4',
    topic: 'Recommended books for learning web security?',
    author: 'AlfredP',
    replies: 23,
    lastPost: '1 day ago'
  }
];
