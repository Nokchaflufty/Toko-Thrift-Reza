import { Link } from '@inertiajs/react';

export default function CategoryGrid({ categories }) {
    // Duplicate categories to ensure seamless loop
    const duplicatedCategories = categories && categories.length > 0 
        ? [...categories, ...categories, ...categories, ...categories] 
        : [];

    return (
        <section className="categories">
            <div className="section-header">
                <div>
                    <h2 className="section-title">Shop by Category</h2>
                    <p className="section-subtitle">Pilihan terbaik untuk gayamu.</p>
                </div>
            </div>
            
            <div className="category-ticker-wrapper">
                <div className="category-ticker">
                    {duplicatedCategories.length > 0 ? (
                        duplicatedCategories.map((cat, index) => (
                            <Link href={`/katalog?category=${cat.kategori_pakaian_id}`} key={index} className="category-card ticker-item">
                                <img src={cat.kategori_pakaian_foto || '/images/default-category.png'} alt={cat.kategori_pakaian_nama} />
                                <div className="category-overlay">
                                    <span>{cat.kategori_pakaian_nama}</span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>Tidak ada kategori tersedia.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
