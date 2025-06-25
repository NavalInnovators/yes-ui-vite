import "./ServicesPage.css";
import ServicesPageHero from "./ServicesPageHero";
import ServicesIntro from "./ServicesIntro";
import ServicesAside from "./ServicesAside";
import ServicesBottomHero from './ServicesBottomHero';
import ServicesMain from './ServicesMain';

const ServicesPage = () => {
  return (
      <section className='servicesPage'>
        <ServicesPageHero />
        {/* <ServicesIntro /> */}
        <div className="servicesMainContainer">
          <ServicesAside />
          <ServicesMain />
        </div>
        <ServicesBottomHero />
      </section>
  );
};


export default ServicesPage;
