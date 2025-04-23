"use client"

import type React from "react"
import {useEffect, useState} from "react"
import styles from "./page.module.css"
import {Trash} from "lucide-react";

interface Filters {
    category: string
    minPrice: number
    maxPrice: number
    sortOrder: string
}

interface FiltersProps {
    categories: string[]
    filters: Filters
    onFilterChange: (filters: Partial<Filters>) => void
}

export default function ProductFilters({categories, filters, onFilterChange}: FiltersProps) {
    const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice])
    const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice)
    const [isAccordionOpen, setIsAccordionOpen] = useState(false)

    useEffect(() => {
        // Actualizar el rango de precios cuando cambia el filtro máximo
        setLocalMaxPrice(filters.maxPrice)
        setPriceRange([filters.minPrice, filters.maxPrice])
    }, [filters.maxPrice])

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value)
        setPriceRange([value, priceRange[1]])
        onFilterChange({minPrice: value, maxPrice: priceRange[1]})
    }

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value)
        setPriceRange([priceRange[0], value])
        onFilterChange({minPrice: priceRange[0], maxPrice: value})
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({category: e.target.value})
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({sortOrder: e.target.value})
    }

    const resetFilters = () => {
        onFilterChange({
            category: "",
            minPrice: 0,
            maxPrice: localMaxPrice,
            sortOrder: "default",
        })
        setPriceRange([0, localMaxPrice])
    }

    return (
        <div className={styles.filtersContainer}>
            <div className={styles.filtersHeader}>
                <h2 className={styles.filtersTitle}>Filtros</h2>
                <button onClick={resetFilters} className={styles.resetButton}>
                    <Trash size={16}/>
                    Limpiar filtros
                </button>
            </div>

            <div className={styles.filtersGrid}>
                <div className={styles.filterSection}>
                    <label className={styles.filterLabel}>Categoría</label>
                    <select className={styles.selectInput} value={filters.category} onChange={handleCategoryChange}>
                        <option value="">Todas las categorías</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterSection}>
                    <label className={styles.filterLabel}>Ordenar por precio</label>
                    <select className={styles.selectInput} value={filters.sortOrder} onChange={handleSortChange}>
                        <option value="default">Predeterminado</option>
                        <option value="asc">Precio: Menor a Mayor</option>
                        <option value="desc">Precio: Mayor a Menor</option>
                    </select>
                </div>
            </div>

            <div className={styles.accordionContainer}>
                <button
                    className={`${styles.accordionButton} ${isAccordionOpen ? styles.accordionOpen : ""}`}
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                >
                    Rango de Precio
                </button>

                {isAccordionOpen && (
                    <div className={styles.accordionContent}>
                        <div className={styles.priceRangeContainer}>
                            <div className={styles.priceInputs}>
                                <div className={styles.priceInputGroup}>
                                    <label htmlFor="minPrice" className={styles.priceLabel}>
                                        Mínimo:
                                    </label>
                                    <input
                                        id="minPrice"
                                        type="range"
                                        min="0"
                                        max={localMaxPrice}
                                        value={priceRange[0]}
                                        onChange={handlePriceChange}
                                        className={styles.rangeInput}
                                    />
                                    <span className={styles.priceValue}>${priceRange[0]}</span>
                                </div>

                                <div className={styles.priceInputGroup}>
                                    <label htmlFor="maxPrice" className={styles.priceLabel}>
                                        Máximo:
                                    </label>
                                    <input
                                        id="maxPrice"
                                        type="range"
                                        min="0"
                                        max={localMaxPrice}
                                        value={priceRange[1]}
                                        onChange={handleMaxPriceChange}
                                        className={styles.rangeInput}
                                    />
                                    <span className={styles.priceValue}>${priceRange[1]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
