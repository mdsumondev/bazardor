import Image from "next/image";
import Hero from "./Components/Home/Hero";

export default function Home() {
  return (
    <div className="bg-[#E1E8E1] px-5 pt-5">
      <section>
        <Hero />
      </section>
    </div>
  );
}
