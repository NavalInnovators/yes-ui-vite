import { NoDataGif } from '../../assets';

const NoData = ({ 
  title = "No Data", 
  message = "There's nothing here yet. Check back later or try refreshing the page.",
  className = "",
  buttonText,
  onButtonClick
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center w-full ${className}`}>
      <div className="mb-6">
        <img 
          src={NoDataGif} 
          alt="No Data" 
          className="w-40 h-32 mx-auto object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 max-w-md">
        {message}
      </p>
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-95 mt-6"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default NoData;