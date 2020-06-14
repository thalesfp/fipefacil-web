import { within, waitForElementToBeRemoved } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

const selectMaterialUiSelectOption = async (element, optionText) =>
  new Promise((resolve) => {
    const selectButton = element.parentNode.querySelector("[role=button]");

    UserEvent.click(selectButton);

    const listbox = document.body.querySelector("ul[role=listbox]");

    const listItem = within(listbox).getByText(optionText);
    UserEvent.click(listItem);

    waitForElementToBeRemoved(() =>
      document.body.querySelector("ul[role=listbox]")
    ).then(resolve);
  });

export default selectMaterialUiSelectOption;
