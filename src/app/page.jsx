'use client';

import { useContext } from "react";
import { GlobalContext } from "@/context";

import Image from "next/image.js";
import penderie from "public/img/products/penderie.jpg";

// import Promotions from "../data/promotions.json";
import CartGrid from "../components/CartGrid";
import ScrollToTop from "@/components/ScrollToTop";
import Animation from "@/components/Animation";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext)
  console.log(isAuthUser);

  return (
    <>
      {/* Header and banner */}
      <header
        data-header
        id="header"
        className="min-h-screen flex justify-center items-center lg:mt-0 lg:col-span-5 lg:flex p-0 bg-banner-2 bg-no-repeat bg-cover">
      </header>

      <div className="bg-black w-full h-12 flex justify-center items-center overflow-hidden mb-5 mx-auto">
        <div className="flex items-center">
          <span className="text-white font-serif text-[14px] uppercase whitespace-nowrap animation inline-block pl-[100%] pr-[2em]">
            Profitez de nos offres exclusives jusqu'à -50% jusqu'au 31 Décembre 2024.
          </span>
        </div>
      </div>

      {/* Presentation paragraph */}
      <section data-section id="first-section" className="my-10">
        <div className="m-auto w-full text-center flex justify-center items-center max-w-screen-xl">
          <div className="break-words m-auto w-calc-100-minus-8rem font-serif text-2xl">
            <h2>Vêtement pour la femme musulmane</h2>
            <div className="xl:w-[40rem] m-auto mt-8 text-[15px] leading-[1.5rem]">
              <p>
                <strong>Abayaty</strong> est une marque dédiée à la femme musulmane. Chez Abayaty, nous vous offrons une
                sélection exceptionnelle de modèles uniques qui allient pudeur et discrétion, tout
                en respectant le style et la législation qui sont importants pour les femmes musulmanes.
                Notre collection d'abayas reflète notre engagement envers vos valeurs, en proposant des
                vêtements amples et longs qui correspondent à vos besoins.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-16">
          <Image src={penderie} alt="Abaya penderie" className="md:w-[800px] h-full shadow-lg animation-appear" />
        </div>
        <div className="flex justify-center items-center bg-gray-300 w-[71.5%] mx-auto mt-10">
          <hr />
        </div>
      </section>

      {/* Product home page display */}
      <CartGrid />
      <Animation />
      <ScrollToTop className='z-50 fixed' />
    </>
  );
};