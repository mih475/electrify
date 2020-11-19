export interface User {
  id: string;
  role: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  street: string;

  cart?: {
    status?: string;
    created?: string;
    items?: [
      {
        productId?: string;
        prod_name?: string;
        quantity?: number;
        prod_total?: number;
      }
    ];
  };
}
