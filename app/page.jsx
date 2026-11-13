import Nav from '../components/Nav';
import RevealInit from '../components/RevealInit';
import SkillTabs from '../components/SkillTabs';
import { ME, TECH, FEATURES, EXPERIENCE, AUTOMIQ, OTHER_PROJECTS, SKILLS, EDUCATION } from './data';

// Illustrative run for the Automiq card
const RUN = [
  { step: 'trigger.webhook', tag: 'received', kind: 'ok', ms: '12ms' },
  { step: 'condition.if', tag: 'passed', kind: 'ok', ms: '3ms' },
  { step: 'action.http_request', tag: 'retry 1/3', kind: 'idle', ms: '5.0s' },
  { step: 'action.http_request', tag: 'success', kind: 'ok', ms: '184ms' },
  { step: 'action.notify', tag: 'queued', kind: 'idle', ms: '—' }
];

const ICONS = {
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 8.2-8 9-4.8-.8-8-4.5-8-9V6l8-3z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5z" />
      <path d="m3 13 9 5 9-5" />
    </>
  )
};

function Icon({ name }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

// Flat illustration: a stack of three "coins" — UI, API, DB — breaking the hero's lower edge.
function HeroArt() {
  const disc = (y, side, top, label) => (
    <g key={label}>
      <path d={`M120 ${y} V${y + 44} A200 52 0 0 0 520 ${y + 44} V${y} Z`} fill={side} />
      <ellipse cx="320" cy={y} rx="200" ry="52" fill={top} />
      <text
        x="320"
        y={y + 62}
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="900"
        fontSize="22"
        letterSpacing="3"
        fill="#ffffff"
      >
        {label}
      </text>
    </g>
  );
  const chip = (x, y, w, text) => (
    <g key={text}>
      <rect x={x} y={y} width={w} height="34" rx="17" fill="#e8ebe6" />
      <text
        x={x + w / 2}
        y={y + 22}
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600"
        fontSize="14"
        fill="#163300"
      >
        {text}
      </text>
    </g>
  );
  return (
    <svg className="hero__art" viewBox="0 0 640 300" role="img" aria-label="Illustration: a stack of three discs labelled UI, API and DB">
      {disc(232, '#163300', '#054d28', 'DB')}
      {disc(162, '#054d28', '#163300', 'API')}
      {disc(92, '#163300', '#e2f6d5', 'UI')}
      <g className="hero__chips">
        {chip(6, 70, 96, 'Next.js')}
        {chip(14, 176, 100, 'TypeScript')}
        {chip(534, 40, 100, 'Node.js')}
        {chip(522, 150, 112, 'PostgreSQL')}
      </g>
    </svg>
  );
}

function Opener({ children, dark }) {
  return (
    <h2 className={`h2${dark ? ' h2--dark' : ''}`} data-reveal>
      {children}
    </h2>
  );
}

function Tags({ items, dark }) {
  if (!items?.length) return null;
  return (
    <ul className={`tags${dark ? ' tags--dark' : ''}`}>
      {items.map(t => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

function ProjectLinks({ live, github, primary }) {
  if (!live && !github) return null;
  return (
    <div className="actions">
      {live && (
        <a
          className={`btn ${primary ? 'btn--lime' : 'btn--ghost-dark'}`}
          href={live}
          target="_blank"
          rel="noreferrer"
        >
          Live site <span aria-hidden="true">↗</span>
        </a>
      )}
      {github && (
        <a className="ulink ulink--paper" href={github} target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <RevealInit />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />

      <main id="main">
        {/* HERO */}
        <section className="hero" id="top">
          <div className="wrap hero__in">
            <span className="tag" data-reveal>
              Full-stack engineer · 3+ years building for the web
            </span>
            <h1 className="display" data-reveal style={{ '--d': '60ms' }}>
              I build products that solve real problems.
            </h1>
            <p className="lede" data-reveal style={{ '--d': '120ms' }}>
              I&apos;m Bharat Saini, a full-stack engineer who takes products from a clear problem to a dependable
              release. I work across TypeScript, React, Next.js, Node.js and PostgreSQL—with a focus on performance,
              workflow automation and maintainable systems.
            </p>
            <div className="actions actions--center" data-reveal style={{ '--d': '180ms' }}>
              <a className="btn btn--lime" href={ME.resume} target="_blank" rel="noreferrer">
                View résumé <span aria-hidden="true">↗</span>
              </a>
              <a className="ulink" href="#projects">
                Explore selected work
              </a>
            </div>
          </div>
          <HeroArt />
        </section>

        {/* TECH GRID */}
        <section className="band band--mist" aria-label="Core technologies">
          <div className="wrap">
            <p className="eyebrow" data-reveal>
              Daily drivers
            </p>
            <ul className="tech">
              {TECH.map((t, i) => (
                <li key={t.name} data-reveal style={{ '--d': `${i * 35}ms` }}>
                  <span className="tech__dot" aria-hidden="true">
                    {t.code}
                  </span>
                  <span className="tech__name">{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ABOUT */}
        <section className="band" id="about">
          <div className="wrap">
            <Opener>How I make an impact.</Opener>
            <p className="body" data-reveal>
              {ME.summary}
            </p>
            <ul className="features">
              {FEATURES.map((f, i) => (
                <li key={f.title} data-reveal style={{ '--d': `${i * 70}ms` }}>
                  <Icon name={f.icon} />
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="band band--fog" id="experience">
          <div className="wrap">
            <Opener>Experience &amp; measurable impact.</Opener>
            <div className="stack">
              {EXPERIENCE.map((e, i) => (
                <article className="card" key={e.role + e.company} data-reveal style={{ '--d': `${i * 80}ms` }}>
                  <header className="card__head">
                    <div>
                      <h3>{e.role}</h3>
                      <p className="muted">{e.company}</p>
                    </div>
                    <div className="card__meta">
                      {e.current && <span className="tag tag--dark">Current</span>}
                      <span className="muted">{e.period}</span>
                    </div>
                  </header>
                  {e.points.length > 0 && (
                    <ul className="points">
                      {e.points.map(p => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS (dark) */}
        <section className="band band--dark" id="projects">
          <div className="wrap">
            <Opener dark>Selected work, with the details.</Opener>

            <article className="big" data-reveal>
              <div className="big__text">
                <p className="kicker">{AUTOMIQ.kind}</p>
                <h3 className="h3-lg">{AUTOMIQ.title}</h3>
                <ul className="points points--dark">
                  {AUTOMIQ.points.map(p => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Tags items={AUTOMIQ.stack} dark />
                <ProjectLinks live={AUTOMIQ.live} github={AUTOMIQ.github} primary />
              </div>

              <div className="inset" role="group" aria-label="Example workflow run">
                <div className="inset__head">
                  <strong>Execution history</strong>
                  <span className="muted">Illustrative workflow</span>
                </div>
                <ul className="run">
                  {RUN.map((r, i) => (
                    <li key={i}>
                      <span className="run__step">{r.step}</span>
                      <span className={`st st--${r.kind}`}>{r.tag}</span>
                      <span className="run__ms">{r.ms}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <div className="grid2">
              {OTHER_PROJECTS.map((p, i) => (
                <article className="mini" key={p.title} data-reveal style={{ '--d': `${i * 80}ms` }}>
                  <p className="kicker">{p.kind}</p>
                  <h3 className="h3-md">{p.title}</h3>
                  {p.blurb && <p className="mini__blurb">{p.blurb}</p>}
                  <Tags items={p.stack} dark />
                  <ProjectLinks live={p.live} github={p.github} />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="band" id="skills">
          <div className="wrap">
            <Opener>The toolbox.</Opener>
            <div data-reveal>
              <SkillTabs groups={SKILLS} />
            </div>
          </div>
        </section>

        {/* SIDE QUEST + EDUCATION */}
        <section className="band band--mist band--tight">
          <div className="wrap grid2">
            <article className="large" data-reveal>
              <p className="kicker kicker--ink">Side quest</p>
              <h3 className="h3-md">Bug bounty &amp; responsible disclosure</h3>
              <p className="body body--sm">
                Identified web application vulnerabilities, including XSS and race conditions, through responsible
                disclosure and bug bounty programs.
              </p>
              <div className="actions">
                <a className="btn btn--outline" href={ME.hackerone} target="_blank" rel="noreferrer">
                  HackerOne profile <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
            <article className="large large--paper" data-reveal style={{ '--d': '80ms' }}>
              <p className="kicker kicker--ink">Education</p>
              <h3 className="h3-md">{EDUCATION.degree}</h3>
              <p className="body body--sm">{EDUCATION.school}</p>
              <p className="muted">{EDUCATION.period}</p>
            </article>
          </div>
        </section>

        {/* CONTACT (dark) */}
        <section className="band band--dark contact" id="contact">
          <div className="wrap">
            <h2 className="display display--lime" data-reveal>
              Let&rsquo;s build something that lasts.
            </h2>
            <p className="lede lede--dark" data-reveal>
              Open to conversations about full-stack roles, collaborations, and hard engineering problems.
            </p>

            <div className="inset inset--row" data-reveal>
              <div className="inset__who">
                <span className="avatar" aria-hidden="true">
                  BS
                </span>
                <div>
                  <strong>{ME.email}</strong>
                  <span className="muted">Best way to reach me</span>
                </div>
              </div>
              <a className="btn btn--outline" href={`mailto:${ME.email}`}>
                Email me
              </a>
            </div>

            <div className="actions actions--links" data-reveal>
              <a className="ulink ulink--paper" href={ME.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a className="ulink ulink--paper" href={ME.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a className="ulink ulink--paper" href={ME.hackerone} target="_blank" rel="noreferrer">
                HackerOne ↗
              </a>
              <a className="ulink ulink--paper" href={ME.resume} target="_blank" rel="noreferrer">
                Résumé ↓
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__in">
          <span>© 2026 Bharat Saini</span>
          <span>Full-stack developer · India</span>
        </div>
      </footer>

    </>
  );
}
