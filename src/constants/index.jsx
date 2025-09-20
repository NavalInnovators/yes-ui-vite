import { card1, card2, card3 } from "../assets";
import { Chemistry, Physics, Maths, Biology } from "../assets";
import {
  FreeMember,
  FreeMemberMHover,
  PremiumMember,
  PremiumMemberMHover,
} from "../assets";
// image used in 2 services page articles
// import servicesMainArticleImg from "../assets/servicesMainArticleImg.png";

export const navLinks = [
  {
    id: localStorage.getItem('token') ? '/my-subjects' : "/all-subjects",
    title: "Dashboard",
  },
  {
    id: "/company",
    title: "Company",
  },
  {
    id: "/membership",
    title: "Membership",
  },
  {
    id: "/services",
    title: "Services",
  },
  {
    id: "/career",
    title: "Career",
  },
  {
    id: "/faq",
    title: "FAQ",
  },
  {
    id: "/contacts",
    title: "Contacts",
  },
];
export const cardValues = [
  {
    img: card1,
    title: "Focused Learning",
    cardText:
      "Master your syllabus with concise notes, mind maps, and time-based question banks designed for effective and efficient preparation.",
  },
  {
    img: card2,
    title: "Performance Boost",
    cardText:
      "Track progress with AI analytics, identify weak areas, and optimize your preparation for maximum results in less time.",
  },
  {
    img: card3,
    title: "Smart Prep",
    cardText:
      "Ace exams with AI-powered study plans, predictive questions, and past paper insights tailored to your unique learning needs.",
  },
];

export const coursesCards = [
  {
    img: Chemistry,
    subName: "Chemistry",
    subDesc:
      "It deals with the study of chemical compositions, their mixture and usage. Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy.",
    univ: "AKTU",
    year: "1st Year",
    branch: "CSE",
  },
  {
    img: Physics,
    subName: "Physics",
    subDesc:
      "It deals with the study of Physical world, Its usage in day to day life. This subject is very essential for the existance of life on the earth. Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    univ: "AKTU",
    year: "2nd Year",
    branch: "CSE-AIML",
  },
  {
    img: Maths,
    subName: "Maths",
    subDesc:
      "It is the study of mathematical formulas, reasoning, equations and derivation of integral and calculus equations, etc.Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    univ: "AKTU",
    year: "3rd Year",
    branch: "ECE",
  },
  {
    img: Biology,
    subName: "Biology",
    subDesc:
      "This subject is essential for longligivity of human beings. The person who studies it can either be a god or a demon. Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    univ: " AVBU ",
    year: "4th Year",
    branch: "B.Sc",
  },
];

export const relevantTags = [
  {
    type: "univ",
    value: "University",
  },
  {
    type: "year",
    value: "1st Year",
  },
  {
    type: "branch",
    value: "Branch",
  },
  {
    type: "year",
    value: "2nd Year",
  },
  {
    type: "branch",
    value: "CSE-DS",
  },
  {
    type: "year",
    value: "3rd Year",
  },
  {
    type: "branch",
    value: "CSE-AIML",
  },
  {
    type: "year",
    value: "4th Year",
  },
  {
    type: "univ",
    value: "AKTU/UPTU",
  },
];

export const membershipPlan = [
  {
    planIcon: FreeMember,
    planIconMHover: FreeMemberMHover,
    name: "Free Members",
    price: "₹0/Subject",
    features: [
      "Free Syllabus access",
      "Free Details answers of PYQ",
      "5 Free Summarisations & Maps",
    ],
    navigate: "/payment-completion",
  },
  {
    planIcon: PremiumMember,
    planIconMHover: PremiumMemberMHover,
    name: "Premium Members",
    price: "₹100/Subject",
    features: [
      "All Free features",
      "Unlimited Summarisations",
      "Unlimited Tricks, Tips & Maps",
      "Access to Analytics & Prediction",
      "All Filter access",
      "Free trial to Customised Preparation",
      "Free trial to Ai Featured",
    ],
    navigate: "/payment-completion",
  },
];

export const faqsData = [
  {
    question: "What is Your Exam Saathi?",
    answer:
      "Your Exam Saathi is an AI-powered platform designed to help undergraduate engineering students prepare for their exams efficiently. It offers personalized study plans, predictive question trends, concise unit notes, and performance analytics, ensuring smarter, targeted preparation for exam success.",
  },
  {
    question: "How does Your Exam Saathi use AI to help me prepare?",
    answer:
      "Our platform leverages AI to analyze past exam papers, identify patterns, and predict high-probability questions. It creates personalized study plans based on your strengths and weaknesses, helping you focus on what truly matters and optimize your time for better results.",
  },
  {
    question: "Can I use Your Exam Saathi for any engineering subject?",
    answer:
      "Yes! Your Exam Saathi covers a wide range of engineering subjects across various branches like Mechanical, Civil, Electrical, Computer Science, and more. The platform is tailored to meet the needs of all engineering students, regardless of their specialization.",
  },
  {
    question: "How can Your Exam Saathi help me if I’m short on time?",
    answer:
      "If you’re running out of time, Your Exam Saathi’s customized study plans, time-based question banks, and concise notes help you prioritize key topics efficiently. The platform allows you to study smarter, not harder, making sure you maximize your preparation in a limited timeframe.",
  },
  {
    question:
      "Is Your Exam Saathi suitable for both beginners and advanced students?",
    answer:
      "Absolutely! Whether you're just starting your preparation or need to revise advanced topics, Your Exam Saathi adapts to your level. The platform tailors resources to your progress, ensuring a smooth learning curve for both beginners and more advanced students.",
  },
];

export const footerLinks = [
  {
    header: "Important Links",
    innerLinks: [
      {
        title: "Home",
        id: "/",
      },
      {
        title: "Company",
        id: "/company",
      },
      {
        title: "Testimonials",
        id: "/testimonials",
      },
      {
        title: "Services",
        id: "/services",
      },
      {
        title: "FAQs",
        id: "/faq",
      },
      {
        title: "Contact us",
        id: "/contacts",
      },
    ],
  },
  {
    header: "Quick Links",
    innerLinks: [
      {
        title: "Career",
        id: "/career",
      },
      {
        title: "Membership",
        id: "/membership",
      },
    ],
  },
  // {
  //   header: "Legal",
  //   innerLinks: [
  //     {
  //       title: "Term of Use",
  //       id: "/page-not-found"
  //     },
  //     {
  //       title: "Privacy Policy",
  //       id: "/page-not-found"
  //     }
  //   ],
  // },
  {
    header: "Connect",
    innerLinks: [
      {
        title: "Instagram",
        id: "https://www.instagram.com/yourexamsaathi/",
      },
      // {
      //   title: "Facebook",
      //   id: "/facebook"
      // },
      {
        title: "LinkedIn",
        id: "https://www.linkedin.com/company/yourexamsaathi/",
      },
      {
        title: "YouTube",
        id: "https://www.youtube.com/@yourexamsaathi-yes",
      },
    ],
  },
];

export const queryCards = [
  {
    sub: "OOSD",
    query:
      "Why is there are more than one type of OOSD diagrams and flowchart. This makes me confused which one to choose and when.",
    date: "18/09/2024",
    likeCount: "1",
    commentCount: "0",
    commentContent: "",
    queryResolution:
      "Yes there are more than one type of OOSD diagram, but all of them serves different purpose which is useful in the process of website development. Therefore, you should learn why a diagram is needed and then start studying. This way you'll always remember the diagrams without confusion.",
  },
  {
    sub: "COA",
    query:
      "Why is there are more than one type of OOSD diagrams and flowchart. This makes me confused which one to choose and when.",
    date: "18/09/2024",
    likeCount: "1",
    commentCount: "0",
    commentContent: "",
    queryResolution:
      "Yes there are more than one type of OOSD diagram, but all of them serves different purpose which is useful in the process of website development. Therefore, you should learn why a diagram is needed and then start studying. This way you'll always remember the diagrams without confusion.",
  },
  {
    sub: "Math-2",
    query:
      "Why is there are more than one type of OOSD diagrams and flowchart. This makes me confused which one to choose and when.",
    date: "18/09/2024",
    likeCount: "1",
    commentCount: "0",
    commentContent: "",
    queryResolution:
      "Yes there are more than one type of OOSD diagram, but all of them serves different purpose which is useful in the process of website development. Therefore, you should learn why a diagram is needed and then start studying. This way you'll always remember the diagrams without confusion.",
  },
  {
    sub: "DBMS",
    query:
      "Why is there are more than one type of OOSD diagrams and flowchart. This makes me confused which one to choose and when.",
    date: "18/09/2024",
    likeCount: "1",
    commentCount: "0",
    commentContent: "",
    queryResolution:
      "Yes there are more than one type of OOSD diagram, but all of them serves different purpose which is useful in the process of website development. Therefore, you should learn why a diagram is needed and then start studying. This way you'll always remember the diagrams without confusion.",
  },
];

export const allCourseCard = [
  {
    sub: "OOSD",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
  {
    sub: "AI",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
  {
    sub: "COA",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
  {
    sub: "CLOUD COMPUTING",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
  {
    sub: "DATA STRUCTURE AND ALGORITHMS",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
  {
    sub: "SOFT COMPUTING",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
  {
    sub: "PHYSICS",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
  {
    sub: "CHEMISTRY",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
  {
    sub: "ELECTICAL ENGINEERING",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
  {
    sub: "MATHEMATICS I",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
  {
    sub: "SOFT SKILL",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
  {
    sub: "DSA",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
  {
    sub: "VLSI",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
  },
];
export const mySubjectCard = [
  {
    sub: "OOSD",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
    completedunit: 1,
  },
  {
    sub: "MATHEMATICS I",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
    completedunit: 5,
  },
  {
    sub: "DAA",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
    completedunit: 4,
  },
  {
    sub: "DSA",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
    completedunit: 3,
  },
  {
    sub: "VLSI",
    totalUnits: "Total Unit 5",
    univ: "AKTU",
    year: "1st",
    branch: "CSE-aiml",
    subCode: "AKTU0123",
    completedUnits: 2,
  },
];
export const ServicesArticlesContent = {
  syllabus: {
    heading: "Syllabus",
    content:
      "Preparing for university exams is often overwhelming, with vast syllabi and limited time. Smart preparation simplifies this process by breaking down the entire syllabus into concise, easy-to-understand notes. Our AI curated resources help you focus on key concepts, ensuring you’re well-prepared without wasting time on irrelevant details. Each topic is structured to enhance understanding, making it easier for you to grasp difficult concepts and retain them effectively. Whether you're starting your preparation early or cramming last minute, Smart learning provides the clarity and depth you need to succeed.",
    btnDestination: "/user-dashboard",
  },
  qna: {
    heading: "QnA",
    content:
      "Struggling with where to start your practice? Intelligent QnA uses AI to analyze past university question papers and identify trends. This feature provides curated question banks that prioritize high-probability questions, saving you hours of guesswork. You’ll also have access to time-based practice sets that mimic real exam conditions, sharpening your problem-solving skills and improving speed. By focusing on the most relevant questions and patterns, Intelligent QnA boosts your confidence and increases your chances of success.",
    btnDestination: "/user-dashboard",
  },
  unit: {
    heading: "Unit",
    content:
      "Often, certain units in your syllabus carry more weight or pose greater challenges. Unit Focus provides detailed, unit-wise summaries and in-depth notes tailored to these needs. With this feature, you can dive deep into crucial topics or quickly revise any unit before exams. Our approach ensures balanced preparation, giving you the flexibility to master high-weightage topics while strengthening your grasp on foundational units. Unit Focus is perfect for systematic study and targeted revision.",
    btnDestination: "/user-dashboard",
  },
  insights: {
    heading: "Insights",
    content:
      "Exam preparation isn’t just about studying; it’s about studying smart. Exam Insights leverages AI to analyze previous papers, trends, and performance data to identify what matters most. This feature highlights recurring patterns and high-probability topics, allowing you to prioritize your efforts effectively. By understanding these insights, you’ll know exactly where to focus, reducing stress and improving efficiency. Exam Insights ensures you’re not just working hard but working smart.",
    btnDestination: "/user-dashboard",
    // image: servicesMainArticleImg,
  },
  maps: {
    heading: "Maps",
    content:
      "Learning engineering concepts can be daunting without the right tools. Mind Maps simplifies complex subjects by visually connecting topics and ideas. These interactive diagrams help you understand relationships between concepts, making learning more intuitive and engaging. Memory tricks embedded within the maps further enhance retention, giving you an edge during exams. With Mind Maps, studying becomes less about rote memorization and more about true comprehension.",
    btnDestination: "/user-dashboard",
    // image: servicesMainArticleImg,
  },
  customPreparation: {
    heading: "Custom Preparation",
    content:
      "No two students are the same, so why should their study plans be? Personalized Prep creates a tailored study experience based on your strengths, weaknesses, and available time. Whether you’re balancing classes, assignments, or internships, this feature adapts to your schedule, ensuring maximum efficiency. From prioritizing weak areas to optimizing preparation timelines, Personalized Prep is your all-in-one solution for smart and effective studying.",
    btnDestination: "/user-dashboard",
  },
  aiFeatured: {
    heading: "AI Featured",
    content:
      "Harness the cutting-edge potential of artificial intelligence with AI Power. This feature underpins every aspect of Your Exam Saathi, from analyzing trends to tracking your progress. It adapts dynamically to your performance, suggesting targeted resources and strategies to improve your preparation. By combining data-driven insights with advanced personalization, AI Power ensures that you achieve your academic goals with ease.",
    btnDestination: "/user-dashboard",
  },
};

export const universities = [
  "Harvard University",
  "Stanford University",
  "MIT",
  "University of Oxford",
  "California Institute of Technology",
  "University of Cambridge",
  "Princeton University",
  "Columbia University",
  "Yale University",
  "University of Chicago",
];

export const colleges = [
  "College of Engineering, Pune",
  "Indian Institute of Technology, Bombay",
  "National Institute of Technology, Delhi",
  "University of California, Berkeley",
  "Birla Institute of Technology and Science",
  "University of Texas, Austin",
  "Georgia Institute of Technology",
  "University of Illinois Urbana-Champaign",
  "Vellore Institute of Technology",
  "Indian Institute of Information Technology, Hyderabad",
];

export const branches = [
  "Computer Science",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics and Communication",
  "Information Technology",
  "Biotechnology",
  "Chemical Engineering",
];


export const jobData = [
  {
    "title": "Frontend Intern",
    "description": "Work on real-life projects using HTML, CSS, JS, and React.",
    "category": "Frontend",
    "role_and_responsibilities": [
      "Collaborate with the team to develop and maintain the frontend of the application.",
      "Work with HTML, CSS, JavaScript, and React to create responsive web interfaces.",
      "Integrate and work with APIs to fetch data and display it dynamically.",
      "Participate in code reviews and contribute to improving frontend development practices.",
      "Learn and implement modern frontend frameworks and tools to enhance development speed and quality.",
      "Assist in testing and debugging frontend components to ensure smooth user experience."
    ],
    "qualifications_and_experience": [
      "Knowledge of HTML, CSS, JavaScript, and React.",
      "Basic understanding of API integrations and handling data flow.",
      "Ability to collaborate in a team and communicate effectively.",
      "Willingness to learn and adapt to new technologies and frameworks.",
      "Basic understanding of version control systems like Git.",
      "Problem-solving skills and a keen eye for detail."
    ],
    "link": "https://docs.google.com/forms/d/e/1FAIpQLScKxUFp17ZA_70bWZkKh3UDk8FrKnb7x_mGavICt1V7Gd-ieA/viewform"
  },
  {
    "title": "Backend Intern",
    "description": "Develop backend services using Java, Spring Boot, and APIs.",
    "category": "Backend",
    "role_and_responsibilities": [
      "Assist in developing and maintaining backend services using Java and Java Spring Boot.",
      "Work on solving data structures and algorithms-based problems to optimize backend performance.",
      "Integrate APIs for data exchange between frontend and backend.",
      "Support the creation and management of databases for storing and retrieving data efficiently.",
      "Collaborate with the frontend team to ensure seamless integration of the backend services.",
      "Participate in testing and debugging backend code to ensure functionality and performance."
    ],
    "qualifications_and_experience": [
      "Strong understanding of Java programming language and Java Spring Boot.",
      "Solid grasp of data structures, algorithms, and problem-solving skills.",
      "Ability to work with APIs and integrate them into backend services.",
      "Knowledge of databases and SQL for data management.",
      "Basic understanding of cloud computing concepts and deployment.",
      "Ability to collaborate effectively in a team environment."
    ],
    "link": "https://docs.google.com/forms/d/e/1FAIpQLScKxUFp17ZA_70bWZkKh3UDk8FrKnb7x_mGavICt1V7Gd-ieA/viewform"
  },
  {
    "title": "AI/ML Intern",
    "description": "Work with AI models and algorithms, including generative AI and neural networks.",
    "category": "AI/ML",
    "role_and_responsibilities": [
      "Work on developing and testing machine learning models for various applications.",
      "Implement generative AI models, classification, regression, and neural networks.",
      "Collaborate with the team to analyze and clean datasets for model training.",
      "Research and implement algorithms for optimizing AI models.",
      "Assist in evaluating model performance and suggest improvements.",
      "Stay updated with the latest trends in AI/ML and incorporate them into projects."
    ],
    "qualifications_and_experience": [
      "Strong foundation in machine learning algorithms such as classification, regression, and neural networks.",
      "Basic understanding of generative AI concepts and applications.",
      "Experience with programming languages like Python and frameworks like TensorFlow or PyTorch.",
      "Knowledge of statistical analysis and data preprocessing techniques.",
      "Ability to work with large datasets and perform data analysis.",
      "Passion for learning and exploring the field of AI/ML."
    ],
    "link": "https://docs.google.com/forms/d/e/1FAIpQLScKxUFp17ZA_70bWZkKh3UDk8FrKnb7x_mGavICt1V7Gd-ieA/viewform"
  },
  {
    "title": "Marketing Intern",
    "description": "Assist in both digital and physical marketing strategies and campaigns.",
    "category": "Marketing",
    "role_and_responsibilities": [
      "Assist in planning and executing digital marketing campaigns.",
      "Manage social media accounts and create engaging content for audiences.",
      "Conduct market research to identify trends and customer needs.",
      "Assist in physical marketing efforts, including event planning and promotions.",
      "Collaborate with the marketing team to design and optimize marketing strategies.",
      "Monitor and report on the effectiveness of marketing campaigns."
    ],
    "qualifications_and_experience": [
      "Strong communication and creative writing skills.",
      "Basic knowledge of digital marketing platforms like Google Ads, Facebook Ads, and SEO.",
      "Ability to analyze market trends and customer behavior.",
      "Familiarity with social media platforms and their tools for engagement.",
      "Interest in both digital and physical marketing strategies.",
      "Team player with a strong desire to learn and grow in the marketing field."
    ],
    "link": "https://docs.google.com/forms/d/e/1FAIpQLScKxUFp17ZA_70bWZkKh3UDk8FrKnb7x_mGavICt1V7Gd-ieA/viewform"
  },
  {
    "title": "Management Intern",
    "description": "Support the management team in team coordination and project handling.",
    "category": "Management",
    "role_and_responsibilities": [
      "Assist in coordinating and overseeing day-to-day team activities.",
      "Participate in project management, ensuring timely completion of tasks.",
      "Help manage workflows and resources to improve team productivity.",
      "Support in organizing meetings, events, and team discussions.",
      "Assist in team performance tracking and reporting.",
      "Work closely with the management team to execute business strategies and goals."
    ],
    "qualifications_and_experience": [
      "Excellent communication, leadership, and organizational skills.",
      "Ability to collaborate with different teams and manage tasks efficiently.",
      "Strong problem-solving skills and ability to handle multiple tasks.",
      "Interest in learning about project management tools and techniques.",
      "Ability to adapt quickly to changing team dynamics and project requirements.",
      "Willingness to take initiative and manage responsibilities effectively."
    ],
    "link": "https://docs.google.com/forms/d/e/1FAIpQLScKxUFp17ZA_70bWZkKh3UDk8FrKnb7x_mGavICt1V7Gd-ieA/viewform"
  },
  {
    "title": "Content Creator Intern",
    "description": "Create educational content as a subject expert for our platform.",
    "category": "Content",
    "role_and_responsibilities": [
      "Assist in content creation for the website, including writing articles, blog posts, and tutorials.",
      "Help create subject-specific content for engineering students.",
      "Contribute to resolving user queries and doubts in specific subjects.",
      "Collaborate with the content team to enhance content quality and relevance.",
      "Ensure that all content is aligned with the educational objectives of the platform.",
      "Stay updated with the latest trends and educational tools to incorporate in content."
    ],
    "qualifications_and_experience": [
      "Strong knowledge and good score in a particular engineering subject.",
      "Good writing skills and ability to communicate complex topics clearly.",
      "Interest in content creation, including tutorials and instructional content.",
      "Ability to collaborate and work with the content team effectively.",
      "Strong research skills and attention to detail.",
      "Willingness to learn and contribute as a subject matter expert."
    ],
    "link": "https://docs.google.com/forms/d/e/1FAIpQLScKxUFp17ZA_70bWZkKh3UDk8FrKnb7x_mGavICt1V7Gd-ieA/viewform"
  }
]

export const jobCategories = [
  "Frontend", 
  "Backend", 
  "Management", 
  "Marketing",
  "UI/UX", 
  "Content", 
  "AI/ML"
];

export const faqs = [
    {
      question: "What is Your Exam Saathi and how does it help me in my exam preparation?",
      answer: "Your Exam Saathi is an AI-powered platform that personalizes exam preparation for undergraduate engineering students. By analyzing exam trends, previous question papers, and learning patterns, we provide targeted study material, predictive questions, and customized learning paths to help you prepare efficiently for your exams.",
    },
    {
      question: "How does the AI-driven analytics help me in my preparation?",
      answer: "Our AI analyzes your performance in practice tests and assignments to provide personalized insights. It tracks your strengths, weaknesses, and progress over time, offering data-driven recommendations to improve your performance and helping you focus on high-priority areas for exam success.",
    },
    {
      question: "What kind of content will I get through Your Exam Saathi?",
      answer: "You’ll receive AI-generated summaries of past exam questions, unit-specific notes, mind maps, and tricks that simplify complex topics. The platform also provides personalized question banks and exam tips, focusing on the most frequently tested concepts to ensure maximum exam readiness.",
    },
    {
      question: "How accurate are the AI predictions for upcoming exams?",
      answer: "Our AI predictions are based on in-depth analysis of past exams and question paper patterns. While predictions aren't 100% guaranteed, they are highly accurate in identifying key topics that are more likely to appear, helping you concentrate on the most important areas.",
    },
    {
      question: "Can I customize my study schedule or preferences on Your Exam Saathi?",
      answer: "Yes! Your Exam Saathi allows you to customize your study schedule based on your available time and specific preparation goals. The platform automatically adjusts your plan as you progress, ensuring that you cover all necessary topics at the right pace for your exams.",
    },
    {
      question: "How does the AI-powered question bank help with practice?",
      answer: "The AI-generated question bank tailors practice questions to your skill level and learning pace. It adapts based on your performance, gradually increasing the difficulty to challenge you and reinforce learning. This helps you stay prepared for all types of questions that may appear in exams.",
    },
    {
      question: "How do mind maps and tricks help me in my preparation?",
      answer: "Mind maps and study tricks simplify complex topics, making them easier to understand and remember. These visual aids help organize information in a structured way, enhancing your retention. The AI generates personalized mind maps that are specifically tailored to the subject and exam you're preparing for.",
    },
    {
      question: "Can Your Exam Saathi help me prepare for multiple engineering subjects?",
      answer: "Yes, Your Exam Saathi supports multiple engineering disciplines. We provide personalized study content, practice tests, and AI-driven recommendations for each subject, whether it’s Maths, Physics, Computer Science, or other engineering subjects, ensuring a comprehensive preparation plan across all subjects.",
    },
    {
      question: "How can I track my progress on Your Exam Saathi?",
      answer: "With our AI-powered progress tracking, you can easily monitor your improvement in real-time. The platform tracks your performance in practice tests, assignments, and subject-wise assessments, giving you insights into your strengths and areas that need improvement, allowing you to adjust your study plan accordingly.",
    },
    {
      question: "How can I contact support if I need help with the platform?",
      answer: "If you need assistance with the platform, you can reach out to our support team through the 'Contact Us' page on our website. Additionally, you can email us at info@navalinnovators.com for any questions or concerns regarding the platform.",
    },
  ];
