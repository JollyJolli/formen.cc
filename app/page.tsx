import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProjectArchive } from "@/components/project-archive";
import { ProjectShowcase } from "@/components/project-showcase";
import { personal, projects } from "@/content/site";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero personal={personal} projectCount={projects.length} />
        <ProjectShowcase projects={projects} />
        <ProjectArchive projects={projects} />
        <About personal={personal} />
        <Contact personal={personal} />
      </main>
      <Footer />
    </>
  );
}
