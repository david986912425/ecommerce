"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import styles from "./carousel.module.css"

interface CarouselProps {
    images: {
        src: string
        alt: string
    }[]
    autoplayInterval?: number
}

export default function Carousel({ images, autoplayInterval = 5000 }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Función para ir a la siguiente imagen
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }

    // Función para ir a la imagen anterior
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    }

    // Función para ir a una imagen específica
    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    // Autoplay
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, autoplayInterval)

        return () => clearInterval(interval)
    }, [autoplayInterval])

    return (
        <div className={styles.carousel}>
            {/* Imágenes */}
            <div className={styles.carouselInner}>
                {images.map((image, index) => (
                    <div key={index} className={`${styles.carouselItem} ${index === currentIndex ? styles.active : ""}`}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={image.src || "/placeholder.svg"}
                                alt={image.alt}
                                fill
                                priority={index === 0}
                                className={styles.carouselImage}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Controles de navegación */}
            <button className={`${styles.carouselControl} ${styles.prev}`} onClick={prevSlide}>
                <ChevronLeft size={24} />
            </button>
            <button className={`${styles.carouselControl} ${styles.next}`} onClick={nextSlide}>
                <ChevronRight size={24} />
            </button>

            {/* Indicadores */}
            <div className={styles.indicators}>
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ""}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}
