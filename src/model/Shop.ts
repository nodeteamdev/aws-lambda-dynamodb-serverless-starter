interface Shop {
    shopId: string;
    name: string;
    address: string;
    location: [number, number];
    email: string;
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default Shop;
