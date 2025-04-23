import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Señoras | Productos del hogar con estilo",
    description: "Descubre los mejores productos del hogar diseñados especialmente para mujeres con estilo. Novedades, decoración, y funcionalidad para tu hogar.",
    keywords: ["productos del hogar", "decoración", "mujeres", "señoras", "novedades hogar", "estilo de vida", "hogar con estilo"],
    authors: [{name: "Tu Marca"}],
    openGraph: {
        title: "Señoras | Productos del hogar con estilo",
        description: "Inspiración y novedades en productos del hogar pensados para mujeres modernas.",
        type: "website",
        locale: "es_ES",
        siteName: "Señoras",
    },
    robots: {
        index: true,
        follow: true,
    }
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es">
        <body className={inter.className}>
        {children}
        </body>
        </html>
    )
}
