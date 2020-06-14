import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReactDeviceDetect from "react-device-detect";

import selectMaterialUiSelectOption from "../../utils/selectMaterialUiSelectOption";

import SelectModel from "../SelectModel";

jest.mock("react-device-detect", () => ({
  isMobile: jest.fn(),
}));

describe("SelectModel", () => {
  describe("isMobile", () => {
    beforeAll(() => {
      ReactDeviceDetect.isMobile = true;
    });

    describe("when any model is selected", () => {
      it("should have disabled property", () => {
        render(
          <SelectModel
            disableSelect={true}
            isLoading={false}
            models={[]}
            modelId={null}
            handleOnChange={() => {}}
          />
        );

        expect(screen.getByTestId("select-model")).toHaveAttribute("disabled");
      });
    });

    describe("when loading models", () => {
      it("should display loading message", () => {
        render(
          <SelectModel
            disableSelect={false}
            isLoading={true}
            models={[]}
            modelId={null}
            handleOnChange={() => {}}
          />
        );

        expect(screen.getByLabelText("Carregando modelos...")).toBeDefined();
      });
    });

    describe("with data", () => {
      const models = [
        { name: "MODEL 1", sk: "MODEL#1" },
        { name: "MODEL 2", sk: "MODEL#2" },
        { name: "MODEL 3", sk: "MODEL#3" },
      ];

      it("should have modelId selected", () => {
        render(
          <SelectModel
            disableSelect={false}
            isLoading={false}
            models={models}
            modelId="MODEL#2"
            handleOnChange={() => {}}
          />
        );

        expect(screen.getByDisplayValue("MODEL 2")).toBeDefined();
      });

      it("should call handelOnChange function with modelId", async () => {
        const handleOnChange = jest.fn();

        render(
          <SelectModel
            disableSelect={false}
            isLoading={false}
            models={models}
            modelId="MODEL#1"
            handleOnChange={handleOnChange}
          />
        );

        fireEvent.change(screen.getByTestId("select-model"), {
          target: { value: "MODEL#2" },
        });

        expect(handleOnChange).toHaveBeenNthCalledWith(1, "MODEL#2");
      });
    });
  });

  describe("isDesktop", () => {
    beforeAll(() => {
      ReactDeviceDetect.isMobile = false;
    });

    describe("when any model is selected", () => {
      it("should have disabled property", () => {
        render(
          <SelectModel
            disableSelect={true}
            isLoading={false}
            models={[]}
            modelId={null}
            handleOnChange={() => {}}
          />
        );

        expect(screen.getByRole("button")).toHaveClass("Mui-disabled");
      });
    });

    describe("when loading models", () => {
      it("should display loading message", () => {
        render(
          <SelectModel
            disableSelect={false}
            isLoading={true}
            models={[]}
            modelId={null}
            handleOnChange={() => {}}
          />
        );

        expect(screen.getByLabelText("Carregando modelos...")).toBeDefined();
      });
    });

    describe("with data", () => {
      const models = [
        { name: "MODEL 1", sk: "MODEL#1" },
        { name: "MODEL 2", sk: "MODEL#2" },
        { name: "MODEL 3", sk: "MODEL#3" },
      ];

      it("should have modelId selected", () => {
        render(
          <SelectModel
            disableSelect={false}
            isLoading={false}
            models={models}
            modelId="MODEL#1"
            handleOnChange={() => {}}
          />
        );

        expect(screen.getByText("MODEL 1")).toHaveClass("MuiSelect-select");
      });

      it("should call handelOnChange function with modelId", async () => {
        const handleOnChange = jest.fn();

        render(
          <SelectModel
            disableSelect={false}
            isLoading={false}
            models={models}
            modelId="MODEL#1"
            handleOnChange={handleOnChange}
          />
        );

        await selectMaterialUiSelectOption(
          screen.getByTestId("select-model"),
          "MODEL 2"
        );

        expect(handleOnChange).toHaveBeenNthCalledWith(1, "MODEL#2");
      });
    });
  });
});
