import { useEffect } from "react";
import {
  // Courses,
  CTA,
  DescriptionCard,
  FAQs,
  FeatureCards,
  Hero,
  MembershipPlans,
  Testimonials,
} from "../../components";
import useTour from "../../hooks/useTour";
export default function HomePage() {
  // const homePageTourSteps = [
  //   {
  //     element: "#hero",
  //     popover: {
  //       title: "Welcome to YourExamSathi",
  //       description:
  //         "Welcome aboard! 🎉 Our mission is simple — to help you master your course in the shortest time possible. With the power of AI, we simplify learning by summarizing topics, highlighting key insights, and assisting you with smart tools every step of the way. Let’s get started and make your journey from learning to mastery faster and easier than ever!",
  //     },
  //   },
  //   {
  //     element: "#tryItNow",
  //     popover: {
  //       title: "Try Yourself..",
  //       description: "Cick Here to see available courses..",
  //     },
  //   },
  //   {
  //     element: "#getSubscription",
  //     popover: {
  //       title: "From Learning to Mastery-Become a Pro",
  //     },
  //   },
  //   {
  //     element: ".outer-description-card",
  //     popover: {
  //       title: "AI That Adapts to You",
  //       description:
  //         "This section shows how our AI adapts to your unique learning needs. Whether it’s summarizing topics, clearing doubts, or creating personalized study plans, you’ll always have the right support at the right time.",
  //     },
  //   },
  //   {
  //     element: "#knowMore",
  //     popover: {
  //       title: "Click here to know more..",
  //     },
  //   },

  //   {
  //     element: ".membership-plans",
  //     popover: {
  //       title: "Membership Options",
  //       description:
  //         "Choose a plan that best suits your needs. We offer flexible pricing for everyone.",
  //     },
  //   },
  //   {
  //     element: ".faq-right",
  //     popover: {
  //       title: "Frequently Asked Questions",
  //       description:
  //         "This section covers the most common questions students have. From using the platform to understanding features, you’ll find quick, clear answers right here.",
  //     },
  //   },
  //not applied because the cta card is relative and the driverJS has to be setted up speccialy o allow this to render properly.
  // {
  //   element: "#contact",
  //   popover: {
  //     title: "We’re Here to Help",
  //     description:
  //       "Need support or have a question? Use this button to reach our team directly. We’ll be happy to assist you anytime.",
  //   },
  // },
  // ];
  // const { startTour } = useTour(homePageTourSteps);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     startTour();
  //   }, 500); // wait half a second for DOM to settle
  //   return () => clearTimeout(timer);
  // }, [startTour]);
  return (
    <>
      <Hero />
      <FeatureCards />
      <DescriptionCard />
      {/* <Courses/> */}
      <Testimonials />
      <MembershipPlans />
      <FAQs />
      <CTA />
    </>
  );
}
