import "./BookDashboardSkeletons.css";

// Q&A Section
export const QnASkeletonLoader = () => {
  return (
    <div className="book-dashboard-question-summary-container w-full">
      <div className="animate-pulse w-full">   
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          </div>

          <div className="space-y-6 mt-8">
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Q&A Questions Sidebar
export const QnAQuestionsSkeleton = () => {
  return (
    <div className="book-dashboard-topics animate-pulse w-full flex justify-center flex-col">
      <div className="h-12 bg-gray-200 rounded w-full mb-8"></div>
      <div className="space-y-3">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="h-10 bg-gray-200 rounded flex-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Notes Content
export const NotesContentSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6 p-6">
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-9/10"></div>
      </div>
      <div className="space-y-8 mt-8">
        <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/8"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-9/10"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-9/10"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-56"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-9/10"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
      </div>
    </div>
  );
};

// Notes Topics Sidebar 
export const NotesTopicsSkeleton = () => {
  return (
    <div className="book-dashboard-topics animate-pulse w-full flex justify-center flex-col">
      <div className="h-12 bg-gray-200 rounded w-full mb-8"></div>
      <div className="space-y-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="h-10 bg-gray-200 rounded flex-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Insights
export const InsightsSkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="w-full flex justify-center items-center rounded-t-lg h-16 bg-gray-100">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
      </div>
      
      <div className="bg-gray-100 px-3 py-2">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48 mx-auto"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      
      <div className="flex flex-col  gap-4 max-w-[1000px] mx-auto">
        <div className="flex-1 bg-gray-100 p-4 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-6 bg-gray-200 rounded w-40 pt-3"></div>
            <div className="relative w-full h-[232px] flex items-center justify-center">
              <div className="h-48 w-48 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-gray-100 p-4 shadow-sm overflow-x-auto">
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 pb-2 border-b border-gray-200">
              <div className="h-5 bg-gray-200 rounded w-20"></div>
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="h-5 bg-gray-200 rounded w-28"></div>
              <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>
            
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 py-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Roadmap 
export const RoadmapSkeletonLoader = () => {
  return (
      <div className="animate-pulse space-y-6 w-full">
        <div className="space-y-2">
          <div>
            <div className="h-8 bg-gray-200 rounded w-full sm:w-1/2 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-full sm:w-1/3"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
        
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="bg-[#ffffff] rounded-lg p-4 flex flex-col gap-2 md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 w-full md:w-4/6">
              <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              <div className="h-5 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="flex justify-between items-center w-full md:w-2/8">
              <div className="flex gap-2"> 
                <div className="h-8 bg-gray-200 rounded w-12"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-6 w-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

// Syllabus
export const SyllabusSkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-6 p-6">
      <div className="text-center space-y-3">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
      </div>
      
      <div className="space-y-1 mt-8">
        {Array.from({ length: 7 }, (_, index) => (
          <div key={index} className="border-b border-gray-200 pb-1">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};