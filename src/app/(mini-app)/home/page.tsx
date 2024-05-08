import Carousel from '@/components/common/Carousel';

export default function Component() {
  return (
        <div className=" w-200 h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
                <div className="flex h-full items-center justify-center bg-gray-700 text-white">
                    Slide 1
                </div>
                <div className="flex h-full items-center justify-center bg-gray-500 text-white">
                    Slide 2
                </div>
                <div className="flex h-full items-center justify-center bg-gray-300 text-white">
                    Slide 3
                </div>
            </Carousel>
        </div>
  );
}
