export type Drink = {
    id: string;
    name: string;
    alcoholic?: boolean;
    imageUrl: string;
    ingredients?: string[];
    price?: number
}

export const getDrinkPrice = (drink: Drink) => {
    return +drink.id % 100 < 40 ? 100 - +drink.id % 100 : +drink.id % 100;
}