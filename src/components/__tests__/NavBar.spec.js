import React from "react";
import mediaQuery from "css-mediaquery";
import { render, screen } from "@testing-library/react";

import NavBar from "../NavBar";

import normalizeReferenceDate from "../../utils/normalizeReferenceDate";

function createMatchMedia(width) {
  return (query) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
}

describe("NavBar", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  describe("when loading reference", () => {
    it("should display activity indicator", () => {
      render(<NavBar isLoading={true} reference={null} />);

      expect(screen.getByRole("progressbar")).toBeDefined();
    });
  });

  describe("with reference", () => {
    it("should display reference", () => {
      const reference = normalizeReferenceDate({
        year: 2020,
        createdAt: "2020-06-05T00:45:01.105Z",
        sk: "256",
        pk: "REF",
        month: 6,
      });

      render(<NavBar isLoading={false} reference={reference} />);

      expect(screen.getByText("Junho/2020")).toBeDefined();
    });
  });
});
