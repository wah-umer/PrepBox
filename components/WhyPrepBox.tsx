import Image from "next/image";

export default function WhyPrepBox() {
  const features = [
    {
      emoji: "🥬",
      title: "Fresh, Pre-Portioned Ingredients",
      description:
        "We measure everything for you — no waste, no guesswork, no leftovers dying in your fridge.",
    },
    {
      emoji: "🧑‍🍳",
      title: "Curated Recipes That Actually Fit Your Life",
      description:
        "Thoughtfully designed meals that taste great and cook fast — no complicated steps, no extra prep.",
    },
    {
      emoji: "📦",
      title: "Smart, Hygienic Packaging",
      description:
        "Individually sealed ingredients that stay fresh for up to 48 hours when refrigerated properly.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">
            Why PrepBox Works
          </h2>
          <div className="mt-6 flex justify-center">
            <Image
              src="/images/why prepbox works.jpeg"
              alt="Why PrepBox Works"
              width={800}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full max-w-4xl"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">{feature.emoji}</div>
              <h3 className="text-xl font-bold text-black mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

