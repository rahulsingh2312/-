// 3 parts
// part 1 rainbow gif in background
// part 2 mount rushmore image
// part 3 thinking about yen emoji by 2nd guy in mount rushmore image
import Navbar from "../navbar";
const App = () => {
    return (
      <div className="min-h-screen relative">
        {/* Sticky navbar */}
        <div className="sticky top-0 z-30 px-4 pt-4">
          <Navbar />
        </div>
        
        {/* Main content */}
        <main className="relative z-10 -mt-24 ">
          <div className="relative w-full">
            {/* Container for mountain background elements */}
            <div className="relative">
              {/* Rainbow background */}
              <img 
                src="/rainbow.png"
                alt="Rainbow background"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Dark gradient overlay */}
              <div 
                className="absolute top-0 left-0 right-0 h-[188px]"
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.83) 0%, rgba(0, 0, 0, 0) 100%)',
                }}
              />
              
              {/* Mount Rushmore */}
              <img
                src="/mountRush.png"
                alt="Mount Rushmore"
                className="relative w-full h-auto"
              />
  
              {/* Thought bubble */}
              <div className="absolute 
                lg:left-[740px] lg:top-[139px]
                md:left-1/2 md:top-[100px]
                left-1/2 top-[80px]
                transform -translate-x-1/2 md:-translate-x-0">
                
                {/* Main bubble */}
                <div className="
   lg:w-[250px] lg:h-[150px] 
  md:w-[200px] md:h-[120px]
  w-[200px] h-[100px]
  bg-white/60 rounded-full
  border-4 border-[#E3E3E3]
  backdrop-blur-[10.05px]
  flex items-center justify-center">
                  <span className="md:text-7xl text-5xl">💹</span>
                </div>
  
                {/* Medium bubble */}
                <div className="absolute 
                  lg:w-[53px] lg:h-[44px]
                  md:w-[45px] md:h-[35px]
                  w-[35px] h-[28px]
                  lg:left-[-5px] lg:top-[155px]
                  md:left-[-5px] md:top-[130px]
                  left-[-5px] top-[100px]
                  bg-white rounded-full" 
                />
  
                {/* Small bubble */}
                <div className="absolute 
                  lg:w-[26px] lg:h-[24px]
                  md:w-[22px] md:h-[20px]
                  w-[18px] h-[16px]
                  lg:left-[-28px] lg:top-[191px]
                  md:left-[-25px] md:top-[160px]
                  left-[-20px] top-[125px]
                  bg-white rounded-full" 
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default App;