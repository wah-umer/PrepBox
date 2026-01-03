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
        <h1 className="text-4xl font-bold text-black mb-8">About Us</h1>
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 mb-4">
            PrepBox was born out of one universal struggle:
            being hungry but absolutely not in the mood to cook.
          </p>
          <p className="text-gray-700 mb-4">
            After long days, cooking isn't hard - deciding, shipping, and prepping is. So we fixed that.
          </p>
          <p className="text-gray-700 mb-4">
            Founded by Areeba, Areesha, and Hamza, PrepBox delivers ready-to-cook meal kits with fresh, pre-portioned ingredients and simple recipie cards, so dinner takes 10-15 minutes, not your entire evening. 
          </p>
          <p className="text-gray-700 mb-4">
            No grocery runs. No food waste. No "what should I make?" breakdowns.
            Just good food that actually fits into real life.
          </p>
          <p className="text-gray-700 mb-4">
            We don't ask you to cook more.
            We ask you to stress less.
          </p>
          <p className="text-gray-700 mb-4 font-semibold">
            PrepBox - convenience without compromise.
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

