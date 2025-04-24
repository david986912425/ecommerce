"use client"

import {useEffect, useState} from "react"
import styles from "./page.module.css"
import Navbar from "@/components/navbar"
import ProductCard from "@/components/ProductCard"
import ProductFilters from "./product-filters"
import ProductPagination from "./product-pagination"
import {filterAndSortProducts, paginateProducts} from "@/utils/productUtils"
import {Filters, Product} from "@/types/Interfaces"

export default function ProductsClient() {
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [categories, setCategories] = useState<string[]>([])
    const [filters, setFilters] = useState<Filters>({
        category: "",
        minPrice: 0,
        maxPrice: 1000,
        sortOrder: "default",
    })

    const productsPerPage = 8

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products", {cache: "no-store"})
                const data = await res.json()
                setProducts(data)

                const uniqueCategories = Array.from(new Set(data.map((p: Product) => p.category)))
                setCategories(uniqueCategories as string[])

                const maxPrice = Math.max(...data.map((p: Product) => p.price))
                setFilters((prev) => ({...prev, maxPrice: Math.ceil(maxPrice)}))

                setLoading(false)
            } catch (err) {
                console.error("Error fetching products:", err)
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        setFilteredProducts(filterAndSortProducts(products, filters))
        setCurrentPage(1)
    }, [filters, products])

    const currentProducts = paginateProducts(filteredProducts, currentPage, productsPerPage)
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const handleFilterChange = (newFilters: Partial<Filters>) => {
        setFilters({...filters, ...newFilters})
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    if (loading) {
        return (
            <>
                <Navbar/>
                <main className={styles.container}>
                    <ProductFilters categories={categories} filters={filters} onFilterChange={handleFilterChange}/>
                </main>
            </>
        )
    }

    return (
        <>
            <Navbar/>
            <main className={styles.container}>
                <ProductFilters categories={categories} filters={filters} onFilterChange={handleFilterChange}/>
                {filteredProducts.length === 0 ? (
                    <div className={styles.noResults}>
                        <p>No se encontraron productos con los filtros seleccionados.</p>
                    </div>
                ) : (
                    <>
                        <p className={styles.resultsCount}>
                            Mostrando {currentProducts.length} de {filteredProducts.length} productos
                        </p>
                        <div className={styles.grid}>
                            {currentProducts.map((product) => (
                                <ProductCard key={product._id} product={product}/>
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <ProductPagination currentPage={currentPage} totalPages={totalPages}
                                               onPageChange={handlePageChange}/>
                        )}
                    </>
                )}
            </main>
        </>
    )
}
