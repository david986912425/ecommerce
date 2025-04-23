"use client"

import {useState} from "react"
import Link from "next/link"
import Image from "next/image"
import {Search, Home, User, ShoppingCart} from "lucide-react"
import styles from "./navbar.module.css"

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <header className={styles.header}>
            {/* Top announcement bar */}
            <div className={styles.announcementBar}>Descubre todas las novedades</div>

            {/* Main navbar */}
            <div className={styles.mainNavbar}>

                {/* Logo */}
                <Link href="/" className={styles.logoContainer}>
                    <Image src="https://joyye.com/u_file/2009/photo/b0967e96dd.png" alt="La Oca" width={150} height={70} className={styles.logo}/>
                </Link>

                {/* Right icons */}
                <div className={styles.navIcons}>
                    {/* Search bar */}
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                        <button className={styles.searchButton}>
                            <Search className={styles.searchIcon}/>
                        </button>
                    </div>

                    <Link href="/" className={styles.iconLink}>
                        <Home className={styles.icon}/>
                    </Link>
                    <Link href="/products" className={styles.iconLink}>
                        <ShoppingCart className={styles.icon}/>
                    </Link>
                    <Link href="/cuenta" className={styles.iconLink}>
                        <User className={styles.icon}/>
                    </Link>
                </div>
            </div>
        </header>
    )
}
