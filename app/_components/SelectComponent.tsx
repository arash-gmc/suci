import { Select } from "@radix-ui/themes";
import React from "react";

interface Props {
  defaultValue: string | null;
  label: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  items: { label: string; value: string }[];
}

const SelectComponent = ({
  defaultValue,
  label,
  setState,
  state,
  items,
}: Props) => {
  return (
    <Select.Root
      defaultValue={defaultValue || undefined}
      onValueChange={(value) => setState(value)}
      value={state}
    >
      <Select.Trigger
        placeholder={label}
        className="w-full"
      />
      <Select.Content>
        {items.map((item) => (
          <Select.Item
            key={item.value}
            value={item.value}
          >
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default SelectComponent;
