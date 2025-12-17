import { useState, useEffect } from 'react';
import { ensureSubscriptionsLoaded, getUserPlanForCourse } from '../utils/subscriptionUtils';

// Hook to manage user subscriptions
export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        setIsLoading(true);
        const subs = await ensureSubscriptionsLoaded();
        setSubscriptions(subs);
        setError(null);
      } catch (err) {
        setError(err);
        console.error('Failed to load subscriptions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscriptions();
  }, []);

  const getPlanForCourse = (courseCode) => {
    return getUserPlanForCourse(courseCode);
  };

  const refreshSubscriptions = async () => {
    try {
      setIsLoading(true);
      // Clear existing subscriptions to force refresh
      localStorage.removeItem('userSubscriptions');
      const subs = await ensureSubscriptionsLoaded();
      setSubscriptions(subs);
      setError(null);
    } catch (err) {
      setError(err);
      console.error('Failed to refresh subscriptions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscriptions,
    isLoading,
    error,
    getPlanForCourse,
    refreshSubscriptions,
  };
};

// Hook to get plan for a specific course
export const useCoursePlan = (courseCode) => {
  const [plan, setPlan] = useState('FREE');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPlan = async () => {
      try {
        setIsLoading(true);
        await ensureSubscriptionsLoaded();
        const userPlan = getUserPlanForCourse(courseCode);
        setPlan(userPlan);
      } catch (error) {
        console.error('Failed to load course plan:', error);
        setPlan('FREE');
      } finally {
        setIsLoading(false);
      }
    };

    if (courseCode) {
      loadPlan();
    }
  }, [courseCode]);

  return { plan, isLoading };
};