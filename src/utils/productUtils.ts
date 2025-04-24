import {Filters, Product} from "@/types/Interfaces"

export function filterAndSortProducts(products: Product[], filters: Filters): Product[] {
    let result = [...products]

    if (filters.category && filters.category !== "all") {
        result = result.filter((product) => product.category === filters.category)
    }

    result = result.filter(
        (product) => product.price >= filters.minPrice && product.price <= filters.maxPrice
    )

    if (filters.sortOrder === "asc") {
        result.sort((a, b) => a.price - b.price)
    } else if (filters.sortOrder === "desc") {
        result.sort((a, b) => b.price - a.price)
    }

    return result
}

export function paginateProducts(products: Product[], currentPage: number, productsPerPage: number): Product[] {
    const start = (currentPage - 1) * productsPerPage
    const end = start + productsPerPage
    return products.slice(start, end)
}
