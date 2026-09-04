/* oxlint-disable next/no-html-link-for-pages, next/no-img-element */

const links = {
  linkedin: 'https://www.linkedin.com/in/jakescottmorgan/',
  github: 'https://github.com/jamorgan8',
  email: 'mailto:hello@jakemorgan.dev',
};

const impact = [
  {
    metric: 'Data Management & Business Intelligence Rising Star',
    title: '2025',
    detail: 'Recognized for technical impact in data engineering and process optimization.',
  },
  {
    metric: 'Definitive Health pipeline',
    title: '26 tables',
    detail: 'Designed and built a monthly SFTP pipeline that ingests millions of records.',
  },
  {
    metric: 'Ataccama ONE',
    title: 'Data quality leadership',
    detail: 'Led platform adoption, onboarded 10 enterprise tables, and established a standardized 1-2 week deployment lifecycle.',
  },
];

const skillGroups = [
  { title: 'Languages & Automation', skills: ['SQL', 'Python', 'PowerShell', 'GitHub Actions'] },
  { title: 'Data Engineering', skills: ['ETL / ELT Architecture', 'Data Modeling', 'Pipeline Optimization', 'Data Quality & Governance'] },
  { title: 'Platforms & Analytics', skills: ['Teradata', 'SQL Server', 'Ataccama ONE', 'MicroStrategy', 'Power BI', 'Tableau'] },
  { title: 'Agentic Development', skills: ['Codex', 'Claude Code', 'GitHub Copilot CLI', 'AI-Assisted Development Workflows'] },
];

const roles = [
  {
    company: 'HCA Healthcare',
    title: 'Application Engineer - Data Engineer',
    dates: 'May 2025-Present',
    current: true,
    summary: 'Design and own enterprise ETL workflows and stored procedures supporting daily financial data ingestion and transformation across millions of records and hundreds of scheduled jobs. Own production pipelines end-to-end, from architecture and orchestration to anomaly investigation and stakeholder delivery.',
    achievements: [
      'Optimized a high-volume claims procedure, reducing daily runtime by 23% from 22 to 17 minutes.',
      'Coordinated the rollout and testing of a more stable, table-driven MicroStrategy job-management process with improved production logging.',
      'Implemented GitHub Actions branch synchronization across Teradata repositories, eliminating merge conflicts between QA, release, and production.',
      'Developed an analytics pipeline that ingests data through an external API.',
    ],
  },
  {
    company: 'Deloitte',
    title: 'Jr. Solutions Analyst',
    dates: 'February 2023-May 2025',
    summary: 'Supported large-scale legal and compliance data-processing engagements across 20-30 clients, handling hundreds of terabytes of data each quarter. Built automation, reporting, and documentation solutions using SQL Server and PowerShell.',
    achievements: [
      'Built PowerShell automation that reduced a recurring manual task from 10-60 minutes to 1-5 minutes.',
      'Automated monthly reporting with SQL, reducing preparation time from 60 to 10 minutes.',
      'Created and maintained runbooks for critical processing procedures, improving onboarding and execution consistency.',
    ],
  },
  {
    company: 'GEICO',
    title: 'Sr. Auto Damage Project Manager / Account Manager',
    dates: 'June 2015-December 2022',
    summary: 'Managed the full vehicle repair lifecycle for approximately 1,500 claims per year valued at roughly $4.5 million. Coordinated customers, repair facilities, vendors, rental vehicles, and internal stakeholders.',
    achievements: [
      'Helped implement and optimize the ARX program, reducing average paid rental days by 47%.',
      'Served as Fraud Champion for the Tennessee Manager Group, delivering statewide data briefings and coaching colleagues on fraud-identification tools.',
    ],
  },
];

function HeroActions() {
  return (
    <div className="hero-actions">
      <a className="button button-primary" href="/resume-access">View Resume</a>
      <a className="button" href={links.email}>Email Me</a>
      <a className="text-link" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
      <a className="text-link" href={links.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Jake Morgan, home"><span aria-hidden="true">JM</span>Jake Morgan</a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#background">Background</a>
          <a href="#impact">Highlights</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#beyond-work">Beyond Work</a>
        </nav>
        <a className="availability" href={links.email}><span aria-hidden="true" /><span className="availability-long">Open to new opportunities</span><span className="availability-short">Open to opportunities</span></a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Data Engineer <span aria-hidden="true">·</span> Nashville, TN</p>
            <h1 id="hero-title">Jake Morgan</h1>
            <p className="qualities">Creative Problem Solver <span>·</span> Technical Leader <span>·</span> Expert Communicator</p>
            <p className="technology-line">SQL <span>·</span> Python <span>·</span> Teradata <span>·</span> SQL Server <span>·</span> Ataccama ONE <span>·</span> Agentic Development</p>
            <HeroActions />
          </div>
        </section>

        <section className="section background-section" id="background" aria-labelledby="background-title">
          <h2 id="background-title">Background</h2>
          <div className="background-copy">
            <p>I’m a Nashville-based data engineer with experience building and owning enterprise ETL pipelines in high-scale, regulated environments. My work spans data architecture, automation, performance optimization, and production support, with a focus on creating systems that are reliable, maintainable, and useful to the people who depend on them.</p>
            <p>My path into data engineering began in project management and operations, where I learned to lead through clear communication, practical problem-solving, and accountability. Today, I bring that perspective to technical work - connecting business needs to durable engineering solutions and helping teams adopt better tools and processes.</p>
          </div>
        </section>

        <section className="section" id="impact" aria-labelledby="impact-title">
          <h2 id="impact-title">Career Highlights</h2>
          <div className="impact-grid">
            {impact.map((item, index) => (
              <article className="impact-card" key={item.title}>
                <span className="card-index">0{index + 1}</span>
                <p className="metric">{item.metric}</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="skills" aria-labelledby="skills-title">
          <h2 id="skills-title">Technical Skills</h2>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.skills.join(' · ')}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <div className="experience-heading">
            <h2 id="experience-title">Professional Experience</h2>
            <a className="text-link" href="/resume-access">View Full Résumé <span aria-hidden="true">→</span></a>
          </div>
          <div className="timeline">
            {roles.map((role) => (
              <article className={`role${role.current ? ' role-current' : ''}`} key={role.company}>
                <div className="role-header">
                  <div><h3>{role.company}</h3><p className="role-title">{role.title}</p></div>
                  <p className="role-dates">{role.dates}</p>
                </div>
                <p className="role-summary">{role.summary}</p>
                <ul>{role.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section beyond-section" id="beyond-work" aria-labelledby="beyond-title">
          <div className="beyond-copy">
            <h2 id="beyond-title">Beyond Work</h2>
            <p>Outside of work, I spend most of my time with my wife, Jocelyn, and our two border collies, Mark and Gary. We love traveling together - especially to Maine and Key West - and there’s usually another trip or home project taking shape.</p>
            <p>Closer to home, I enjoy lifting weights, fly fishing, playing video games and Warhammer, and tinkering with technology.</p>
          </div>
          <div className="personal-gallery">
            <figure className="photo photo-travel"><img src="/jake-jocelyn-camden.webp" width="1200" height="1600" loading="lazy" decoding="async" alt="Jake and Jocelyn overlooking Penobscot Bay in Camden, Maine." /></figure>
            <figure className="photo photo-dogs"><img src="/mark-and-gary.webp" width="1600" height="1200" loading="lazy" decoding="async" alt="Jake’s border collies, Mark and Gary." /></figure>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div><p className="eyebrow">Open to opportunities</p><h2 id="contact-title">Let’s connect.</h2></div>
          <div className="contact-copy">
            <p>I’m open to Data Engineering, Analytics Engineering, and related opportunities where reliable systems, automation, and strong collaboration matter.</p>
            <div className="contact-actions">
              <a className="button button-light" href={links.email}>Email Me</a>
              <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <a href="/resume-access">View Resume <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div><p className="footer-name">Jake Morgan</p><p>Data Engineer · Nashville, TN</p></div>
        <div className="footer-links"><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={links.github} target="_blank" rel="noreferrer">GitHub</a><a href={links.email}>Email</a></div>
        <p className="copyright">© {new Date().getFullYear()} Jake Morgan</p>
      </footer>
    </>
  );
}
