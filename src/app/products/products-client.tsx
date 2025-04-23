"use client"

import {useEffect, useState} from "react"
import styles from "./page.module.css"
import Navbar from "@/components/navbar"
import ProductCard from "@/components/ProductCard"
import ProductFilters from "./product-filters"
import ProductPagination from "./product-pagination"

interface Product {
    _id: string
    title: string
    description: string
    price: number
    image: string
    category: string
}

interface Filters {
    category: string
    minPrice: number
    maxPrice: number
    sortOrder: "default" | "asc" | "desc"
}

export default function ProductsClient() {
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [categories, setCategories] = useState<string[]>([])
    const [filters, setFilters] = useState({
        category: "",
        minPrice: 0,
        maxPrice: 1000,
        sortOrder: "default",
    })

    const productsPerPage = 8

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products", {
                    cache: "no-store",
                })
                const data = await res.json()
                setProducts(data)

                // Extraer categorías únicas
                const uniqueCategories = Array.from(new Set(data.map((product: Product) => product.category)))
                setCategories(uniqueCategories as string[])

                // Encontrar el precio máximo para el rango
                const maxProductPrice = Math.max(...data.map((p: Product) => p.price))
                setFilters((prev) => ({...prev, maxPrice: Math.ceil(maxProductPrice)}))

                setLoading(false)
            } catch (error) {
                console.error("Error fetching products:", error)
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        // Aplicar filtros y ordenamiento
        let result = [...products]

        // Filtro por categoría
        if (filters.category && filters.category !== "all") {
            result = result.filter((product) => product.category === filters.category)
        }

        // Filtro por precio
        result = result.filter((product) => product.price >= filters.minPrice && product.price <= filters.maxPrice)

        // Ordenamiento
        if (filters.sortOrder === "asc") {
            result.sort((a, b) => a.price - b.price)
        } else if (filters.sortOrder === "desc") {
            result.sort((a, b) => b.price - a.price)
        }

        setFilteredProducts(result)
        setCurrentPage(1) // Resetear a la primera página cuando cambian los filtros
    }, [filters, products])

    // Obtener productos para la página actual
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const handleFilterChange = (newFilters: Partial<Filters>) => {
        setFilters({...filters, ...newFilters})
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        // Scroll to top when changing page
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    if (loading) {
        return (
            <>
                <Navbar/>
                <div className={styles.container}>
                    <h1 className={styles.heading}>Productos</h1>
                    <div className={styles.loadingGrid}>
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className={styles.loadingCard}>
                                <div className={styles.loadingSkeleton}></div>
                                <div className={styles.loadingContent}>
                                    <div className={styles.loadingTitle}></div>
                                    <div className={styles.loadingText}></div>
                                    <div className={styles.loadingText}></div>
                                    <div className={styles.loadingPrice}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
