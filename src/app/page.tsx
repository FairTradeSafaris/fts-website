import { sanity } from "./sanity";
import Link from "next/link";

type HeroContent = {
  headline: string;
  subheadline: string;
  backgroundImage: {
    asset: {
      url: string;
    };
  };
  primaryCTA: string;
  secondaryCTA: string;
};

type WhyChooseBlock = {
  sectionTitle: string;
  reasons: {
    icon: string;
    title: string;
    description: string;
  }[];
};

type Journey = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  summary: string;
  duration: string;
  heroImage: {
    asset: {
      url: string;
    };
  };
  alt: string;
  ctaText: string;
};

export default async function Home() {
  const hero: HeroContent | null = await sanity.fetch(
    `*[_type == "hero"][0]{
      headline,
      subheadline,
      backgroundImage {
        asset->{url}
      },
      primaryCTA,
      secondaryCTA
    }`
  );

  const whyChoose: WhyChooseBlock | null = await sanity.fetch(
    `*[_type == "whyChoose"][0]{
      sectionTitle,
      reasons[] {
        icon,
        title,
        description
      }
    }`
  );

  const journeys: Journey[] = await sanity.fetch(
    `*[_type == "journey"]{
      _id,
      title,
      slug,
      summary,
      duration,
      heroImage {
        asset->{url}
      },
      alt,
      ctaText
    }`
  );

  if (!hero) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center text-red-600">
        <p>
          ⚠️ Hero content not found. Please add and publish it in Sanity Studio.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen font-poppins bg-white text-black">
      {/* Hero Section */}
      <section
        className="relative h-screen flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: hero.backgroundImage?.asset?.url
            ? `url(${hero.backgroundImage.asset.url})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-0" />
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            {hero.headline}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            {hero.subheadline}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
              {hero.primaryCTA}
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
              {hero.secondaryCTA}
            </button>
          </div>
        </div>
      </section>

      {/* Why Travel With Us Section */}
      {whyChoose && (
        <section className="py-20 bg-white text-black">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12">
              {whyChoose.sectionTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
              {whyChoose.reasons.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#fefcf9] rounded-2xl shadow-md p-6 flex flex-col items-start"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 min-h-[3rem]">
                    {item.title}
                  </h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="bg-[#f9f9f9] py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
            As Seen On
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 opacity-80">
            <img
              src="/logos/cbs_logo.svg"
              alt="CBS"
              className="h-10 object-contain"
            />
            <img
              src="/logos/usa-today.svg"
              alt="USA Today"
              className="h-10 object-contain"
            />
            <img
              src="/logos/fox.svg"
              alt="Fox"
              className="h-10 object-contain"
            />
            <img
              src="/logos/nbc.svg"
              alt="NBC"
              className="h-10 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Featured Journeys Section */}
      {journeys.length > 0 && (
        <section className="py-20 bg-[#f9f9f9] text-black">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12">Featured Journeys</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
              {journeys.map((j) => (
                <div
                  key={j._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img
                    src={j.heroImage.asset.url}
                    alt={j.alt}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{j.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">{j.duration}</p>
                    <p className="text-gray-700 mb-4">{j.summary}</p>
                    <Link href={`/journeys/${j.slug.current}`}>
                      <span className="inline-block bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition">
                        {j.ctaText}
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/journeys"
              className="mt-10 inline-block text-black border border-black px-5 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition"
            >
              See All Itineraries →
            </Link>
          </div>
        </section>
      )}
      <section className="bg-[#d8c3a5] text-black py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Plan Your Dream Safari?
          </h2>
          <p className="text-lg mb-8">
            Talk to our local experts and start customizing your perfect trip to
            Africa today.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-4 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Start Planning
          </Link>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-lg italic mb-4">
                “The most unforgettable experience of my life.”
              </p>
              <h4 className="font-semibold text-gray-800">— Jamie P.</h4>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-lg italic mb-4">
                “I felt safe, inspired, and completely at ease the entire time.”
              </p>
              <h4 className="font-semibold text-gray-800">— Maria N.</h4>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-lg italic mb-4">
                “Every detail was perfect — you’ve gained a lifelong customer.”
              </p>
              <h4 className="font-semibold text-gray-800">— Kevin R.</h4>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
          {/* Column 1: Logo & Mission */}
          <div>
            <h3 className="text-xl font-bold mb-4">Fair Trade Safaris</h3>
            <p>
              Purpose-led luxury safaris that empower communities and protect
              wildlife across Africa.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/journeys">Journeys</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-semibold mb-4">Plan With Us</h4>
            <p>
              Email:{" "}
              <a href="mailto:plan@fairtradesafaris.com" className="underline">
                plan@fairtradesafaris.com
              </a>
            </p>
            <p className="mt-2">
              <a
                href="/contact"
                className="inline-block mt-4 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
              >
                Start Planning
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Fair Trade Safaris. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
