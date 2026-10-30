import Navbar from "@/components/Navbar";
import HomeBanner from "@/components/HomeBanner";
import CentreYellowBox from "@/components/CentreYellowBox";
import ImageRow from "@/components/ImageRow";
import Reviews from "@/components/Reviews";
import News from "@/components/News";
import QuickLinks from "@/components/QuickLinks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HomeBanner />
        <CentreYellowBox />
        <ImageRow />
        <Reviews />
        <News />
        <QuickLinks />
      </main>
      <Footer />
    </>
  );
}
