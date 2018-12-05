export interface OrderDetails {
    orderId: string;
    clientId: string;
    userId: string;
    // services: Service[];
    price: string;
    deliveryAddressId: string;
    billingAddressId: string;
    // status: OrderStatus;
    description: string;
    // user: User;
    // company: Company;
    creationDate: string;
    deletionDate: string;

}
