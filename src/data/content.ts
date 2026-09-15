export const heroHighlights = {
  left: ['Python', 'FastAPI', 'React.js', 'JavaScript', 'nodeJS'],
  right: ['C# / .NET', 'SQL Server', 'MongoDB', 'TypeScript','Tailwind CSS'],
}

export const skillsRow1 = [
  'Python', 'C#', 'HTML', 'CSS', 'JavaScript', 'TypeScript',
  'React.js', 'FastAPI', 'ASP.NET Web Forms', '.NET Framework',
  'HTML5', 'CSS3', 'jQuery', 'Tailwind CSS', 'Responsive Web Design','Data Structures & Algorithms', 'Agile / Sprints',
  'Multi-Tenancy SaaS Architecture',
]

export const skillsRow2 = [
  'REST API Design & Integration', 'Async / Await Programming', 'Web Services',
  'Backend Development', 'Clean & Maintainable Code',
  'SQL Server', 'MongoDB', 'Cloud Databases (MongoDB Atlas)', 'SQL', 'DBMS',
  'SQL Joins', 'Stored Procedures', 'CRUD Operations', 'Database Management',
  'Git & GitHub', 'Postman', 'VS Code', 'CI-friendly Workflows',
  'Debugging', 
]

export interface Project {
  title: string
  description: string
  stack: string
  demoLink?: string
  repoLink?: string
}

export const projects: Project[] = [
  {
    title: 'NameNest — Brand Name Availability Scanner',
    description:
      'Full-stack app checking brand/name availability across domains, GitHub, social platforms, and USPTO in a single query. FastAPI + MongoDB Atlas backend with caching, React/Tailwind frontend, and a name-suggestion engine that scores alternatives by real-time availability.',
    stack: 'Python · FastAPI · MongoDB · React · Tailwind CSS',
    demoLink: 'https://namenest-ilib.onrender.com/',
    repoLink: 'https://github.com/Ayman10714/NameNest',
  },
  {
    title: 'Jarvis REST API',
    description:
      'Voice assistant exposing commands and responses via a REST API, with endpoints for natural-language input and structured JSON output.',
    stack: 'Python · REST APIs · Voice Recognition',
    repoLink: 'https://github.com/Ayman10714/Jarvis-REST-API',
  },
  {
    title: 'AI Chat Reply Box',
    description:
      'Web-based chat tool that sends user messages to an AI API and streams responses back in real time, with a Python backend and a lightweight JS front end.',
    stack: 'Python · AI/OpenAI API · HTML · CSS · JavaScript',
    repoLink: 'https://github.com/Ayman10714',
  },
  {
    title: 'Banking / Account Management System',
    description:
      'Banking simulation supporting account creation, deposits, withdrawals, and real-time balance tracking, backed by SQL joins and stored procedures.',
    stack: 'ASP.NET · C# · SQL Server',
    repoLink: 'https://github.com/Ayman10714',
  },
  {
    title: 'Interest Automation System',
    description:
      'Automates interest calculations across accounts with server-side C# logic, cutting down manual entry and calculation errors.',
    stack: 'ASP.NET · C# · SQL Server',
    repoLink: 'https://github.com/Ayman10714',
  },
  {
    title: 'Dynamic Data Website',
    description:
      'Data-driven pages with server-side rendering, date/month filtering, and ViewState-based page state management.',
    stack: 'ASP.NET · SQL Server',
    repoLink: 'https://github.com/Ayman10714',
  },
]

export const contactLinks = [
  { label: 'Email', href: 'mailto:ansariaymaman38@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/Ayman10714' },
  { label: 'Phone', href: 'tel:+919557064455' },
]