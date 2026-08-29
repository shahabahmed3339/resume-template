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
        <div className="sub-contact">
          <svg height={15} width={15} role="img" viewBox="0 0 48 48" fill="#000000"><g id="SVGRepo_iconCarrier"> <title>Whatsapp-color</title><g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="#67C15E"> <path d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z" id="Whatsapp"> </path> </g> </g> </g></svg>
          <a href={`https://wa.me/${head.phone}`} target="_blank" className="hover:underline ml-1">
            {head.phone}
          </a>
        </div>
        <a href={`mailto:${head.email}`} target="_blank" className="sub-contact">
          <svg height={15} width={15} role="img" viewBox="5 7 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z" fill="white" />
            <path d="M22.0515 8.52295L16.0644 13.1954L9.94043 8.52295V8.52421L9.94783 8.53053V15.0732L15.9954 19.8466L22.0515 15.2575V8.52295Z" fill="#EA4335" />
            <path d="M23.6231 7.38639L22.0508 8.52292V15.2575L26.9983 11.459V9.17074C26.9983 9.17074 26.3978 5.90258 23.6231 7.38639Z" fill="#FBBC05" />
            <path d="M22.0508 15.2575V23.9924H25.8428C25.8428 23.9924 26.9219 23.8813 26.9995 22.6513V11.459L22.0508 15.2575Z" fill="#34A853" />
            <path d="M9.94811 24.0001V15.0732L9.94043 15.0669L9.94811 24.0001Z" fill="#C5221F" />
            <path d="M9.94014 8.52404L8.37646 7.39382C5.60179 5.91001 5 9.17692 5 9.17692V11.4651L9.94014 15.0667V8.52404Z" fill="#C5221F" />
            <path d="M9.94043 8.52441V15.0671L9.94811 15.0734V8.53073L9.94043 8.52441Z" fill="#C5221F" />
            <path d="M5 11.4668V22.6591C5.07646 23.8904 6.15673 24.0003 6.15673 24.0003H9.94877L9.94014 15.0671L5 11.4668Z" fill="#4285F4" />
          </svg>
          <span className="mt-1">{head.email}</span>
        </a>
        <a href={`https://github.com/${head.github}`} target="_blank" className="sub-contact">
          <svg height={15} width={15} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          <span className="mt-1">{head.github}</span>
        </a>
        <a href={`https://www.linkedin.com/in/${head.linkedIn}`} target="_blank" className="sub-contact">
          <svg height={15} width={15} role="img" viewBox="0 0 382 382" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path fill="#0077B7" d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472V330.654z" /></svg>
          <span className="mt-1">{head.linkedIn}</span>
        </a>
        {/* {has(head.phone) && <a href={`tel:${head.phone}`}>{head.phone}</a>}
        {has(head.email) && <a href={`mailto:${head.email}`}>{head.email}</a>}
        {links.map((x, i) =>
          <a key={i} href={x.url} target="_blank" rel="noreferrer">{x.title || x.url}</a>
        )} */}
      </div>
    </header>
  );
}

function Summary({ value }) {
  const values = Array.isArray(value) ? value : [value];
  return <Section title="Professional Summary">
    <div className="summary"><p>{values.filter(has).join(" ")}</p></div>
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
  if (keyName === "technologies" && Array.isArray(value)) return <GenericSection title={title} value={value.map((t) => t.title)} />;
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
