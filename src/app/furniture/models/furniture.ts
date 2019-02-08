export interface Furniture {
    id:number;
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    description: string;
    createdBy: string;
    likes: [string] ;
    rewiews: [string];
}