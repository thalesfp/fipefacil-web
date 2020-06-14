import { useState, useEffect } from "react";

import api from "../api/api";

const organizeBrands = (allBrands = []) => {
  const popularBrands = [];
  const brands = [];

  allBrands.forEach((brand) =>
    brand.popular ? popularBrands.push(brand) : brands.push(brand)
  );

  return {
    "Marcas Populares": sortBrands(popularBrands),
    "Outras Marcas": sortBrands(brands),
  };
};

const sortBrands = (brands) =>
  brands.sort((brandA, brandB) => {
    const brandAName = brandA.name.toUpperCase();
    const brandBName = brandB.name.toUpperCase();

    if (brandAName > brandBName) {
      return 1;
    } else if (brandAName < brandBName) {
      return -1;
    }

    return 0;
  });

function useBrands(vehicleType) {
  const [brands, setBrands] = useState({ popularBrands: [], otherBrands: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await api.getBrands(vehicleType);

        setBrands(organizeBrands(result));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vehicleType]);

  return { isLoading, brands };
}

export default useBrands;
