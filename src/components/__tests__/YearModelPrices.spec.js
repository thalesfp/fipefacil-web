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
          year: 2011,
          fuelType: 1,
          sk: "YEAR_MODEL#2011-1",
          currentPrice: 45977,
        },
        {
          year: 2012,
          fuelType: 2,
          sk: "YEAR_MODEL#2012-1",
          currentPrice: 47507,
        },
      ];

      render(<YearModelsPrices isLoading={false} yearModels={yearModels} />);

      expect(screen.getByText("2011")).toBeDefined();
      expect(screen.getByText("Gasolina")).toBeDefined();
      expect(screen.getByText("R$45,977.00")).toBeDefined();

      expect(screen.getByText("2012")).toBeDefined();
      expect(screen.getByText("Álcool")).toBeDefined();
      expect(screen.getByText("R$47,507.00")).toBeDefined();
    });
  });
});
