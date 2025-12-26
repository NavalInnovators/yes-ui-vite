// Utility functions for handling plan names and display


// Normalize plan name
export const normalizePlanForDisplay = (plan) => {
  if (!plan) return plan;
  
  const planStr = plan.toString().toUpperCase();
  
  switch (planStr) {
    case 'UPGRADED_PRO':
    case 'PRO':
      return 'Pro';
    case 'BASIC':
      return 'Basic';
    case 'FREE':
      return 'Free';
    default:
      return plan;
  }
};

// Check if a plan is Pro (including UPGRADED_PRO)
export const isPro = (plan) => {
  if (!plan) return false;
  const planStr = plan.toString().toUpperCase();
  return planStr === 'PRO' || planStr === 'UPGRADED_PRO';
};

// Check if a plan is Basic
export const isBasic = (plan) => {
  if (!plan) return false;
  const planStr = plan.toString().toUpperCase();
  return planStr === 'BASIC';
};

// Check if a plan is Free
export const isFree = (plan) => {
  if (!plan) return true;
  const planStr = plan.toString().toUpperCase();
  return planStr === 'FREE';
};

// Get plan display name with "Plan" suffix
export const getPlanDisplayName = (plan) => {
  const normalized = normalizePlanForDisplay(plan);
  return `${normalized} Plan`;
};

// Get plan color class for styling
export const getPlanColorClass = (plan) => {
  if (isPro(plan)) {
    return 'bg-purple-100 text-purple-700';
  } else if (isBasic(plan)) {
    return 'bg-blue-100 text-blue-700';
  } else {
    return 'bg-gray-100 text-gray-700';
  }
};