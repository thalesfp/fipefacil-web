import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReactDeviceDetect from "react-device-detect";

import selectMaterialUiSelectOption from "../../utils/selectMaterialUiSelectOption";

import SelectBrand from "../SelectBrand";

jest.mock("react-device-detect", () => ({
  isMobile: jest.fn(),
}));

describe("SelectBrand", () => {
  describe("isMobile", () => {
    beforeAll(() => {
      ReactDeviceDetect.isMobile = true;
    });

    describe("when loading data", () => {
      it("should display loading message", () => {
        render(
          <SelectBrand
            isLoading={true}
            brands={[]}
            brandId={null}
            handleOnChange={() => {}}
          />
        );

        expect(screen.getByLabelText("Carregando marcas...")).toBeDefined();
      });
    });

    describe("with data", () => {
      const brands = {
        "Marcas Populares": [
          { name: "Popular Brand 1", sk: "POPULAR_BRAND#1" },
          { name: "Popular Brand 2", sk: "POPULAR_BRAND#2" },
          { name: "Popular Brand 3", sk: "POPULAR_BRAND#3" },
        ],
        "Outras Marcas": [
          { name: "Brand 1", sk: "BRAND#1" },
          { name: "Brand 2", sk: "BRAND#2" },
          { name: "Brand 3", sk: "BRAND#3" },
        ],
      };

      it("should have brandId selected", () => {
        render(
          <SelectBrand
            isLoading={false}
            brands={brands}
            brandId="POPULAR_BRAND#1"
            handleOnChange={() => {}}
          />
        );

        expect(screen.getByDisplayValue("Popular Brand 1")).toBeDefined();
      });

      it("should call handelOnChange function with modelId", async () => {
        const handleOnChange = jest.fn();

        render(
          <SelectBrand
            isLoading={false}
            brands={brands}
            brandId="POPULAR_BRAND#1"
            handleOnChange={handleOnChange}
          />
        );

        fireEvent.change(screen.getByTestId("select-brand"), {
          target: { value: "BRAND#2" },
        });

        expect(handleOnChange).toHaveBeenNthCalledWith(1, "BRAND#2");
      });
    });
  });

  describe("isDesktop", () => {
    beforeAll(() => {
      ReactDeviceDetect.isMobile = false;
    });

    describe("when loading data", () => {
      it("should display loading message", () => {
        render(
          <SelectBrand
            isLoading={true}
            brands={[]}
            brandId={null}
            handleOnChange={() => {}}
          />
        );

        expect(screen.getByLabelText("Carregando marcas...")).toBeDefined();
      });
    });

    describe("with data", () => {
      const brands = {
        "Marcas Populares": [
          { name: "Popular Brand 1", sk: "POPULAR_BRAND#1" },
          { name: "Popular Brand 2", sk: "POPULAR_BRAND#2" },
          { name: "Popular Brand 3", sk: "POPULAR_BRAND#3" },
        ],
        "Outras Marcas": [
          { name: "Brand 1", sk: "BRAND#1" },
          { name: "Brand 2", sk: "BRAND#2" },
          { name: "Brand 3", sk: "BRAND#3" },
        ],
      };

      it("should have brandId selected", () => {
        render(
          <SelectBrand
            isLoading={false}
            brands={brands}
            brandId="POPULAR_BRAND#1"
            handleOnChange={() => {}}
          />
        );

        expect(screen.getByText("Popular Brand 1")).toHaveClass(
          "MuiSelect-select"
        );
      });

      it("should call handelOnChange function with modelId", async () => {
        const handleOnChange = jest.fn();

        render(
          <SelectBrand
            isLoading={false}
            brands={brands}
            brandId="POPULAR_BRAND#1"
            handleOnChange={handleOnChange}
          />
        );

        await selectMaterialUiSelectOption(
          screen.getByTestId("select-brand"),
          "Brand 2"
        );

        expect(handleOnChange).toHaveBeenNthCalledWith(1, "BRAND#2");
      });
    });
  });
});
