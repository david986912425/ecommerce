import styles from "./page.module.css"
import Navbar from "@/components/navbar"

export default function ProductsLoading() {
    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <h1 className={styles.heading}>Productos</h1>

                <div className={styles.loadingFilters}>
                    <div className={styles.loadingSkeleton} style={{height: "40px", width: "300px"}}></div>
                    <div className={styles.loadingFilterGrid}>
                        <div className={styles.loadingSkeleton} style={{height: "40px", width: "200px"}}></div>
                        <div className={styles.loadingSkeleton} style={{height: "40px", width: "200px"}}></div>
                    </div>
                </div>

                <div className={styles.loadingGrid}>
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className={styles.loadingCard}>
                            <div className={styles.loadingSkeleton} style={{height: "200px"}}></div>
                            <div className={styles.loadingContent}>
                                <div className={styles.loadingSkeleton} style={{height: "16px", width: "75%"}}></div>
                                <div className={styles.loadingSkeleton} style={{height: "12px", width: "100%"}}></div>
                                <div className={styles.loadingSkeleton} style={{height: "12px", width: "100%"}}></div>
                                <div className={styles.loadingSkeleton} style={{height: "20px", width: "25%"}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
