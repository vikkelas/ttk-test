import { Product } from '@/types'
import {
  CheckIcon,
  ShoppingBagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import React, {memo, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {addBasket, removeFromBasket} from "@/redux/slices/productsSlice.ts";

type Props = {
  product: Product
  className?: string
}

const FooterItemItem:React.FC<{checkBasket: boolean, product:Product}> = memo(({checkBasket, product})=>{
  const dispatch = useAppDispatch();
  const handleAddBasket = () => {
    dispatch(addBasket(product))
  }
  const handleDeleteBasket = () => {
    dispatch(removeFromBasket(product.id))
  }
  return (
      <>
        {checkBasket?
            // Товар добавлен в корзину
            <div className="flex items-center gap-2">
              <div className="flex flex-grow items-center justify-center gap-2 border-2 border-emerald-500 rounded-lg py-1.5 px-4">
                <CheckIcon strokeWidth={2} className="h-6 w-6 text-emerald-500" />
                <span className="text-emerald-500 font-medium">Added</span>
              </div>
              <button
                  onClick={handleDeleteBasket}
                  className="flex group items-center justify-center gap-2 rounded-lg p-1.5 border-2 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-800 active:border-neutral-700 active:bg-neutral-700">
                <TrashIcon
                    strokeWidth={2}
                    className="h-6 w-6 text-neutral-700 group-hover:text-neutral-200 group-active:text-neutral-200"
                />
              </button>
            </div>:
            // Товар не добавлен в корзину
            <button
                onClick={handleAddBasket}
                className="flex items-center justify-center gap-2 rounded-lg py-2 px-4 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700">
              <ShoppingBagIcon
                  strokeWidth={2}
                  className="h-6 w-6 text-neutral-200"
              />
              <span className="text-neutral-200 font-medium">Add to cart</span>
            </button>
        }
      </>
  )
})
const FooterCard:React.FC<{product:Product}> = ({product})=>{
  const {basket} = useAppSelector(state => state.productState)
  const checkBasket = useMemo(() => {
    return basket.findIndex(i => i.id === product.id)!==-1
  }, [product.id, basket])
  return <FooterItemItem checkBasket={checkBasket} product={product}/>
}

export const ProductCard = memo(function ProductCard({ product, className }: Props) {
  return (
      <article
          className={clsx(
              'flex flex-col gap-4 bg-white rounded-xl p-4 shadow-card',
              className
          )}
      >
        <div className="aspect-square grid relative rounded-lg">
          <img
              src={product.image}
              alt={product.title}
              className="absolute object-contain w-full h-full"
          />
        </div>
        <span className="h-px w-2/3 self-center bg-neutral-200" />
        <div className="flex flex-grow flex-col gap-4">
          <h3 className="text-xl font-medium line-clamp-2 mb-auto">
            {product.title}
          </h3>
          <div className="grid gap-3">
            <div className="flex items-center flex-wrap justify-between gap-4">
              <div className="flex items-center gap-1">
                <span className="text-3xl text-emerald-500 font-bold">$</span>
                <span className="text-3xl text-emerald-500 font-bold">
                {product.price}
              </span>
              </div>
              <div className="flex items-center gap-1">
                <StarIcon strokeWidth={2} className="w-6 h-6 text-amber-500" />
                <span className="text-2xl text-amber-500 font-bold">
                {product.rating.rate}
              </span>
              </div>
            </div>
            <FooterCard product={product}/>
          </div>
        </div>
      </article>
  )
})
