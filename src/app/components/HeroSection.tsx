import Link from "next/link";
import Dashboard from "./../../../public/images/dashboard.png"
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full py-24 px-6 text-center -mt-14">
      <div className="bg-[#F7F7F7] px-9 pr-9 border border-[#C5C6D0] max-w-7xl mx-auto rounded-3xl shadow-md">
        <h1 className="fade delay-1 mt-20 text-[50px] font-bold text-[#232323] leading-tight mb-6">
          Unleash And Transform <br /> Your Business Potential
        </h1>
        <p className="fade delay-2 text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
          BEIZ is building a marketplace where vendors and supporters connect seamlessly.
          Pre-register now to get early access and special benefits.          </p>
        <Link href="/signup" className="fade delay-3 inline-block px-24  rounded-full bg-[#D4AF37] py-3 text-white font-semibold hover:bg-yellow-600 transition disabled:opacity-50"
        >        Sign Up
        </Link>
        <div className="mt-10 relative fade delay-4">
          <Image src={Dashboard} alt="Dashboard Image" className="" />
        </div>
      </div>
    </section>
  );
}
