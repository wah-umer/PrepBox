export default function AboutPage() {
  const features = [
    {
      highlight: "Operationally",
      label: "Tested",
    },
    {
      highlight: "Ethically",
      label: "Sourced",
    },
    {
      highlight: "100%",
      label: "Fresh",
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black mb-8">About PrepBox</h1>
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 mb-4">
            PrepBox: Where convenience meets real food.
          </p>
          <p className="text-gray-700 mb-4">
            We're on a mission to make home-cooked meals accessible to everyone — 
            minus the hard part. No more grocery runs, no more food waste, no more 
            complicated recipes that take hours to prepare.
          </p>
          <p className="text-gray-700 mb-4">
            Every PrepBox comes with fresh, pre-portioned ingredients and an 
            easy-to-follow recipe card. From fridge to plate in 15 minutes. 
            That's our promise.
          </p>
          <p className="text-gray-700 mb-4">
            Whether you're a busy professional, a cooking beginner, or someone 
            who just wants dinner done fast — PrepBox is here to make your 
            kitchen smarter, not harder.
          </p>
        </div>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            // Use smaller font for longer words to prevent awkward breaks
            const isLongWord = feature.highlight.length > 10;
            const fontSize = isLongWord ? "text-xl md:text-2xl" : "text-4xl";
            
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-8 text-center flex flex-col items-center justify-center min-h-[180px] w-full"
              >
                <div 
                  className={`${fontSize} font-bold text-red-600 mb-2 w-full px-4`}
                  style={{ 
                    wordBreak: 'keep-all',
                    overflowWrap: 'normal'
                  }}
                >
                  {feature.highlight}
                </div>
                <div className="text-lg text-black font-normal w-full px-2">
                  {feature.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

