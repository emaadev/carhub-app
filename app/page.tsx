"use client";

import { useEffect, useState } from "react";

import { Hero } from "@/components";
import { CustomFilter, SearchBar, ShowMore } from "@/components/shared";
import { fetchCars } from "@/utils";
import CarCard from "@/components/shared/CarCard";
import { fuels, yearsOfProduction } from "@/constants";
import Image from "next/image";
import { CustomFilterProps } from "@/types";

// Definir el tipo para CustomFilter
type CustomFilterType<T> = React.FC<CustomFilterProps<T>>;

// Utilizar CustomFilterType con los tipos específicos
const FuelFilter: CustomFilterType<string> = CustomFilter;
const YearFilter: CustomFilterType<number> = CustomFilter;

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // TODO: Convert to CSR (Client Side Rendering)
  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || "",
  //   year: searchParams.year || 2022,
  //   fuel: searchParams.fuel || "",
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || "",
  // });

  // TODO: Client Side Rendering ->
  const [manufacturer, setManufacturer] = useState("");
  const [year, setYear] = useState(2022);
  const [fuel, setFuel] = useState("");
  const [limit, setLimit] = useState(10);
  const [model, setModel] = useState("");

  useEffect(() => {
    const getCars = async () => {
      try {
        setLoading(true);

        const fetchedCars = await fetchCars({
          manufacturer: manufacturer,
          year: year,
          fuel: fuel,
          limit: limit,
          model: model,
        });

        setAllCars(fetchedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    getCars();
  }, [manufacturer, year, fuel, limit, model]);

  const isDataEmpty =
    !Array.isArray(allCars) || allCars.length === 0 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className="home__filter-container">
            <FuelFilter title="fuel" options={fuels} setFilter={setFuel} />
            <YearFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {!loading ? (
          allCars.length > 0 ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car, index) => (
                  <CarCard key={index} car={car} />
                ))}
              </div>

              <ShowMore
                pageNumber={limit / 10}
                isNext={limit > allCars.length}
                setLimit={setLimit}
              />
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">
                Oops, no results.
              </h2>
            </div>
          )
        ) : (
          <div className="mt-16 w-full flex-center">
            <span className="loader" />
          </div>
        )}
      </div>
    </main>
  );
}
