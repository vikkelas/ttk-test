import clsx from 'clsx'
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {getAllProducts} from "@/redux/slices/productsSlice.ts";
import {useEffect} from "react";
import {ProductCard} from "@/components/ProductList/ProductCard.tsx";



type Props = { className?: string }

export function ProductList({ className }: Props) {
    const dispatch = useAppDispatch()
    const {productList} = useAppSelector(state => state.productState)
    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch]);

  return (
    <ul
      className={clsx(
        'grid gap-4 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]',
        className
      )}
    >
      {productList.map((product) => (
        <li key={product.id} className="grid">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
