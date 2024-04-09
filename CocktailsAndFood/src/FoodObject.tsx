export type Food = {
    _id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface DishCardProps {
    food: Food;
}