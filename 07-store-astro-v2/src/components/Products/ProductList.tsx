import type { ProductWithImages } from '@/interfaces'
import {ProductCard} from './ProductCard'

interface ProductListProps {
    products: ProductWithImages[]
}

export const ProductList = ({products} : ProductListProps) => {
  return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 place-items-center">
        {products.map((product, index) => (
        <ProductCard key={product.id + index} product={product} />
        ))}
    </div>
  )
}



