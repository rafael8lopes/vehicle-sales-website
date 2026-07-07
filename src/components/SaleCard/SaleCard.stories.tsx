import type { Meta, StoryObj } from "@storybook/react-vite";

import type { PublicSale } from "@/features/sales/types";
import { SaleCard } from "@/components/SaleCard/SaleCard";

const baseSale: PublicSale = {
    id: "sale-1",
    title: "Winter Public Sale",
    description:
        "A curated selection of premium vehicles available to the public.",
    saleType: "public",
    state: "live",
    featured: false,
    startDateTime: "2026-01-05T10:00:00",
    endDateTime: "2026-01-05T15:00:00",
    countryCode: "GB",
    location: "London",
    locationType: "online",
    lotCount: 120,
    heroImageUrl: "https://picsum.photos/seed/winter-sale/640/360",
};

const meta = {
    title: "Components/SaleCard",
    component: SaleCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof SaleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Live: Story = {
    args: {
        sale: baseSale,
    },
};

export const WithoutImage: Story = {
    args: {
        sale: {
            ...baseSale,
            heroImageUrl: undefined,
            state: "upcoming",
            featured: true,
        },
    },
};
