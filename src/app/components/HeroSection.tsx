import Link from "next/link";
import Dashboard from "./../../../public/images/dashboard.png"
import ResponsiveDashboard from "./../../../public/images/responsiveDashboard.png"
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full py-24 sm:px-6 [@media(max-width:350px)]:px-2 px-4 text-center -mt-14">
      <div className="bg-[#F7F7F7] sm:px-9 sm:pr-9  border border-[#C5C6D0] mx-auto rounded-3xl shadow-md">
        <h1 className="fade delay-1 xl:mt-20 sm:mt-16 mt-10 font-bold text-[#232323]  xl:text-[50px] lg:text-[45px] md:text-[38px] sm:text-[32px] text-[26px] [@media(max-width:478px)]:text-[18px] leading-tight mb-6 ">
        Circulate Wealth. Build Power. <br /> Lock In Your Spot.
        </h1>
        <p className="fade delay-2 text-gray-500 lg:text-lg px-5  pr-5  sm:text-[16px] text-[14px] [@media(max-width:350px)]:text-[12px] mb-8 max-w-2xl mx-auto">
        Only 2% of U.S. businesses are Black-owned. BEIZ is the marketplace built to change that — where vendors grow without being extracted from.
This is the system we’ve been missing. And it starts with you.
              </p>
        <Link href="/signup" className="fade delay-3 [@media(max-width:350px)]:px-5 inline-block md:px-16 px-8 rounded-full [@media(max-width:350px)]:text-[15px] bg-[#D4AF37] py-3 text-white font-semibold transition disabled:opacity-50"
        >       Pre-Register Today
        </Link>
        <div className="hidden md:block mt-10 relative fade delay-4 ">
          <Image src={Dashboard} alt="Dashboard Image" className="object-cover" />
        </div>
          <div className="block md:hidden mt-8 p-2 relative fade delay-4 ">
          <Image src={ResponsiveDashboard} alt="Dashboard Image" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
