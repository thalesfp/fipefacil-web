import React from "react";
import {
  act,
  render,
  screen,
  fireEvent,
  waitForDomChange,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import api from "../../api/api";

import SelectModel from "../SelectModel";

jest.mock("react-device-detect", () => ({
  isMobile: () => true,
}));

jest.mock("../../api/api", () => ({
  getModels: jest.fn(),
}));

describe("SelectModel", () => {
  describe("initial state", () => {
    beforeEach(() => {
      render(<SelectModel handleOnChange={() => {}} />);
    });

    it("should be disabled by default", async () => {
      expect(screen.getByTestId("select-model")).toHaveAttribute("disabled");
    });
  });

  describe("when a model is selected", () => {
    const handleOnChange = jest.fn();

    beforeEach(async () => {
      api.getModels.mockImplementationOnce(() =>
        Promise.resolve([
          { name: "Integra GS 1.8", sk: "MODEL#1" },
          { name: "Legend 3.2/3.5", sk: "MODEL#2" },
          { name: "NSX 3.0", sk: "MODEL#3" },
        ])
      );

      await act(async () => {
        render(
          <SelectModel
            brandId="BRAND#1"
            modelId="MODEL#1"
            handleOnChange={handleOnChange}
          />
        );

        await waitForDomChange();
      });
    });

    afterEach(() => {
      handleOnChange.mockClear();
    });

    it("should have select model enabled", () => {
      expect(screen.getByTestId("select-model")).not.toHaveAttribute(
        "disabled"
      );
    });

    it("should have modelId as option selected", () => {
      expect(screen.getByTestId("select-model")).toHaveValue("MODEL#1");
    });

    it("should call handelOnChange function with modelId", () => {
      fireEvent.change(screen.getByTestId("select-model"), {
        target: { value: "MODEL#2" },
      });

      expect(handleOnChange).toHaveBeenNthCalledWith(1, "MODEL#2");
    });
  });
});
