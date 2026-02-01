type Step = {
  title: string;
  subtitle: string;
  time: string;
  icon: string;
  active?: boolean;
};

const steps: Step[] = [
  {
    title: "Item Discovered",
    subtitle: "Found in Central Block",
    time: "Day 0",
    icon: "📦",
  },
  {
    title: "Holding Period",
    subtitle: "Compliance Threshold Met",
    time: "65 Days",
    icon: "⏳",
  },
  {
    title: "Admin Validation",
    subtitle: "Final review in progress",
    time: "Now",
    icon: "🛂",
    active: true,
  },
];

export default function AuditLifecycle() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      <h3 className="text-lg font-bold mb-6">
        Audit Lifecycle
      </h3>

      <ol className="relative border-l border-gray-200 ml-4 space-y-8">
        {steps.map((step, index) => (
          <li key={index} className="ml-6 relative">
            <span
              className={`absolute -left-10 flex items-center justify-center w-8 h-8 rounded-full text-sm
              ${
                step.active
                  ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {step.icon}
            </span>

            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`font-semibold ${
                    step.active ? "text-indigo-600" : "text-gray-800"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-sm text-gray-500">
                  {step.subtitle}
                </p>
              </div>

              <span className="text-xs font-medium text-gray-400">
                {step.time}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
