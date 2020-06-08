import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import * as ReactDeviceDetect from "react-device-detect";

import SelectVehicleType from "../SelectVehicleType";

import { within, waitForElementToBeRemoved } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

export const selectMaterialUiSelectOption = async (element, optionText) =>
  new Promise((resolve) => {
    // The the button that opens the dropdown, which is a sibling of the input
    const selectButton = element.parentNode.querySelector("[role=button]");

    // Open the select dropdown
    UserEvent.click(selectButton);

    // Get the dropdown element. We don't use getByRole() because it includes <select>s too.
    const listbox = document.body.querySelector("ul[role=listbox]");

    // Click the list item
    const listItem = within(listbox).getByText(optionText);
    UserEvent.click(listItem);

    // Wait for the listbox to be removed, so it isn't visible in subsequent calls
    waitForElementToBeRemoved(() =>
      document.body.querySelector("ul[role=listbox]")
    ).then(resolve);
  });

describe("SelectVehicleType", () => {
  describe("isMobile", () => {
    beforeAll(() => {
      ReactDeviceDetect.isMobile = true;
    });

    it("should render selected vehicle type", () => {
      render(
        <SelectVehicleType handleOnChange={() => {}} vehicleTypeSelected={2} />
      );

      expect(screen.getByText("Moto").selected).toBe(true);
    });

    it("should call handleOnChange with vehicle type id", () => {
      const handleOnChange = jest.fn();
      const newVehicleTypeId = 2;

      render(
        <SelectVehicleType
          handleOnChange={handleOnChange}
          vehicleTypeSelected={1}
        />
      );

      fireEvent.change(screen.getByLabelText("Tipo de Veículo"), {
        target: { value: newVehicleTypeId },
      });

      expect(handleOnChange).toHaveBeenNthCalledWith(1, newVehicleTypeId);
    });
  });

  describe("isDesktop", () => {
    beforeAll(() => {
      ReactDeviceDetect.isMobile = false;
    });

    it("should render selected vehicle type", () => {
      render(
        <SelectVehicleType handleOnChange={() => {}} vehicleTypeSelected={2} />
      );

      expect(screen.getByText("Moto")).toBeDefined();
    });

    it("should call handleOnChange with vehicle type id", async () => {
      const handleOnChange = jest.fn();
      const newVehicleTypeId = 2;

      render(
        <SelectVehicleType
          handleOnChange={handleOnChange}
          vehicleTypeSelected={1}
        />
      );

      await selectMaterialUiSelectOption(
        screen.getByTestId("select-vehicle-type"),
        "Moto"
      );

      expect(handleOnChange).toHaveBeenNthCalledWith(1, newVehicleTypeId);
    });
  });
});
