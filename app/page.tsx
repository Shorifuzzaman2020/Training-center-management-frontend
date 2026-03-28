import AfterBanner from "@/components/ui/after-banner";
import CEOcomment from "@/components/ui/ceo-comment";
import TestimonialSection from "@/components/ui/client-stories";
import HeroCarousel from "@/components/ui/hero-carousel";
import OurLatestBlog from "@/components/ui/latest-blog";
import InstructorsSection from "@/components/ui/our-community";
import OurCourses from "@/components/ui/our-cources";
import OurRecentWork from "@/components/ui/our-recent-work";
import OurClients from "@/components/ui/ourclients";
import OurServices from "@/components/ui/ourservices";
import OurTeam from "@/components/ui/ourteam";
import Outstanding from "@/components/ui/outstanding";
import UserAnalytics from "@/components/ui/useranalytics";
import WhyChooseUs from "@/components/ui/why-choose-us";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      
      <main className="">
        <HeroCarousel />
      </main>
      <div>
        <AfterBanner />
      </div>
      {/* <div>
        <OurServices />
      </div>
      <div>
        <OurRecentWork />
      </div> */}
      <div>
        <OurCourses />
      </div>
      <div>
        <WhyChooseUs />
      </div>
      <div>
        <InstructorsSection />
      </div>
      <div>
        <TestimonialSection />
      </div>
      <div className="mb-6">
        <OurLatestBlog />
      </div>
      {/* <div>
        <Outstanding />
      </div> */}
      {/* <div>
        <CEOcomment />
      </div> */}
      {/* <div>
        <OurTeam />
      </div>
      <div>
        <UserAnalytics />
      </div>
      <div>
        <OurClients />
      </div> */}
    </div>
  );
}
