import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Banner from './Banner';
import Icons from './Icons';
import Cards from './Cards';
import Glossary from './Glossary';

export default function CoePage() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <div className="bg-[#f4f4f4] pb-16 lg:pb-24">
          <Icons />
          <Cards section={1} start={1} count={6} cols={3} />
          <Cards section={2} start={7} count={8} cols={4} />
          <Glossary />
        </div>
      </main>
      <Footer />
    </>
  );
}