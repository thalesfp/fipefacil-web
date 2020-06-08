import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import * as ReactDeviceDetect from "react-device-detect";

import SelectVehicleType from "../SelectVehicleType";

// jest.mock("react-device-detect", () => ({
//   isMobile,
// }));

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
});
