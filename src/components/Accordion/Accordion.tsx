import { useState } from "react";

type Item = {
  summary: string;
  details: string;
};

type SingleAccordionProps = {
  items: Item[];
  multiple?: false;
  defaultOpen?: Item;
};

type MultipleAccordionProps = {
  items: Item[];
  multiple: true;
  defaultOpen?: Item[];
};

type AccordionProps = SingleAccordionProps | MultipleAccordionProps;

export const Accordion = ({
  items,
  multiple = false,
  defaultOpen,
}: AccordionProps) => {
  const [expandedItems, setExpandedItems] = useState<Item[]>(
    defaultOpen ? [defaultOpen].flat() : []
  );

  const open = (item: Item) => {
    setExpandedItems((currentExpandedItems) =>
      multiple ? [...currentExpandedItems, item] : [item]
    );
  };

  const close = (item: Item) => {
    setExpandedItems((currentExpandedItems) =>
      currentExpandedItems.filter(
        (expandedItem) => expandedItem.summary !== item.summary
      )
    );
  };

  return (
    <ul>
      {items.map((item) => {
        const isOpen = expandedItems.some(
          (expandedItem) => expandedItem.summary === item.summary
        );

        return (
          <li key={item.summary}>
            <details
              {...(isOpen && { open: isOpen })}
              onClick={(event) => {
                const newItem = {
                  summary: item.summary,
                  details: item.details,
                };

                isOpen ? close(newItem) : open(newItem);

                event.preventDefault();
              }}
            >
              <summary>{item.summary}</summary>
              {item.details}
            </details>
          </li>
        );
      })}
    </ul>
  );
};
