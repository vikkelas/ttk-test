import { FaceFrownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { PopoverProduct } from './PopoverProduct'
import {Product} from "@/types";

type Props = { className?: string, basket: Product[] | [] }

export function CartPopover({ className, basket }: Props) {


  return (
    <div
      className={clsx(
        'rounded-xl bg-white p-4 grid gap-4 shadow-popover',
        className
      )}
    >
      {!basket.length?
          // Корзина пуста
        <div className="grid justify-items-center">
          <FaceFrownIcon className="h-9 w-9 text-neutral-600" />
          <span>The cart is empty</span>
        </div>:
          // В корзине есть товары
        <ul className="grid gap-3">
          {basket.map((item, index)=>{
            return (
              <li key={index} className="grid pb-3 border-b border-neutral-200 last:pb-0 last:border-b-0">
                <PopoverProduct product={item} className="max-w-80" />
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}
