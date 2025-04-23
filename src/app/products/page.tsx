import { Suspense } from "react"
import ProductsClient from "./products-client"
import ProductsLoading from "./loading"

export default function ProductsPage() {
    return (
        <Suspense fallback={<ProductsLoading />}>
            <ProductsClient />
        </Suspense>
    )
}
