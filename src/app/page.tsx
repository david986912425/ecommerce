"use client"

import Navbar from "@/components/navbar"
import styles from "./page.module.css"
import Carousel from "@/components/carousel";
import {useEffect, useState} from "react";
import Features from "@/components/features/features";
import ProductCard from "@/components/ProductCard";

interface Product {
    _id: string
    title: string
    price: number
    image: string
    category?: string
}

export default function HomePage() {

    const carouselImages = [
        {
            src: "https://joyye.com/u_file/2209/photo/8634dbd42d.jpg",
            alt: "Sofás modernos",
        },
        {
            src: "https://joyye.com/u_file/2209/photo/8634dbd42d.jpg",
            alt: "Sofás con estilo",
        },
        {
            src: "https://joyye.com/u_file/2209/photo/8634dbd42d.jpg",
            alt: "Sofás con alma",
        },
        {
            src: "https://joyye.com/u_file/2209/photo/8634dbd42d.jpg",
            alt: "Sofás con alma",
        },
    ]

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                const res = await fetch("/api/products/last");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };

        fetchLatestProducts();
    }, []);


    return (
        <main className={styles.main}>
            <Navbar/>
            <section className={styles.carouselSection}>
                <h1 className={styles.mainHeading}>
                    Bienvenida a Señoras – Productos del hogar con estilo
                </h1>
                <Carousel images={carouselImages} autoplayInterval={5000} />
            </section>

            <Features/>

            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Productos destacados</h2>
                    <div className={styles.productsGrid}>
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} isNew={true}/>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.newsletterSection}>
                <div className={styles.newsletterContent}>
                    <h2 className={styles.newsletterTitle}>Suscríbete</h2>
                    <p className={styles.newsletterText}>
                        Recibe las últimas novedades y ofertas exclusivas directamente en tu correo.
                    </p>
                    <form className={styles.newsletterForm}>
                        <input type="email" placeholder="Tu correo electrónico" className={styles.newsletterInput}
                               required/>
                        <button type="submit" className={styles.newsletterButton}>
                            Suscribirse
                        </button>
                    </form>
                </div>
            </section>
        </main>
    )
}
