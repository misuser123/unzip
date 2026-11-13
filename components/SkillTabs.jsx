'use client';

import { useState } from 'react';

export default function SkillTabs({ groups }) {
  const [i, setI] = useState(0);
  const current = groups[i];

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Skill groups">
        {groups.map((g, idx) => (
          <button
            key={g.group}
            role="tab"
            id={`tab-${idx}`}
            aria-selected={idx === i}
            aria-controls="skill-panel"
            className={idx === i ? 'is-active' : undefined}
            onClick={() => setI(idx)}
            type="button"
          >
            {g.group}
          </button>
        ))}
      </div>
      <ul className="chips" id="skill-panel" role="tabpanel" aria-labelledby={`tab-${i}`} key={current.group}>
        {current.items.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
