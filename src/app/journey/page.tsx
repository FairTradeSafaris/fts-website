"use client";

import { useState, useEffect } from "react";
import JourneyCard from "@/components/JourneyCard";

type Journey = {
  title: string;
  summary: string;
  wetuLink: string;
};

export default function JourneyFinderPage() {
  const journeys: Journey[] = [
    {
      title: "Kenya 7 Days Entry Sample",
      summary:
        "Explore Kenya in 7 unforgettable days — curated for first-time safari travelers.",
      wetuLink:
        "https://wetu.com/Itinerary/Landing/f2c47459-1a78-4732-a464-d7a59528d882",
    },
    {
      title: "BIG 5 SAFARI + CULTURE (12 DAYS 4 STAR LUXURY)",
      summary:
        "Wildlife meets culture in this immersive 12-day adventure across Southern Africa.",
      wetuLink:
        "https://wetu.com/Itinerary/Landing/ff2a2ace-923b-475c-b5e7-d7e04fbb871e",
    },
  ];

  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [filteredJourneys, setFilteredJourneys] = useState<Journey[]>(journeys);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Scroll lock when drawer is open
  useEffect(() => {
    if (selectedJourney) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedJourney]);
  useEffect(() => {
    const filtered = journeys.filter((journey) => {
      const matchesSearch =
        journey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journey.summary.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion = selectedRegion
        ? journey.summary.toLowerCase().includes(selectedRegion.toLowerCase())
        : true;

      return matchesSearch && matchesRegion;
    });

    setFilteredJourneys(filtered);
  }, [searchTerm, selectedRegion]);

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Explore Our Journeys</h1>

        {/* Toggle Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            {showFilters ? "Hide" : "Show"} Filters
          </button>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search journeys..."
              className="w-full sm:w-1/2 border border-gray-300 rounded px-4 py-2 mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="mb-4">
              <p className="font-semibold mb-1">Region:</p>
              <div className="flex flex-wrap gap-2">
                {["East Africa", "Southern Africa", "Central Africa"].map(
                  (region) => (
                    <button
                      key={region}
                      className={`px-3 py-1 rounded ${
                        selectedRegion === region
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() =>
                        setSelectedRegion((prev) =>
                          prev === region ? null : region
                        )
                      }
                    >
                      {region}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-1">Country:</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-gray-100 rounded">Kenya</button>
                <button className="px-3 py-1 bg-gray-100 rounded">
                  South Africa
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded">
                  Tanzania
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded">
                  Botswana
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-1">Star Level:</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-yellow-100 rounded">
                  3-Star
                </button>
                <button className="px-3 py-1 bg-yellow-200 rounded">
                  4-Star
                </button>
                <button className="px-3 py-1 bg-yellow-300 rounded">
                  5-Star
                </button>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-1">Experience Type:</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-green-100 rounded">
                  Migration
                </button>
                <button className="px-3 py-1 bg-green-100 rounded">
                  Cape Wine
                </button>
                <button className="px-3 py-1 bg-green-100 rounded">
                  Gorilla Trekking
                </button>
                <button className="px-3 py-1 bg-green-100 rounded">
                  Photography
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Journey Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJourneys.map((journey, index) => (
            <div key={index} onClick={() => setSelectedJourney(journey)}>
              <JourneyCard title={journey.title} summary={journey.summary} />
            </div>
          ))}
        </div>
      </div>

      {/* Backdrop + Drawer */}
      {selectedJourney && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSelectedJourney(null)}
          />

          <div className="fixed top-0 right-0 h-full w-full sm:w-[80vw] md:w-[60vw] lg:w-[45vw] bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out translate-x-0">
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-bold text-black">
                  {selectedJourney.title}
                </h2>
                <button
                  onClick={() => setSelectedJourney(null)}
                  className="text-2xl text-black"
                >
                  &times;
                </button>
              </div>

              <p className="text-gray-700 mt-4">{selectedJourney.summary}</p>

              <div className="mt-6 rounded overflow-hidden flex-grow">
                <iframe
                  src={selectedJourney.wetuLink}
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
