export interface Lesson {
  id: string;
  title: string;
  description: string;
  topics: string[];
  level?: 'beginner' | 'intermediate' | 'advanced';
  resources?: string[];
}

export interface Bootcamp {
  id: string;
  name: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  image?: string;
}

export const bootcamps: Bootcamp[] = [
  {
    id: 'react',
    name: 'React JS Bootcamp',
    description: 'Become job-ready React developer with complete frontend skills for interviews.',
    duration: '8 weeks',
    image: '/vite.svg',
    lessons: [
      {
        id: 'intro',
        title: 'React Fundamentals',
        description: 'Core concepts to get started with React.',
        level: 'beginner',
        topics: ['JSX', 'Components', 'Props', 'State'],
      },
      {
        id: 'hooks',
        title: 'Advanced Hooks',
        description: 'Master useState, useEffect, custom hooks.',
        level: 'intermediate',
        topics: ['useEffect', 'useContext', 'useReducer', 'Custom Hooks'],
      },
      {
        id: 'context',
        title: 'Context & Reducer',
        description: 'Global state management without Redux.',
        level: 'intermediate',
        topics: ['Context API', 'useReducer'],
      },
      {
        id: 'router',
        title: 'React Router',
        description: 'Build SPAs with routing.',
        level: 'intermediate',
        topics: ['Routes', 'Links', 'Protected Routes'],
      },
      {
        id: 'perf',
        title: 'Performance & Optimization',
        description: 'Optimize React apps for production.',
        level: 'advanced',
        topics: ['memo', 'useCallback', 'useMemo', 'Lazy Loading', 'Code Splitting'],
      },
      {
        id: 'forms',
        title: 'Forms & Validation',
        description: 'Handle forms professionally.',
        level: 'intermediate',
        topics: ['Controlled Components', 'react-hook-form', 'Validation'],
      },
      {
        id: 'testing',
        title: 'Testing React',
        description: 'Unit & integration tests.',
        level: 'advanced',
        topics: ['Jest', 'React Testing Library'],
      },
      {
        id: 'deploy',
        title: 'Deployment & CI/CD',
        description: 'Deploy to Vercel/Netlify.',
        level: 'advanced',
        topics: ['Vite Build', 'Env Vars', 'Vercel'],
      },
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript Bootcamp',
    description: 'Master modern JavaScript for interviews and job readiness.',
    duration: '6 weeks',
    image: '/vite.svg',
    lessons: [
      {
        id: 'basics',
        title: 'ES6+ Fundamentals',
        description: 'Modern JS essentials.',
        level: 'beginner',
        topics: ['let/const', 'Arrow Functions', 'Destructuring', 'Spread/Rest'],
      },
      {
        id: 'async',
        title: 'Async JavaScript',
        description: 'Promises and async/await.',
        level: 'intermediate',
        topics: ['Promises', 'async/await', 'fetch API'],
      },
      {
        id: 'dom',
        title: 'DOM Manipulation',
        description: 'Dynamic web pages.',
        level: 'beginner',
        topics: ['querySelector', 'Events', 'Event Delegation'],
      },
      {
        id: 'closure',
        title: 'Closures & Scope',
        description: 'Key interview topics.',
        level: 'intermediate',
        topics: ['Closures', 'Scope', 'this keyword'],
      },
      {
        id: 'oop',
        title: 'OOP in JS',
        description: 'Classes and prototypes.',
        level: 'intermediate',
        topics: ['Classes', 'Inheritance', 'Prototypes'],
      },
      {
        id: 'modules',
        title: 'Modules & Bundlers',
        description: 'ES Modules, Vite/Webpack.',
        level: 'advanced',
        topics: ['import/export', 'Bundlers'],
      },
    ],
  },
  // Easy to add more: e.g. { id: 'nextjs', ... }
];

