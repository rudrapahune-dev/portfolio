import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/ui/tech-marquee";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { NowBuilding } from "@/components/sections/now-building";
import { Projects } from "@/components/sections/projects";
import { TerminalSection } from "@/components/features/terminal";
import { Timeline } from "@/components/sections/timeline";
import { GitHubSection } from "@/components/sections/github";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/ui/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ToastProvider } from "@/components/ui/toast";
import { AiChat } from "@/components/features/ai-chat";
import { CommandPalette } from "@/components/features/command-palette";
import { EasterEgg } from "@/components/features/easter-egg";

export default function Home() {
  return (
    <ToastProvider>
      <div className="relative min-h-screen bg-background text-foreground selection:bg-accent selection:text-[#141512]">
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <CommandPalette />
        <Navbar />

        <main>
          <Hero />
          <TechMarquee />
          <About />
          <Skills />
          <NowBuilding />
          <Projects />
          <TerminalSection />
          <Timeline />
          <GitHubSection />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
        <AiChat />
        <EasterEgg />
      </div>
    </ToastProvider>
  );
}
