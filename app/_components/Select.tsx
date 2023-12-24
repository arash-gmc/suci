import { newUserSchema } from "@/app/api/user/register/schema";
import { Select } from "@radix-ui/themes";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { z } from "zod";

type InputFields = z.infer<typeof newUserSchema>;

interface Props {
  name: keyof InputFields;
  label: string;
  control: Control<InputFields>;
  items: { label: string; value: string }[];
}

const SelectComponent = ({ name, control, label, items }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select.Root onValueChange={field.onChange}>
          <Select.Trigger placeholder={label} />
          <Select.Content>
            {items.map((item) => (
              <Select.Item
                value={item.value}
                key={item.value}
              >
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      )}
    />
  );
};

export default SelectComponent;
