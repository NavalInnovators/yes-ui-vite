import { 
  // Courses, 
  CTA, DescriptionCard, FAQs, FeatureCards, Hero, MembershipPlans, Testimonials } from "../../components";


export default function HomePage() {
  return (
    <>
        <Hero/>
        <FeatureCards/>
        <DescriptionCard/>
        {/* <Courses/> */}
        <Testimonials/>
        <MembershipPlans/>
        <FAQs/>
        <CTA/>
    </>
  )
}
