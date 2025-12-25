// Basic course card skeleton
const SkeletonCard = () => {
  return (
    <div className="w-full min-h-[220px] bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
      <div className="flex flex-col gap-4">
        {/* Plan badge skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
        </div>

        {/* Course name skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-1.5">
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
          <div className="h-5 w-12 bg-gray-200 rounded"></div>
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
          <div className="h-5 w-14 bg-gray-200 rounded"></div>
        </div>

        {/* Buttons skeleton */}
        <div className="flex gap-2 mt-4">
          <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

// Grid of skeleton cards
const SkeletonGrid = ({ count = 8, className = "" }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
};

// Cart item skeleton
const CartItemSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
    <div className="flex flex-col gap-4">
      {/* Plan badge and remove button */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>

      {/* Course name */}
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
        <div className="h-5 w-12 bg-gray-200 rounded"></div>
        <div className="h-5 w-20 bg-gray-200 rounded"></div>
      </div>

      {/* Price and plan buttons */}
      <div className="flex items-center justify-between mt-4">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-gray-200 rounded"></div>
          <div className="h-8 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

// Order summary skeleton
const OrderSummarySkeleton = () => (
  <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse min-h-100  flex flex-col">
    <div className="space-y-4">
      {/* Title */} 
      <div className="h-6 w-32 bg-gray-200 rounded"></div>
      
      {/* Summary rows */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="h-10 w-40 bg-gray-200 rounded"></div>
          <div className="h-10 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-10 w-16 bg-gray-200 rounded"></div>
          <div className="h-10 w-12 bg-gray-200 rounded"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-10 w-12 bg-gray-200 rounded"></div>
          <div className="h-10 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-10 w-20 bg-gray-200 rounded"></div>
          <div className="h-10 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-10 w-20 bg-gray-200 rounded"></div>
          <div className="h-10 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Checkout button */}
      <div className="h-12 w-full bg-gray-200 rounded-xl mt-6 self-end"></div>
    </div>
  </div>
);

// Partial cart skeleton
const CartContentSkeleton = () => {
  return (
    <div className="px-4 py-6 md:p-10 md:flex gap-6">
      {/* Left side - Cart Items */}
      <div className="w-full md:w-[70%]" id="left-section ">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="space-y-4 grid grid-cols-2 gap-6">
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>
      </div>

      {/* Right side - Order Summary */}
      <div className="w-full md:w-[30%] mt-8 md:mt-0">
        <OrderSummarySkeleton />
      </div>
    </div>
  );
};

// Orders page skeleton
const OrdersSkeleton = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full mx-auto space-y-8">
        {/* Active Subscriptions */}
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>

        {/* Expired Subscriptions */}
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
export { SkeletonGrid, CartItemSkeleton, OrderSummarySkeleton, CartContentSkeleton, OrdersSkeleton };