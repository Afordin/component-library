import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterAll, beforeAll, expect, test, vi } from "vitest";
import { Toast, Toaster, useToaster } from "../Toaster/Toaster";
import { Button } from "../Button/Button";

const ToastLauncher = ({ toast }: { toast: Toast }) => {
  const { addToast } = useToaster();

  return (
    <Button
      onClick={() => {
        addToast(toast);
      }}
    >
      Render a toast
    </Button>
  );
};

const ToasterTest = ({ toast = "This is a toast!" }: { toast?: Toast }) => {
  return (
    <Toaster>
      <ToastLauncher toast={toast} />
    </Toaster>
  );
};

beforeAll(() => {
  Element.prototype.animate = vi.fn().mockImplementation(() => ({
    finished: Promise.resolve(),
    addEventListener: (type: string, callback: () => void) => callback(),
    play: vi.fn(),
  }))
});

afterAll(() => {
  vi.resetAllMocks();
});

test("Can trigger a toast", async () => {
  const component = render(<ToasterTest />);

  const isThereAToast = component.queryByRole("alert");
  expect(isThereAToast).toBeNull();

  const button = component.getByRole("button", {
    name: /render a toast/i,
  });
  userEvent.click(button);

  await component.findByRole("alert");
});

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

test("Toast stays on screen for >= given duration", async () => {
  const TOAST_WITH_CUSTOM_DURATION = {
    duration: 1000,
    content: "This is my second toast",
  };

  const component = render(<ToasterTest toast={TOAST_WITH_CUSTOM_DURATION} />);

  const button = component.getByRole("button", {
    name: /render a toast/i,
  });
  userEvent.click(button);

  await component.findByRole("alert");

  await sleep(TOAST_WITH_CUSTOM_DURATION.duration / 2);

  await component.findByRole("alert");

  await sleep(TOAST_WITH_CUSTOM_DURATION.duration / 2);

  const isThereAToast = component.queryByRole("alert");
  expect(isThereAToast).toBeNull();
});
