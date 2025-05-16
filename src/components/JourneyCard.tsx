type JourneyCardProps = {
  title: string;
  summary: string;
};

export default function JourneyCard({ title, summary }: JourneyCardProps) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow hover:shadow-md transition cursor-pointer h-full">
      <div className="h-40 bg-gray-300 rounded mb-3" />
      <h2 className="font-semibold text-lg mb-1">{title}</h2>
      <p className="text-sm text-gray-600">{summary}</p>
    </div>
  );
}
