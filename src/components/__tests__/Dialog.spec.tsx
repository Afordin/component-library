import { useState } from "react";
import { Button } from "../Button/Button";
import { Dialog } from "../Dialog/Dialog";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const DialogTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open dialog
      </Button>
      <Dialog
        header={<h1>Tuki</h1>}
        footer={<Button>Venga, me suscribo</Button>}
        handleClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        showCloseButton
      >
        Test
      </Dialog>
    </>
  );
};

test("Can open Dialog", async () => {
  const component = render(<DialogTest />);

  const button = component.getByRole("button", {
    name: /open dialog/i,
  });

  const isThereADialog = component.queryByRole("dialog");
  expect(isThereADialog).toBeNull();

  userEvent.click(button);

  await component.findByRole("dialog");
});
