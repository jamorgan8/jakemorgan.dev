const links = {
  // PLACEHOLDER: replace these three values with Jake's real contact links.
  linkedin: 'https://www.linkedin.com/in/your-profile',
  github: 'https://github.com/your-username',
  email: 'mailto:you@example.com',
};

const impact = [
  { metric: '23% faster', title: 'Production SQL performance', detail: 'Reduced a key workload from about 22 to 17 minutes while cutting the codebase by more than half.' },
  { metric: 'Less manual work', title: 'Operational automation', detail: 'Built Python and SQL automation for recurring reporting and change-request workflows.' },
  { metric: 'Multi-team adoption', title: 'Enterprise data quality', detail: 'Led implementation, workflow design, documentation, training, and adoption of data-quality tooling.' },
];

const skills = ['SQL', 'Python', 'Teradata', 'SQL Server', 'GitHub Actions', 'Ataccama', 'ETL / ELT', 'Data Modeling', 'Data Quality', 'Automation'];

function ContactLinks({ compact = false }: { compact?: boolean }) {
  const items = [
    { label: 'Resume', href: '/resume.pdf', primary: true },
    { label: 'LinkedIn', href: links.linkedin, external: true },
    { label: 'GitHub', href: links.github, external: true },
    { label: 'Email', href: links.email },
  ];
  return (
    <div className={compact ? 'footer-links' : 'hero-actions'}>
      {items.map(({ label, href, external, primary }) => (
        <a key={label} className={compact ? 'footer-link' : `button${primary ? ' button-primary' : ''}`} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {label}
          {external && !compact && <span aria-hidden="true">↗</span>}
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Jake Morgan, home"><span aria-hidden="true">JM</span>Jake Morgan</a>
        <a className="availability" href={links.email}><span aria-hidden="true" />Open to opportunities</a>
      </header>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Data Engineer</p>
            <h1 id="hero-title">Jake Morgan</h1>
            <p className="lede">I build dependable enterprise data systems, improve production workflows, and turn repetitive operations into reliable automation.</p>
            <p className="skill-line">SQL <span>•</span> Python <span>•</span> Data Platforms <span>•</span> Automation</p>
            <ContactLinks />
          </div>
          <div className="data-panel" aria-hidden="true">
            <div className="panel-top"><span>pipeline_status</span><span>● live</span></div>
            <div className="pipeline">
              <div><span>01</span><strong>INGEST</strong><i /></div><div><span>02</span><strong>TRANSFORM</strong><i /></div><div><span>03</span><strong>VALIDATE</strong><i /></div><div><span>04</span><strong>DELIVER</strong><i /></div>
            </div>
            <div className="panel-bottom"><span>4 / 4 stages</span><span>quality checks passed</span></div>
          </div>
        </section>
        <section className="section" aria-labelledby="impact-title">
          <div className="section-heading"><p className="section-index">01 / Impact</p><h2 id="impact-title">Selected impact</h2></div>
          <div className="impact-grid">
            {impact.map((item, index) => <article className="impact-card" key={item.title}><span className="card-index">0{index + 1}</span><p className="metric">{item.metric}</p><h3>{item.title}</h3><p>{item.detail}</p></article>)}
          </div>
        </section>
        <section className="section profile-section" aria-labelledby="profile-title">
          <div className="section-heading"><p className="section-index">02 / Perspective</p><h2 id="profile-title">Technical depth, business context.</h2></div>
          <div className="profile-copy">
            <p>My background spans <strong>data engineering, data analytics, and project management</strong>. That range helps me translate business needs into technical implementation—and carry the work through operational execution.</p>
            <p>I’m seeking Data Engineering, Analytics Engineering, and closely related opportunities where durable systems and clear collaboration matter.</p>
          </div>
        </section>
        <section className="section skills-section" aria-labelledby="skills-title">
          <div className="section-heading"><p className="section-index">03 / Toolkit</p><h2 id="skills-title">Technical skills</h2></div>
          <ul className="skills-list" aria-label="Technical skills">{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
        </section>
      </main>
      <footer>
        <div><p className="footer-name">Jake Morgan</p><p>Data Engineer</p></div>
        <ContactLinks compact />
        <p className="copyright">© {new Date().getFullYear()} Jake Morgan</p>
      </footer>
    </>
  );
}
