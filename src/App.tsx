import { useState } from "react";
import { Accordion } from "./components/Accordion/Accordion";
import { Button } from "./components/Button/Button";
import { Dialog } from "./components/Dialog/Dialog";

const items = [
  {
    summary: "Is it accessible?",
    details: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    summary: "Is it unstyled?",
    details:
      "Yes. It's unstyled by default, giving you freedom over the look and feel.",
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-screen h-screen text-white flex flex-col justify-center items-center bg-[#050505]">
      <Button>Suscríbete</Button>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Abre el modal
      </Button>
      <hr className="border-white" />
      <div className="flex flex-col gap-20">
        <div>
          <p>Single</p>
          <Accordion items={items} />
        </div>
        <div>
          <p>Multiple</p>
          <Accordion items={items} multiple />
        </div>
        <div>
          <p>Single with open by default</p>
          <Accordion
            items={items}
            defaultOpen={{
              summary: "Is it accessible?",
              details: "Yes. It adheres to the WAI-ARIA design pattern.",
            }}
          />
        </div>
      </div>
      <Dialog
        header={
          <>
            <h1>Tuki</h1>
          </>
        }
        footer={<Button>Venga, me suscribo</Button>}
        showCloseButton
        handleClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
      >
        <>El contenido</>
      </Dialog>
    </div>
  );
}

export default App;
