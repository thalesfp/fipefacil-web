import React from "react";
import { render, screen } from "@testing-library/react";
import YearModelsPrices from "../YearModelsPrices";

describe("YearModelPrices", () => {
  describe("when loading year models", () => {
    it("should display activity indicator", () => {
      render(<YearModelsPrices isLoading={true} yearModels={[]} />);

      expect(screen.getByRole("progressbar")).toBeDefined();
    });
  });

  describe("with year models", () => {
    it("should display year model attributes", () => {
      const yearModels = [
        {
          year: 2018,
          fuelType: 1,
          sk: "YEAR_MODEL#2018-1",
          currentPrice: 45977,
        },
        {
          year: 2019,
          fuelType: 2,
          sk: "YEAR_MODEL#2018-2",
          currentPrice: 47507,
        },
        {
          year: 32000,
          fuelType: 3,
          sk: "YEAR_MODEL#2018-3",
          currentPrice: 50421,
        },
      ];

      render(<YearModelsPrices isLoading={false} yearModels={yearModels} />);

      expect(screen.getByText("2018")).toBeDefined();
      expect(screen.getByText("Gasolina")).toBeDefined();
      expect(screen.getByText(/R\$\s?45,977.00/)).toBeDefined();

      expect(screen.getByText("2019")).toBeDefined();
      expect(screen.getByText("Álcool")).toBeDefined();
      expect(screen.getByText(/R\$\s?47,507.00/)).toBeDefined();

      expect(screen.getByText("Zero KM")).toBeDefined();
      expect(screen.getByText("Diesel")).toBeDefined();
      expect(screen.getByText(/R\$\s?50,421.00/)).toBeDefined();
    });
  });
});
