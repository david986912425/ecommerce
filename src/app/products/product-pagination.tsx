"use client"

import styles from "./page.module.css"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function ProductPagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // Generar array de páginas a mostrar
    const getPageNumbers = () => {
        const pages = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            // Si hay pocas páginas, mostrar todas
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Mostrar un número limitado de páginas con la actual en el centro
            let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
            const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

            // Ajustar si estamos cerca del final
            if (endPage - startPage + 1 < maxPagesToShow) {
                startPage = Math.max(1, endPage - maxPagesToShow + 1)
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i)
            }

            // Añadir indicadores de "más páginas"
            if (startPage > 1) {
                pages.unshift(-1) // Indicador para "páginas anteriores"
            }

            if (endPage < totalPages) {
                pages.push(-2) // Indicador para "páginas siguientes"
            }
        }

        return pages
    }

    return (
        <div className={styles.pagination}>
            <button
                className={`${styles.paginationArrow} ${currentPage === 1 ? styles.paginationDisabled : ""}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="sr-only">Página anterior</span>
            </button>

            <div className={styles.paginationNumbers}>
                {getPageNumbers().map((pageNum, index) => {
                    if (pageNum === -1 || pageNum === -2) {
                        return (
                            <span key={`ellipsis-${index}`} className={styles.paginationEllipsis}>
                ...
              </span>
                        )
                    }

                    return (
                        <button
                            key={pageNum}
                            className={`${styles.paginationNumber} ${currentPage === pageNum ? styles.paginationActive : ""}`}
                            onClick={() => onPageChange(pageNum)}
                        >
                            {pageNum}
                        </button>
                    )
                })}
            </div>

            <button
                className={`${styles.paginationArrow} ${currentPage === totalPages ? styles.paginationDisabled : ""}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
                <span className="sr-only">Página siguiente</span>
            </button>
        </div>
    )
}
