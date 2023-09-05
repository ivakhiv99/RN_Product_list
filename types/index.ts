
type NewProductFormData = {
    title: string,
    price: string,
    description: string,
}

type Product = {
    id: string;
    image: string;
    title: string;
    price: number;
    description: string;
}


export { Product, NewProductFormData }
