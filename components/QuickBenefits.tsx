export default function QuickBenefits() {
  const benefits = [
    "10–15 minute meals",
    "Zero grocery runs",
    "Less waste, more flavor",
    "Convenience without compromise",
  ];

  return (
    <section className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm sm:text-base">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center">
              <span className="text-primary-500 mr-2">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

