import type { Personal } from "@/content/site";

type AboutProps = {
  personal: Personal;
};

export function About({ personal }: AboutProps) {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="section-head split">
        <div>
          <p className="eyebrow">profile</p>
          <h2 id="about-title">
            I study Computer Science and build for the web.
          </h2>
        </div>
        <p>{personal.focus}</p>
      </div>

      <div className="profile-grid">
        <div className="profile-block">
          <h3>stack</h3>
          <ul className="inline-list">
            {personal.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="profile-block">
          <h3>languages</h3>
          <ul className="language-list">
            {personal.languages.map((language) => (
              <li key={language.name}>
                <span>{language.name}</span>
                <span>{language.level}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="profile-block note">
          <h3>note</h3>
          <p>
            I like projects where I can learn by building. I care about clear
            interfaces, useful code, and how systems work under the surface.
          </p>
        </div>
      </div>
    </section>
  );
}
