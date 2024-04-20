import Checker from "@/components/landingpage/Checker";
import { GlobeDemo } from "@/components/landingpage/GithubGlobe";

export default function Home() {
  return (
    <main className="container mx-auto h-screen">
      <Checker />
      <GlobeDemo />
    </main>
  );
}
