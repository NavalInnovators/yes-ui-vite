// useTour.js
import { useRef, useCallback } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css"; // Import driver.js styles

export default function useTour(steps, options = {}) {
  const driverRef = useRef(null);

  // Initialize driver instance
  const initDriver = useCallback(() => {
    if (!driverRef.current) {
      driverRef.current = driver({
        showProgress: true,
        allowClose: true,
        animate: true,
        smoothScroll: true,
        steps,
        overlayClickBehavior: "nextStep",
        stagePadding: 4,
        // onHighlightStarted: (element, step) => {
        //   if (!element) return;

        //   // Step-level flag
        //   const currentStep = steps.find((s) => s.element === step.element);
        //   const stepScrollToTop = currentStep?.scrollToTop;

        //   // Global flag
        //   const globalScrollToTop = options.forceScrollTop;

        //   // Decide behavior (step flag overrides global)
        //   const shouldScrollTop =
        //     stepScrollToTop !== undefined ? stepScrollToTop : globalScrollToTop;

        //   element.scrollIntoView({
        //     behavior: "smooth",
        //     block: shouldScrollTop ? "start" : "nearest",
        //     inline: "nearest",
        //   });
        // },
        ...options,
      });
    }
    return driverRef.current;
  }, [steps, options]);

  // Start the tour
  const startTour = useCallback(() => {
    const d = initDriver();
    d.drive();
  }, [initDriver]);

  // Reset the tour
  const resetTour = useCallback(() => {
    driverRef.current = null;
  }, []);

  return { startTour, resetTour };
}
