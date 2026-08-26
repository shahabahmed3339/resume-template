import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const resume = {
  name: 'Shahab Ahmed',
  title: 'Software Engineer',
  phone: '+92 315 1586289',
  email: 'shahabahmed3339@gmail.com',
  linkedin: 'linkedin.com/in/its-shahab-ahmed',
  linkedinUrl: 'https://linkedin.com/in/its-shahab-ahmed',
  github: 'github.com/shahabahmed3339',
  githubUrl: 'https://github.com/shahabahmed3339',
  location: 'Lahore, Pakistan',
  summary:
    'Software Engineer with 5+ years of experience specializing in Angular and full-stack development using the MEAN/MERN stack. Experienced in healthcare systems, ERP platforms, and compliance applications, delivering scalable, maintainable, and user-focused solutions. Strong in Angular, React, Node.js, Python (Flask & Django), databases, modular architecture, API integration, and production support.',
  experience: [
    { role: 'Senior Software Engineer', company: 'Binary Tech', context: 'DocNow EHR · Healthcare Software Support & Maintenance', dates: 'Mar 2024 – Feb 2026', location: 'Lahore, Pakistan', bullets: ['Developed a medical software system using the MEAN stack.', 'Standardized modules to improve efficiency and readability.', 'Completed sprint tasks within assigned timelines and provided real-time customer issue support.'] },
    { role: 'Associate Software Engineer', company: 'Logic Powered Solutions', context: 'Software & IT Solutions', dates: 'Dec 2021 – Mar 2024', location: 'Islamabad, Pakistan', bullets: ['Built and maintained scalable systems using the MEAN stack.', 'Developed a multi-module ERP covering HR, Accounts, Finance, Ledgers, and related workflows.', 'Developed Power BI solutions, troubleshot defects, and supported production environments.'] },
    { role: 'Junior Full Stack Developer', company: 'Quality Compliance 360', context: 'ISO Quality Compliance', dates: 'Feb 2021 – Dec 2021', location: 'Islamabad, Pakistan', bullets: ['Developed a MERN web application for ISO-compliant risk assessments.', 'Developed a scalable HR management and recruitment system.', 'Built a real-time attendance system in Django using machine learning.'] }
  ],
  education: [
    { degree: 'Master of Science in Computer Science', school: 'HITEC University', dates: 'Sep 2020 – Jan 2023', location: 'Taxila, Pakistan', cgpa: '3.80 / 4.00', thesis: 'Human Action Recognition: A Fused Framework of Pre-trained DarkNet-19 and SqueezeNet Deep Models' },
    { degree: 'Bachelor of Science in Computer Engineering', school: 'HITEC University', dates: 'Sep 2016 – Jul 2020', location: 'Taxila, Pakistan', cgpa: '3.62 / 4.00', thesis: 'Implementation of Correlation Filters on DSP Processor for Real-time Applications' }
  ],
  projects: [
    ['Flash Deal API', 'Python, Django, React.js', 'Production-ready stock reservation system designed to prevent overselling during high-concurrency flash sales.'],
    ['Simula React SDK', 'JavaScript, React.js', 'Production-ready Native Ad SDK for React / Next.js applications.'],
    ['Simula Flutter SDK', 'Dart, Flutter', 'Production-ready Native Ad SDK for Flutter applications.'],
    ['Risk Management', 'React, Express, MongoDB', 'React frontend with Express/MongoDB backend for lightweight risk management.'],
    ['KBL RMS', 'React, Express, MongoDB', 'Lightweight Risk Management System with React client and Express/MongoDB server.'],
    ['AMS — Automated Monitoring System', 'Python, Deep Learning, Django', 'Face detection and recognition system using Python, deep learning models, and Django.']
  ],
  skills: [
    ['Frontend', 'Angular, React.js, Next.js, Nest.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Bootstrap CSS'],
    ['Backend', 'Node.js, Python, Flask, Django'],
    ['Data', 'MongoDB, PostgreSQL, MySQL'],
    ['Tools', 'Git, Power BI'],
    ['Stacks', 'MEAN, MERN']
  ],
  strengths: 'Teamwork, Problem Solving, Customer Support, Critical Thinking',
  languages: 'English — Professional · Urdu — Native · Punjabi — Native'
};

const External = ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>;

function Section({ title, children }) {
  return <section className="section"><h2>{title}</h2>{children}</section>;
}

function Entry({ item }) {
  return <article className="entry">
    <div className="entry-head">
      <div><div className="entry-title">{item.role}</div><div className="entry-company">{item.company}{item.context ? <> · {item.context}</> : null}</div></div>
      <div className="entry-meta"><strong>{item.dates}</strong><em>{item.location}</em></div>
    </div>
    <ul>{item.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
  </article>;
}

function Education({ item }) {
  return <article className="education-entry">
    <div className="entry-head">
      <div><div className="entry-title">{item.degree}</div><div className="entry-company">{item.school}</div></div>
      <div className="entry-meta"><strong>{item.dates}</strong><em>{item.location}</em></div>
    </div>
    <div className="detail"><b>CGPA:</b> {item.cgpa}</div>
    <div className="detail"><b>Thesis:</b> {item.thesis}</div>
  </article>;
}

function App() {
  return <main className="page">
    <header className="header">
      <h1>{resume.name.toUpperCase()}</h1>
      <div className="title">{resume.title}</div>
      <div className="contact-row">
        <span>{resume.phone}</span><span>·</span>
        <External href={`mailto:${resume.email}`}>{resume.email}</External><span>·</span>
        <External href={resume.linkedinUrl}>{resume.linkedin}</External><span>·</span>
        <External href={resume.githubUrl}>{resume.github}</External>
      </div>
    </header>

    <Section title="PROFESSIONAL SUMMARY"><p className="summary">{resume.summary}</p></Section>

    <Section title="PROFESSIONAL EXPERIENCE">{resume.experience.map((x, i) => <Entry key={i} item={x} />)}</Section>

    <Section title="EDUCATION">{resume.education.map((x, i) => <Education key={i} item={x} />)}</Section>

    <Section title="PROJECTS"><div className="projects">{resume.projects.map(([name, stack, desc], i) => <article className="project" key={i}><div><b>{name}</b> <span>— {stack}</span></div><p>{desc}</p></article>)}</div></Section>

    <Section title="SKILLS & EXPERTISE"><div className="skill-list">{resume.skills.map(([label, value]) => <div className="skill-row" key={label}><b>{label}:</b><span>{value}</span></div>)}</div></Section>

    <Section title="STRENGTHS & LANGUAGES"><div className="final-row"><p><b>Strengths:</b> {resume.strengths}</p><p><b>Languages:</b> {resume.languages}</p></div></Section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
