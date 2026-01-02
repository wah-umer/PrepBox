export default function CookingGuidePage() {
  const guides = [
    {
      title: "Moroccan Chicken — bold flavors, one pan",
      steps: [
        "Heat oil in a large pan over medium heat",
        "Add the spice blend and cook for 1 minute until fragrant",
        "Add chicken and cook until golden brown",
        "Add onions and cook until softened",
        "Add rice and water, bring to a boil",
        "Reduce heat, cover and simmer for 20 minutes",
        "Let rest for 5 minutes before serving",
      ],
    },
    {
      title: "Creamy Alfredo Pasta — comfort made easy",
      steps: [
        "Bring a large pot of salted water to a boil",
        "Cook pasta according to package directions",
        "In a separate pan, melt butter over medium heat",
        "Add garlic and cook for 1 minute",
        "Add cream sauce mix and stir until smooth",
        "Add cooked pasta and toss to coat",
        "Garnish with parmesan and herbs",
      ],
    },
    {
      title: "Chicken Briyani — simplified, not compromised",
      steps: [
        "Heat oil in a large pot",
        "Add whole spices and cook until fragrant",
        "Add marinated chicken and cook until tender",
        "Layer with parboiled rice",
        "Cover and cook on low heat for 20 minutes",
        "Let rest before serving",
      ],
    },
    {
      title: "Stir-Fry Bowl — quick, fresh, satisfying",
      steps: [
        "Heat oil in a wok or large pan",
        "Add vegetables and stir-fry for 2 minutes",
        "Add protein and cook until done",
        "Add sauce and toss everything together",
        "Serve hot over rice or noodles",
      ],
    },
    {
      title: "Wholesome Keto Bowls — clean & balanced",
      steps: [
        "Heat oil in a pan",
        "Cook protein until golden",
        "Add low-carb vegetables",
        "Season with keto-friendly spices",
        "Serve in a bowl with healthy fats",
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black mb-4">
          Your PrepBox Cooking Guide
        </h1>
        <p className="text-gray-700 mb-4 text-lg">
          Every PrepBox comes with an easy, step-by-step recipe card — no stress, no guessing.
        </p>
        <p className="text-gray-600 mb-12">
          Designed for beginners, busy professionals, and anyone who just wants dinner done fast.
          Browse our recipes and see what's inside each box before you order.
        </p>

        <div className="space-y-12">
          {guides.map((guide, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-12 last:border-0">
              <h2 className="text-2xl font-bold text-black mb-6">
                {guide.title}
              </h2>
              <ol className="space-y-4">
                {guide.steps.map((step, stepIdx) => (
                  <li key={stepIdx} className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold mr-4">
                      {stepIdx + 1}
                    </span>
                    <span className="text-gray-700 text-lg pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

