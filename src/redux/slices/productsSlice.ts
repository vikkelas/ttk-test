import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "@/types";
import {getData} from "@/helpers/dataRequest.ts";
import {ProductSliceI, StatusLoadProduct} from "@/types/ProductSliceI.ts";
import {getErrorMessage} from "@/helpers/defaultFunction.ts";


const initialState:ProductSliceI = {
    basket: [],
    productList: [],
    status: StatusLoadProduct.INITIAL,
    error: null
}

const createSlice = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

const productsSlice = createSlice({
    name: 'productsState',
    initialState,
    reducers:(creators) =>({

        addBasket: creators.reducer((state, action: PayloadAction<Product>)=>{
            const product = action.payload ;
            const availabilityCheck = state.basket.findIndex(item=>item.id===product.id);
            if(availabilityCheck===-1){
                state.basket = [...state.basket, product]
            }
        }),

        removeFromBasket: creators.reducer((state, action: PayloadAction<number>)=>{
            const id = action.payload;
            state.basket = state.basket.filter(item=>item.id!==id)
        }),

        getAllProducts: creators.asyncThunk<
            Product[],
            void,
            {
                rejectValue: {
                    message: string
                }
            }
        >(async (_, {rejectWithValue})=>{

            try {
                return await getData<Product[]>('https://fakestoreapi.com/products')
            }catch (err){
                return rejectWithValue({message: getErrorMessage(err)})
            }

        },{

            pending: (state) => {
                state.status=StatusLoadProduct.LOADING;
                state.error = null;
            },

            fulfilled: (state, action: PayloadAction<Product[]>) => {
                state.status = StatusLoadProduct.RESOLVE;
                state.productList = action.payload;
            },

            rejected: (state, action) => {
                    console.log(action)
                    state.status = StatusLoadProduct.REJECTED;

            }

        })
    })
})

export const {addBasket, removeFromBasket, getAllProducts} = productsSlice.actions;
export default productsSlice.reducer;