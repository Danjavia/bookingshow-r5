import React, { useState } from "react";
import { useBookStore } from "@application/store/bookStore";
import EbookImage from "@assets/images/ebook.png";

const HeroComponent = ({ source = "google" }: { source?: string }) => {
  const [query, setQuery] = useState("");
  const { searchBooks } = useBookStore();

  const handleFormSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await searchBooks(query, source);
  };

  return (
    <section className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
          <div>
            <h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Find The Perfect Book For This Weekend
            </h1>

            <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">
              BookingShow! is the one-stop digital shop for all book lovers.
              Find the perfect book for your next weekend trip.
            </p>

            <form
              onSubmit={handleFormSearch}
              className="relative mt-8 rounded-full sm:mt-12"
            >
              <div className="relative">
                <div className="absolute rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                    {/*<Search className="w-5 h-5 text-gray-500" />*/}
                  </div>
                  <input
                    type="text"
                    placeholder="Try Rust, Go, React Dev etc."
                    className="block w-full py-4 pr-6 text-white text-2xl font-semibold placeholder-gray-500 bg-black border border-transparent rounded-full pl-8 sm:py-5 focus:border-transparent focus:ring-0"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-black uppercase transition-all duration-200 bg-white rounded-full sm:w-auto sm:py-3 hover:opacity-90"
                >
                  Search books
                </button>
              </div>
            </form>
          </div>

          <div className="relative">
            <div className="absolute inset-0">
              <svg
                className="blur-3xl filter opacity-70"
                style={{ filter: "blur(64px)" }}
                width="444"
                height="536"
                viewBox="0 0 444 536"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
                  fill="url(#hero-gradient)"
                />
                <defs>
                  <linearGradient
                    id="hero-gradient"
                    x1="82.7339"
                    y1="550.792"
                    x2="-39.945"
                    y2="118.965"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "var(--color-cyan-500)" }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "var(--color-purple-500)" }}
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="absolute inset-0">
              <img
                className="object-cover w-full h-full opacity-50"
                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png"
                alt=""
              />
            </div>

            <div className="relative w-full max-w-md mx-auto">
              <img
                src={EbookImage}
                alt="Ebook Image"
                className="animate-bounce animate-infinite animate-duration-[4000ms] animate-delay-500 animate-ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
