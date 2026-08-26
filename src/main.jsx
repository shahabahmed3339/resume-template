import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const resume = {
  name: 'Shahab Ahmed',
  title: 'Software Engineer',
  headline: 'Full-Stack Development · Angular · React · Node.js',
  phone: '+92 315 1586289',
  email: 'shahabahmed3339@gmail.com',
  github: 'github.com/shahabahmed3339',
  githubUrl: 'https://github.com/shahabahmed3339',
  linkedin: 'linkedin.com/in/its-shahab-ahmed',
  linkedinUrl: 'https://linkedin.com/in/its-shahab-ahmed',
  location: 'Lahore, Pakistan',
  summary:
    'Software Engineer with 5+ years of experience specializing in Angular and full-stack development using the MEAN/MERN stack. Experienced in healthcare systems, ERP platforms, and compliance applications, delivering scalable, maintainable, and user-focused solutions. Strong in Angular, React, Node.js, Python (Flask & Django), databases, modular architecture, API integration, and production support.',
  experience: [
    {
      role: 'Senior Software Engineer', company: 'Binary Tech', context: 'DocNow EHR · Healthcare Software Support & Maintenance', dates: 'Mar 2024 – Feb 2026', location: 'Lahore, Pakistan',
      bullets: [
        'Developed a medical software system using the MEAN stack.',
        'Standardized modules to improve efficiency and readability.',
        'Completed sprint tasks within assigned timelines and provided real-time customer issue support.'
      ]
    },
    {
      role: 'Associate Software Engineer', company: 'Logic Powered Solutions', context: 'Software & IT Solutions', dates: 'Dec 2021 – Mar 2024', location: 'Islamabad, Pakistan',
      bullets: [
        'Built and maintained scalable systems using the MEAN stack.',
        'Developed a multi-module ERP covering HR, Accounts, Finance, Ledgers, and related workflows.',
        'Developed Power BI solutions, troubleshot defects, and supported production environments.'
      ]
    },
    {
      role: 'Junior Full Stack Developer', company: 'Quality Compliance 360', context: 'ISO Quality Compliance', dates: 'Feb 2021 – Dec 2021', location: 'Islamabad, Pakistan',
      bullets: [
        'Developed a MERN web application for ISO-compliant risk assessments.',
        'Developed a scalable HR management and recruitment system.',
        'Built a real-time attendance system in Django using machine learning.'
      ]
    }
  ],
  education: [
    { degree: 'Master of Science in Computer Science', school: 'HITEC University', dates: 'Sep 2020 – Jan 2023', cgpa: '3.80 / 4.00', thesis: 'Human Action Recognition: A Fused Framework of Pre-trained DarkNet-19 and SqueezeNet Deep Models' },
    { degree: 'Bachelor of Science in Computer Engineering', school: 'HITEC University', dates: 'Sep 2016 – Jul 2020', cgpa: '3.62 / 4.00', thesis: 'Implementation of Correlation Filters on DSP Processor for Real-time Applications' }
  ],
  projects: [
    ['Flash Deal API', 'Production-ready stock reservation system designed to prevent overselling during high-concurrency flash sales.'],
    ['Simula React SDK', 'Production-ready Native Ad SDK for React / Next.js applications.'],
    ['Simula Flutter SDK', 'Production-ready Native Ad SDK for Flutter applications.'],
    ['Risk Management', 'React frontend with Express/MongoDB backend for lightweight risk management.'],
    ['KBL RMS', 'Lightweight Risk Management System with React client and Express/MongoDB server.'],
    ['AMS — Automated Monitoring System', 'Face detection and recognition system using Python, deep learning models, and Django.']
  ],
  skills: {
    Frontend: 'Angular, React.js, Next.js, Nest.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Bootstrap CSS',
    Backend: 'Node.js, Python, Flask, Django',
    Data: 'MongoDB, PostgreSQL, MySQL',
    Tools: 'Git, Power BI',
    Stacks: 'MEAN, MERN'
  },
  strengths: 'Teamwork, Problem Solving, Customer Support, Critical Thinking',
  languages: 'English — Professional · Urdu — Native · Punjabi — Native'
};

const Icon = ({ type }) => {
  const common = { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    pin: <><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2.3"/></>,
    phone: <path d="M6.5 3.5 9.2 5l-1.4 3.1a14.5 14.5 0 0 0 8.1 8.1l3.1-1.4 1.5 2.7-2 2c-1 .9-2.7.9-4.7.1A18.4 18.4 0 0 1 4.4 8.2c-.8-2-.8-3.7.1-4.7l2-2Z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    github: <><path d="M9 19c-4.5 1.2-5-2-5-2-.8-2-2-2-2-2"/><path d="M6 15c-.2-1 .1-2 1-2.5-2-.2-4-1-4-4.3 0-1 .4-1.8 1-2.5-.1-.2-.5-1.2.1-2.5 0 0 .8-.3 2.5 1a8.5 8.5 0 0 1 4.6 0c1.7-1.3 2.5-1 2.5-1 .6 1.3.2 2.3.1 2.5.6.7 1 1.5 1 2.5 0 3.3-2 4.1-4 4.3.6.5 1 1.3 1 2.6V19"/></>,
    linkedin: <><path d="M6 8v10"/><path d="M6 5.2v.1"/><path d="M10 18v-6a3 3 0 0 1 6 0v6"/><path d="M10 12V8"/></>
  };
  return <svg {...common}>{paths[type]}</svg>;
};

function Section({ label, children, className = '' }) {
  return <section className={`section ${className}`}><div className="section-heading"><h2>{label}</h2><span /></div>{children}</section>;
}

function ContactLink({ icon, children, href }) {
  return <a className="contact" href={href}><Icon type={icon}/><span>{children}</span></a>;
}

function Experience({ item }) {
  return <article className="experience">
    <div className="entry-head">
      <div>
        <h3>{item.role}</h3>
        <p className="company"><strong>{item.company}</strong><span>{item.context}</span></p>
      </div>
      <div className="meta"><strong>{item.dates}</strong><span>{item.location}</span></div>
    </div>
    <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
  </article>;
}

function Education({ item }) {
  return <article className="education">
    <div className="entry-head">
      <div><h3>{item.degree}</h3><p className="company"><strong>{item.school}</strong></p></div>
      <div className="meta"><strong>{item.dates}</strong><span>CGPA {item.cgpa}</span></div>
    </div>
    <p className="thesis"><b>Thesis:</b> {item.thesis}</p>
  </article>;
}

function App() {
  return <main className="page">
    <header className="header">
      <div className="name-block">
        <p className="kicker">SOFTWARE ENGINEER</p>
        <h1>{resume.name}</h1>
        <p className="headline">{resume.headline}</p>
      </div>
      <div className="contact-block">
        <ContactLink icon="pin" href="#">{resume.location}</ContactLink>
        <ContactLink icon="phone" href={`tel:${resume.phone.replace(/\s/g, '')}`}>{resume.phone}</ContactLink>
        <ContactLink icon="mail" href={`mailto:${resume.email}`}>{resume.email}</ContactLink>
        <ContactLink icon="github" href={resume.githubUrl}>{resume.github}</ContactLink>
        <ContactLink icon="linkedin" href={resume.linkedinUrl}>{resume.linkedin}</ContactLink>
      </div>
    </header>

    <Section label="Profile">
      <p className="summary">{resume.summary}</p>
    </Section>

    <Section label="Professional Experience">
      <div className="experience-list">{resume.experience.map((item) => <Experience item={item} key={item.company}/>)}</div>
    </Section>

    <Section label="Education">
      <div className="education-list">{resume.education.map((item) => <Education item={item} key={item.degree}/>)}</div>
    </Section>

    <Section label="Selected Projects">
      <div className="project-list">{resume.projects.map(([name, description]) => <article className="project" key={name}><h3>{name}</h3><p>{description}</p></article>)}</div>
    </Section>

    <Section label="Technical Skills & Additional Information" className="last-section">
      <div className="skills">
        {Object.entries(resume.skills).map(([label, value]) => <p key={label}><b>{label}:</b> {value}</p>)}
        <p><b>Strengths:</b> {resume.strengths}</p>
        <p><b>Languages:</b> {resume.languages}</p>
      </div>
    </Section>

    <footer>Shahab Ahmed · Software Engineer</footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
