import React from "react";
import HeroBanner from "./HeroBanner/HeroBanner";
import Categories from "./Categories/Categories";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import Benefits from "./Benefits/Benefits";

const HomePage: React.FC = () => {
    return(
      <>
      <main>
        <HeroBanner />
        <Categories />
        <FeaturedProducts />
        <Benefits />
      </main>
      </>
    )
}

export default HomePage