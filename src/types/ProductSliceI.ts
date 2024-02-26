import {Product} from "@/types/Product.ts";

export enum StatusLoadProduct {
    INITIAL='initial',
    LOADING='loading',
    RESOLVE='resolve',
    REJECTED='rejected',
}
export interface ProductSliceI{
    basket: [] | Product[];
    productList: [] | Product[];
    status: StatusLoadProduct;
    error: null |string;
}