// Utility functions for roadmap data generation from syllabus API

/**
 * Generates consistent priority for topics based on topic name hash
 * @param {string} topicName - The topic name to generate priority for
 * @returns {string} - 'high', 'medium', or 'low'
 */
const getConsistentPriority = (topicName) => {
  // Create a simple hash from topic name for consistency
  let hash = 0;
  for (let i = 0; i < topicName.length; i++) {
    const char = topicName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use absolute value and modulo to get consistent result
  const hashValue = Math.abs(hash) % 100;
  
  // Assign priorities based on hash value ranges
  if (hashValue < 30) {
    return 'high';
  } else if (hashValue < 70) {
    return 'medium';
  } else {
    return 'low';
  }
};

/**
 * Generates consistent study time based on priority and topic name
 * @param {string} priority - 'high', 'medium', or 'low'
 * @param {string} topicName - The topic name for consistency
 * @returns {string} - time string like "30 mins"
 */
const getConsistentStudyTime = (priority, topicName) => {
  const timeRanges = {
    high: { min: 30, max: 60 },
    medium: { min: 20, max: 40 },
    low: { min: 10, max: 25 }
  };
  
  const range = timeRanges[priority] || timeRanges.medium;
  
  // Use topic name hash for consistent time
  let hash = 0;
  for (let i = 0; i < topicName.length; i++) {
    const char = topicName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const hashValue = Math.abs(hash) % (range.max - range.min + 1);
  const minutes = range.min + hashValue;
  return `${minutes} mins`;
};

/**
 * Generates consistent priority type based on priority level and topic name
 * @param {string} priority - 'high', 'medium', or 'low'
 * @param {string} topicName - The topic name for consistency
 * @returns {string} - priority type description
 */
const getConsistentPriorityType = (priority, topicName) => {
  const types = {
    high: ['Numerical Type', 'Conceptual', 'Mixed', 'Comparison Type QnA'],
    medium: ['Theory Type', 'Conceptual', 'Application'],
    low: ['Quick Read', 'Summary', 'Overview']
  };
  
  const availableTypes = types[priority] || types.medium;
  
  // Use topic name hash for consistent selection
  let hash = 0;
  for (let i = 0; i < topicName.length; i++) {
    const char = topicName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const hashValue = Math.abs(hash) % availableTypes.length;
  return availableTypes[hashValue];
};

/**
 * Generates consistent focus areas based on priority and topic name
 * @param {string} priority - 'high', 'medium', or 'low'
 * @param {string} topicName - The topic name for consistency
 * @returns {string[]} - array of focus areas
 */
const getConsistentFocusAreas = (priority, topicName) => {
  const focusOptions = {
    high: [
      ['formulas', 'speed-accuracy'],
      ['important derivations'],
      ['definitions', 'key concepts'],
      ['practice problems', 'examples']
    ],
    medium: [
      ['definitions'],
      ['key concepts'],
      ['applications'],
      ['theory', 'concepts']
    ],
    low: [
      ['summary'],
      ['overview'],
      ['glossary'],
      ['quick review']
    ]
  };
  
  const availableFocus = focusOptions[priority] || focusOptions.medium;
  
  // Use topic name hash for consistent selection
  let hash = 0;
  for (let i = 0; i < topicName.length; i++) {
    const char = topicName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const hashValue = Math.abs(hash) % availableFocus.length;
  return availableFocus[hashValue];
};

/**
 * Generates consistent study advice based on priority and topic name
 * @param {string} priority - 'high', 'medium', or 'low'
 * @param {string} topicName - The topic name for consistency
 * @returns {string} - study advice
 */
const getConsistentStudyAdvice = (priority, topicName) => {
  const adviceOptions = {
    high: [
      "Focus on error types; do 10 timed problems.",
      "Likely in exams. Practice extensively.",
      "Master this topic thoroughly.",
      "High priority - allocate maximum time."
    ],
    medium: [
      "Skim once, then active recall.",
      "Make brief notes and practice.",
      "Understand concepts well.",
      "Moderate priority - good understanding needed."
    ],
    low: [
      "Low priority; optional.",
      "Revisit if time remains.",
      "Skippable if short on time.",
      "Optional refresh."
    ]
  };
  
  const availableAdvice = adviceOptions[priority] || adviceOptions.medium;
  
  // Use topic name hash for consistent selection
  let hash = 0;
  for (let i = 0; i < topicName.length; i++) {
    const char = topicName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const hashValue = Math.abs(hash) % availableAdvice.length;
  return availableAdvice[hashValue];
};

/**
 * Generates roadmap data from syllabus API data
 * @param {Object} syllabus - syllabus data from API
 * @returns {Object} - roadmap data structure
 */
export const generateRoadmapFromSyllabus = (syllabus) => {
  if (!syllabus || !syllabus.units) {
    return { units: [] };
  }

  const roadmapUnits = syllabus.units.map((unit, unitIndex) => {
    const topics = unit.topics.map((topic, topicIndex) => {
      const priority = getConsistentPriority(topic);
      
      return {
        id: `u${unitIndex + 1}-t${topicIndex + 1}`,
        unitId: unitIndex + 1,
        name: topic,
        priority: priority,
        avgTime: getConsistentStudyTime(priority, topic),
        priorityType: getConsistentPriorityType(priority, topic),
        focus: getConsistentFocusAreas(priority, topic),
        advice: getConsistentStudyAdvice(priority, topic)
      };
    });

    return {
      id: unitIndex + 1,
      name: unit.unitTitle || `Unit ${unitIndex + 1}`,
      topics: topics
    };
  });

  return { units: roadmapUnits };
};

/**
 * Filters roadmap data by unit
 * @param {Object} roadmapData - roadmap data
 * @param {number} unitId - unit ID to filter by
 * @returns {Object} - filtered roadmap data
 */
export const filterRoadmapByUnit = (roadmapData, unitId) => {
  if (!roadmapData || !roadmapData.units) {
    return { units: [] };
  }

  const filteredUnits = roadmapData.units.filter(unit => unit.id === unitId);
  return { units: filteredUnits };
};

/**
 * Gets all topics from roadmap data for a specific unit
 * @param {Object} roadmapData - roadmap data
 * @param {number} unitId - unit ID
 * @returns {Array} - array of topics
 */
export const getTopicsForUnit = (roadmapData, unitId) => {
  if (!roadmapData || !roadmapData.units) {
    return [];
  }

  const unit = roadmapData.units.find(u => u.id === unitId);
  return unit ? unit.topics : [];
};
