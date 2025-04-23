"use client"

import {useState} from "react"
import Link from "next/link"
import Image from "next/image"
import {Home, Menu, Search, ShoppingCart, User, X} from "lucide-react"
import styles from "./navbar.module.css"

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <header className={styles.header}>
            {/* Top announcement bar */}
            <div className={styles.announcementBar}>Descubre todas las novedades</div>

            {/* Main navbar */}
            <div className={styles.mainNavbar}>
                {/* Logo */}
                <Link href="/" className={styles.logoContainer}>
                    <Image
                        src="https://joyye.com/u_file/2009/photo/b0967e96dd.png"
                        alt="La Oca"
                        width={150}
                        height={70}
                        className={styles.logo}
                    />
                </Link>

                {/* Right icons */}
                <div className={styles.navIcons}>
                    {/* Search bar (desktop) */}
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

                    {/* Desktop navigation icons */}
                    <Link href="/" className={styles.iconLink}>
                        <Home className={styles.icon}/>
                    </Link>
                    <Link href="/products" className={styles.iconLink}>
                        <ShoppingCart className={styles.icon}/>
                    </Link>
                    <Link href="/cuenta" className={styles.iconLink}>
                        <User className={styles.icon}/>
                    </Link>

                    {/* Mobile menu toggle */}
                    <button className={styles.menuToggle} onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X className={styles.menuIcon}/> : <Menu className={styles.menuIcon}/>}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}>
                {/* Mobile search */}
                <div className={styles.mobileSearchContainer}>
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

                {/* Mobile navigation links */}
                <Link href="/" className={styles.mobileIconLink}>
                    <Home className={styles.mobileIcon}/>
                    <span>Inicio</span>
                </Link>
                <Link href="/products" className={styles.mobileIconLink}>
                    <ShoppingCart className={styles.mobileIcon}/>
                    <span>Productos</span>
                </Link>
                <Link href="/cuenta" className={styles.mobileIconLink}>
                    <User className={styles.mobileIcon}/>
                    <span>Mi Cuenta</span>
                </Link>
            </div>
        </header>
    )
}
