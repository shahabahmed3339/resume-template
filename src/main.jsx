import React from "react";
import { createRoot } from "react-dom/client";
import data from "./data.json";
import "./styles.css";

const RESERVED = new Set(["backgroundVideo", "resume"]);

const LABELS = {
  head: null,
  about: "Professional Summary",
  technologies: "Technologies",
  experience: "Professional Experience",
  education: "Education",
  projects: "Selected Projects",
  skills: "Skills & Expertise",
  interests: "Interests",
  languages: "Languages",
};

const ORDER = [
  "about", "experience", "education", "projects",
  "technologies", "skills", "languages", "interests"
];

const has = (v) =>
  v !== undefined && v !== null &&
  !(typeof v === "string" && !v.trim()) &&
  !(Array.isArray(v) && v.length === 0);

const labelize = (key) =>
  key.replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

const dateRange = (item) => {
  const start = item?.start ?? item?.from ?? item?.startDate;
  const end = item?.end ?? item?.to ?? item?.endDate ?? item?.current;
  if (!start && !end) return "";
  return `${start || ""}${start && end ? " – " : ""}${end || ""}`;
};

function Section({ title, children }) {
  if (!has(children)) return null;
  return <section className="section"><h2>{title}</h2>{children}</section>;
}

function Header({ head = {} }) {
  const links = Array.isArray(head.links) ? head.links.filter(x => has(x?.url)) : [];
  return (
    <header className="header">
      {has(head.name) && <h1>{head.name}</h1>}
      {has(head.title) && <div className="headline">{head.title}</div>}
      <div className="contact">
        {has(head.phone) && <a href={`tel:${head.phone}`}>{head.phone}</a>}
        {has(head.email) && <a href={`mailto:${head.email}`}>{head.email}</a>}
        {links.map((x, i) =>
          <a key={i} href={x.url} target="_blank" rel="noreferrer">{x.title || x.url}</a>
        )}
      </div>
    </header>
  );
}

function Summary({ value }) {
  const values = Array.isArray(value) ? value : [value];
  return <Section title="Professional Summary">
    <div className="summary">{values.filter(has).map((x, i) => <p key={i}>{x}</p>)}</div>
  </Section>;
}

function Experience({ value, title }) {
  return <Section title={title}>
    {value.filter(x => x && typeof x === "object").map((job, i) =>
      <article className="entry" key={i}>
        <div className="entryTop">
          <div>
            {has(job.title) && <strong>{job.title}</strong>}
            {has(job.company) && <em>{job.company}</em>}
            {has(job.description) && <span className="muted">{job.description}</span>}
          </div>
          <div className="meta">
            {has(dateRange(job)) && <span>{dateRange(job)}</span>}
            {has(job.location) && <em>{job.location}</em>}
          </div>
        </div>
        {Array.isArray(job.accomplishments) && job.accomplishments.length > 0 &&
          <ul>{job.accomplishments.filter(has).map((x, j) => <li key={j}>{x}</li>)}</ul>}
      </article>
    )}
  </Section>;
}

function Education({ value, title }) {
  return <Section title={title}>
    {value.filter(Boolean).map((edu, i) =>
      <article className="entry" key={i}>
        <div className="entryTop">
          <div>
            {has(edu.title) && <strong>{edu.title}</strong>}
            {has(edu.institute) && <em>{edu.institute}</em>}
          </div>
          <div className="meta">
            {has(dateRange(edu)) && <span>{dateRange(edu)}</span>}
            {has(edu.location) && <em>{edu.location}</em>}
          </div>
        </div>
        {has(edu.cgpa) && <div><b>CGPA:</b> {edu.cgpa}</div>}
        {has(edu.thesis) && <div><b>Thesis:</b> {edu.thesis}</div>}
      </article>
    )}
  </Section>;
}

function Projects({ value, title }) {
  return <Section title={title}>
    {value.filter(Boolean).map((p, i) =>
      <article className="project" key={i}>
        <div className="projectTop">
          <strong>{p.title || `Project ${i + 1}`}</strong>
          {has(p.github) && <a href={p.github} target="_blank" rel="noreferrer">GitHub</a>}
        </div>
        {has(p.description) && <div>{p.description}</div>}
        {Array.isArray(p.techList) && p.techList.length > 0 &&
          <div className="tech">{p.techList.filter(has).join(" · ")}</div>}
      </article>
    )}
  </Section>;
}

function ArraySection({ title, value }) {
  if (!Array.isArray(value) || value.length === 0) return null;

  const objects = value.every(x => x && typeof x === "object" && !Array.isArray(x));
  if (!objects) {
    return <Section title={title}><div className="inline">{value.filter(has).join(" · ")}</div></Section>;
  }

  return <Section title={title}>
    <div className="genericGrid">
      {value.map((item, i) => <GenericObject key={i} value={item} />)}
    </div>
  </Section>;
}

function GenericObject({ value }) {
  const entries = Object.entries(value).filter(([k, v]) =>
    !["image", "icon"].includes(k) && has(v)
  );
  return <div className="genericObject">
    {entries.map(([k, v]) => (
      <div className="genericField" key={k}>
        <b>{labelize(k)}:</b> <Value value={v} />
      </div>
    ))}
  </div>;
}

function Value({ value }) {
  if (Array.isArray(value)) {
    return <>{value.filter(has).map((x, i) =>
      <React.Fragment key={i}>{i ? ", " : ""}<Value value={x} /></React.Fragment>
    )}</>;
  }
  if (value && typeof value === "object") return <GenericObject value={value} />;
  if (typeof value === "string" && /^https?:\/\//.test(value)) {
    return <a href={value} target="_blank" rel="noreferrer">{value}</a>;
  }
  return <>{String(value)}</>;
}

function GenericSection({ title, value }) {
  if (!has(value)) return null;
  if (Array.isArray(value)) return <ArraySection title={title} value={value} />;
  if (typeof value === "object") return (
    <Section title={title}><GenericObject value={value} /></Section>
  );
  return <Section title={title}><div>{String(value)}</div></Section>;
}

function RenderSection({ keyName, value }) {
  const title = LABELS[keyName] || labelize(keyName);
  if (!has(value) || RESERVED.has(keyName) || keyName === "head") return null;

  if (keyName === "about") return <Summary value={value} />;
  if (keyName === "experience" && Array.isArray(value)) return <Experience value={value} title={title} />;
  if (keyName === "education" && Array.isArray(value)) return <Education value={value} title={title} />;
  if (keyName === "projects" && Array.isArray(value)) return <Projects value={value} title={title} />;
  return <GenericSection title={title} value={value} />;
}

function App() {
  const keys = Object.keys(data)
    .filter(k => !RESERVED.has(k) && k !== "head" && has(data[k]))
    .sort((a, b) => {
      const ai = ORDER.indexOf(a), bi = ORDER.indexOf(b);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

  return <main className="resume">
    <Header head={data.head || {}} />
    {keys.map(key => <RenderSection key={key} keyName={key} value={data[key]} />)}
  </main>;
}

createRoot(document.getElementById("root")).render(<App />);
