import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import data from "./data.json";
import "./styles.css";

const EXCLUDED_SECTIONS = new Set(["backgroundVideo", "resume", "head"]);
const SECTION_LABELS = {
  about: "Professional Summary",
  experience: "Professional Experience",
  education: "Education",
  projects: "Selected Projects",
  technologies: "Technical Skills",
  skills: "Core Competencies",
  languages: "Languages",
  interests: "Interests",
};
const SECTION_ORDER = ["about", "experience", "education", "projects", "technologies", "skills", "languages", "interests"];

const isPresent = (value) => value !== undefined && value !== null && (typeof value !== "string" || value.trim()) && (!Array.isArray(value) || value.length);
const humanize = (value) => value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const getDateRange = ({ start, from, startDate, end, to, endDate, current } = {}) => [start ?? from ?? startDate, end ?? to ?? endDate ?? current].filter(isPresent).join(" - ");
const toUrl = (value, baseUrl = "") => !isPresent(value) ? "" : (/^(https?:\/\/|mailto:|tel:)/i.test(value) ? value : `${baseUrl}${value}`);
const sectionId = (title) => `section-${title.replace(/\s+/g, "-").toLowerCase()}`;

function Section({ title, children }) {
  const id = sectionId(title);
  return <section className="section" aria-labelledby={id}><h2 id={id}>{title}</h2>{children}</section>;
}

function Header({ head = {} }) {
  const contacts = [
    head.phone && { label: "Phone", value: head.phone, href: `tel:${head.phone.replace(/\s/g, "")}` },
    head.email && { label: "Email", value: head.email, href: `mailto:${head.email}` },
    head.linkedIn && { label: "LinkedIn", value: `linkedin.com/in/${head.linkedIn}`, href: toUrl(head.linkedIn, "https://www.linkedin.com/in/") },
    head.github && { label: "GitHub", value: `github.com/${head.github}`, href: toUrl(head.github, "https://github.com/") },
  ].filter(Boolean);

  return <header className="header">
    {isPresent(head.name) && <h1>{head.name}</h1>}
    {isPresent(head.title) && <p className="headline">{head.title}</p>}
    {contacts.length > 0 && <address className="contact" aria-label="Contact information">
      {contacts.map(({ label, value, href }) => <span key={label}><a href={href}>{value}</a></span>)}
    </address>}
  </header>;
}

function ExportPdfButton() {
  const [isExporting, setIsExporting] = useState(false);

  const exportPdf = async () => {
    const resumeElement = document.querySelector(".resume");
    if (!resumeElement) return;

    setIsExporting(true);
    document.body.classList.add("pdf-exporting");
    try {
      const { default: html2pdf } = await import("html2pdf.js");
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await html2pdf()
        .set({
          filename: `${(data.head?.name || "Resume").replace(/\s+/g, "-")}-Resume.pdf`,
          margin: [12, 12, 12, 12],
          enableLinks: true,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"] },
        })
        .from(resumeElement)
        .save();
    } finally {
      document.body.classList.remove("pdf-exporting");
      setIsExporting(false);
    }
  };

  return <div className="export-actions">
    <button className="export-button" type="button" disabled={isExporting} onClick={exportPdf}>
      {isExporting ? "Preparing PDF..." : "Export as PDF"}
    </button>
  </div>;
}

function EntryHeading({ entry, organization }) {
  const meta = [getDateRange(entry), entry.location].filter(isPresent).join(" | ");
  return <div className="entry-heading">
    <div>{isPresent(entry.title) && <h3>{entry.title}</h3>}{isPresent(organization) && <p className="organization">{organization}</p>}</div>
    {meta && <p className="entry-meta">{meta}</p>}
  </div>;
}

function Summary({ value }) {
  const text = (Array.isArray(value) ? value : [value]).filter(isPresent).join(" ");
  return text && <Section title={SECTION_LABELS.about}><p className="summary">{text}</p></Section>;
}

function Experience({ entries }) {
  return <Section title={SECTION_LABELS.experience}>{entries.filter(Boolean).map((job, index) => <article className="entry" key={`${job.company}-${job.title}-${index}`}>
    <EntryHeading entry={job} organization={job.company} />
    {isPresent(job.description) && <p className="entry-description">{job.description}</p>}
    {Array.isArray(job.accomplishments) && job.accomplishments.filter(isPresent).length > 0 && <ul>{job.accomplishments.filter(isPresent).map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}</ul>}
  </article>)}</Section>;
}

function Education({ entries }) {
  return <Section title={SECTION_LABELS.education}>{entries.filter(Boolean).map((education, index) => <article className="entry" key={`${education.institute}-${education.title}-${index}`}>
    <EntryHeading entry={education} organization={education.institute} />
    {(isPresent(education.cgpa) || isPresent(education.thesis)) && <p className="education-details">
      {isPresent(education.cgpa) && <>CGPA: {education.cgpa}</>}{isPresent(education.cgpa) && isPresent(education.thesis) && " | "}{isPresent(education.thesis) && <>Thesis: {education.thesis}</>}
    </p>}
  </article>)}</Section>;
}

function Projects({ entries }) {
  return <Section title={SECTION_LABELS.projects}>{entries.filter(Boolean).map((project, index) => <article className="entry project" key={`${project.title}-${index}`}>
    <div className="entry-heading"><h3>{project.title || `Project ${index + 1}`}</h3>{isPresent(project.github) && <a className="project-link" href={toUrl(project.github)}>{project.github.replace(/^https?:\/\//, "")}</a>}</div>
    {isPresent(project.description) && <p>{project.description}</p>}
    {Array.isArray(project.techList) && project.techList.filter(isPresent).length > 0 && <p className="keywords"><strong>Technologies:</strong> {project.techList.filter(isPresent).join(", ")}</p>}
  </article>)}</Section>;
}

function KeywordSection({ title, values }) {
  const items = values.filter(isPresent).map((item) => typeof item === "object" ? item.title : item).filter(isPresent);
  return items.length > 0 && <Section title={title}><p className="keywords">{items.join(", ")}</p></Section>;
}

function FallbackSection({ title, value }) {
  if (Array.isArray(value)) return <KeywordSection title={title} values={value} />;
  if (typeof value !== "object") return <Section title={title}><p>{String(value)}</p></Section>;
  const fields = Object.entries(value).filter(([, fieldValue]) => isPresent(fieldValue));
  return fields.length > 0 && <Section title={title}><dl className="detail-list">{fields.map(([key, fieldValue]) => <React.Fragment key={key}><dt>{humanize(key)}</dt><dd>{Array.isArray(fieldValue) ? fieldValue.join(", ") : String(fieldValue)}</dd></React.Fragment>)}</dl></Section>;
}

function App() {
  const sectionKeys = Object.keys(data).filter((key) => !EXCLUDED_SECTIONS.has(key) && isPresent(data[key])).sort((left, right) => (SECTION_ORDER.indexOf(left) === -1 ? Infinity : SECTION_ORDER.indexOf(left)) - (SECTION_ORDER.indexOf(right) === -1 ? Infinity : SECTION_ORDER.indexOf(right)));
  return <div className="resume-shell"><ExportPdfButton /><main className="resume"><Header head={data.head} />{sectionKeys.map((key) => {
    const value = data[key];
    if (key === "about") return <Summary key={key} value={value} />;
    if (key === "experience" && Array.isArray(value)) return <Experience key={key} entries={value} />;
    if (key === "education" && Array.isArray(value)) return <Education key={key} entries={value} />;
    if (key === "projects" && Array.isArray(value)) return <Projects key={key} entries={value} />;
    if (["technologies", "skills", "languages", "interests"].includes(key) && Array.isArray(value)) return <KeywordSection key={key} title={SECTION_LABELS[key]} values={value} />;
    return <FallbackSection key={key} title={SECTION_LABELS[key] || humanize(key)} value={value} />;
  })}</main></div>;
}

createRoot(document.getElementById("root")).render(<App />);
