import type { Meta, StoryObj } from "@storybook/react-vite";

import type { VehicleLot } from "@/features/vehicles/types";
import { VehicleCard } from "@/components/VehicleCard/VehicleCard";

const baseVehicle: VehicleLot = {
    id: "vehicle-1",
    saleId: "sale-1",
    lotNumber: "101",
    make: "Audi",
    model: "A4",
    derivative: "40 TFSI S line",
    registrationYear: 2022,
    mileage: 12345,
    mileageUnit: "km",
    fuelType: "Petrol",
    transmission: "Automatic",
    colour: "Mythos Black",
    grade: "A",
    conditionNotes: "Well maintained with full service history.",
    imageUrls: ["https://picsum.photos/seed/audi-a4/640/480"],
};

const meta = {
    title: "Components/VehicleCard",
    component: VehicleCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof VehicleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        vehicle: baseVehicle,
    },
};

export const WithoutImage: Story = {
    args: {
        vehicle: { ...baseVehicle, imageUrls: [], grade: "C" },
    },
};
