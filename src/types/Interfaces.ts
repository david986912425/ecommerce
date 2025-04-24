export interface Product {
    _id: string
    title: string
    description: string
    price: number
    image: string
    category: string
}

export interface Filters {
    category: string
    minPrice: number
    maxPrice: number
    sortOrder: string
}