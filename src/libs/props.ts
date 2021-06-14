export interface ItemProps {
    id:number; 
    name:string; 
    image:string; 
    price:number; 
    ingredients: [
        {
            id:number, 
            name:string; 
            quantity:number;
            cost:number;
        }
    ]
}