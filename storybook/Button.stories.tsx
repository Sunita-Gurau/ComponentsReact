import React from "react";
import { Button, PlusIcon } from "../src/components/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    color: { control: 'text' },
    variant: { control: 'radio', options: ['filled', 'outlined', 'ghost'] },
  },
};

export const FilledBlue = () => <Button variant="filled">Filled Blue</Button>;
export const FilledRed = () => <Button variant="filled" color="red">Filled Red</Button>;
export const FilledGreen = () => <Button variant="filled" color="green">Filled Green</Button>;
export const FilledYellow = () => <Button variant="filled" color="yellow">Filled Yellow</Button>;

export const OutlinedRed = () => <Button variant="outlined" color="red">Outlined Red</Button>;
export const OutlinedGreen = () => <Button variant="outlined" color="green">Outlined Green</Button>;
export const OutlinedYellow = () => <Button variant="outlined" color="yellow">Outlined Yellow</Button>;

export const GhostRed = () => <Button variant="ghost" color="red">Ghost Red</Button>;
export const GhostGreen = () => <Button variant="ghost" color="green">Ghost Green</Button>;
export const GhostYellow = () => <Button variant="ghost" color="yellow">Ghost Yellow</Button>;

export const FilledWithIcon = () => <Button variant="filled" color="red" icon={PlusIcon}>With Icon</Button>;
export const OutlinedWithIcon = () => <Button variant="outlined" color="green" icon={PlusIcon}>With Icon</Button>;
export const GhostWithIcon = () => <Button variant="ghost" color="yellow" icon={PlusIcon}>With Icon</Button>;

export const OutlinedBlue = () => <Button variant="outlined">Outlined Blue</Button>;
export const GhostBlue = () => <Button variant="ghost">Ghost Blue</Button>;
export const FilledWithIconBlue = () => <Button variant="filled" icon={PlusIcon}>Filled With Icon Blue</Button>; 