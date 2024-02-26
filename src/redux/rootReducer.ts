import {combineSlices} from "@reduxjs/toolkit";
import productsSlice from "@/redux/slices/productsSlice.ts";

const rootReducer = combineSlices({
    productState: productsSlice,
})


export default rootReducer;