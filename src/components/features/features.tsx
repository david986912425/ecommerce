import styles from "@/components/features/features.module.css";
import {ShoppingBag, TrendingUp, Truck} from "lucide-react";

export default function Features() {
    return (
        <section className={styles.featuresSection}>
            <div className={styles.featuresGrid}>
                <div className={styles.featureCard}>
                    <div className={styles.featureIconWrapper}>
                        <Truck className={styles.featureIcon}/>
                    </div>
                    <h3 className={styles.featureTitle}>Envío Gratuito</h3>
                    <p className={styles.featureText}>En pedidos superiores a 50€</p>
                </div>
                <div className={styles.featureCard}>
                    <div className={styles.featureIconWrapper}>
                        <ShoppingBag className={styles.featureIcon}/>
                    </div>
                    <h3 className={styles.featureTitle}>Garantía de Calidad</h3>
                    <p className={styles.featureText}>2 años en todos nuestros productos</p>
                </div>
                <div className={styles.featureCard}>
                    <div className={styles.featureIconWrapper}>
                        <TrendingUp className={styles.featureIcon}/>
                    </div>
                    <h3 className={styles.featureTitle}>Diseño Exclusivo</h3>
                    <p className={styles.featureText}>Piezas únicas para tu hogar</p>
                </div>
            </div>
        </section>
    )
}