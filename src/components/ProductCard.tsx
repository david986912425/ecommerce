"use client"

import {Heart} from "lucide-react"
import styles from "./productCard.module.css"
import {useState} from "react"
import Image from 'next/image'

interface Product {
    _id: string
    title: string
    price: number
    image: string
    category?: string
    isNew?: boolean
}

interface Props {
    product: Product
    isNew?: boolean
}

export default function ProductCard({product, isNew}: Props) {
    const [isLiked, setIsLiked] = useState(false)

    return (
        <div className={styles.productCard}>
            <div className={styles.productImageContainer}>
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className={styles.productImage}/>
                <button
                    className={styles.wishlistButton}
                    onClick={() => setIsLiked(!isLiked)}
                    aria-label="Añadir a favoritos"
                >
                    <Heart className={styles.wishlistIcon}/>
                </button>
                {isNew && <span className={styles.newBadge}>Nuevo</span>}
            </div>
            <div className={styles.productInfo}>
                {product.category && <span className={styles.productCategory}>{product.category}</span>}
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productPrice}>
                    {product.price.toLocaleString("es-PE", {style: "currency", currency: "PEN"})}
                </p>
                <button className={styles.addToCartButton}>Añadir al carrito</button>
            </div>
        </div>
    )
}