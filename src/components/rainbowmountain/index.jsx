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
        <main className="relative z-10 md:-mt-24 -mt-36 ">
          <div className="relative w-full">
            {/* Container for mountain background elements */}
            <div className="relative">
              {/* Rainbow background */}
              <img 
                src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/0cdba8142219577.6262d4a37bc9a.gif"
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
                src="/rai.png"
                alt="Mount Rushmore"
                className="relative  hidden md:block w-full h-auto"
              />
               <img
                src="/raiph.png"
                alt="Mount Rushmore"
                className="relative block mt-20  md:hidden w-full h-auto"
              />
  
              {/* Thought bubble */}
              <div className="absolute 
                
                md:left-1/2 md:top-[100px]
                left-[70%] top-[100px]
                transform -translate-x-1/2 md:-translate-x-0">
                
                {/* Main bubble */}
                <div className="
          relative
          lg:w-[298px] lg:h-[181px]
          md:w-[250px] md:h-[150px]
          w-[120px] h-[80px]
          flex-shrink-0
          overflow-hidden
          md:border-4 border-2 border-white
          flex items-center justify-center
        "
        style={{
          clipPath: 'ellipse(50% 50% at center)',
          background: 'rgba(255, 255, 255, 0.6)',
borderRadius:"100%"       ,
   backdropFilter: 'blur(10.05px)',
        }}>
          <span className="flex items-center justify-center w-full h-full">
            <img 
              className="md:w-20 w-10" 
              src="/yenemoji.png"
              alt="Yen emoji"
            />
          </span>
        </div>

  
                {/* Medium bubble */}
                <div className="absolute 
          lg:w-[53px] lg:h-[44px]
          md:w-[45px] md:h-[35px]
          w-[35px] h-[28px]
          lg:left-[-5px] lg:top-[155px]
          md:left-[5px] md:top-[130px]
          right-[55px] top-[100px]
        "
        style={{
          clipPath: 'ellipse(50% 50% at center)',
          background: '#FFFFFF',
        }} />

        {/* Small bubble */}
        <div className="absolute 
          lg:w-[26px] lg:h-[24px]
          md:w-[22px] md:h-[20px]
          w-[18px] h-[16px]
          lg:left-[-28px] lg:top-[191px]
          md:left-[-25px] md:top-[160px]
          right-[100px] top-[125px]
        "
        style={{
          clipPath: 'ellipse(50% 50% at center)',
          background: '#FFFFFF',
        }} />
      </div>
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default App;