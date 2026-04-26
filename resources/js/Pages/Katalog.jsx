import { Head, Link, router } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { useState } from 'react';

export default function Katalog({ products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleCategoryFilter = (id) => {
        router.get(route('katalog'), { 
            ...filters, 
            category: id === filters.category ? null : id 
        }, { preserveState: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('katalog'), { ...filters, search }, { preserveState: true });
    };

    return (
        <UserLayout>
            <Head title="Katalog Produk" />

            <div className="catalog-page">
                <div className="catalog-container">
                    {/* Sidebar */}
                    <aside className="catalog-sidebar">
                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Kategori</h3>
                            <ul className="sidebar-list">
                                <li>
                                    <button 
                                        className={`sidebar-link ${!filters.category ? 'active' : ''}`}
                                        onClick={() => handleCategoryFilter(null)}
                                    >
                                        Semua Produk
                                    </button>
                                </li>
                                {categories.map((cat) => (
                                    <li key={cat.kategori_pakaian_id}>
                                        <button 
                                            className={`sidebar-link ${filters.category == cat.kategori_pakaian_id ? 'active' : ''}`}
                                            onClick={() => handleCategoryFilter(cat.kategori_pakaian_id)}
                                        >
                                            {cat.kategori_pakaian_nama}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="catalog-main">
                        <header className="catalog-header">
                            <div className="header-info">
                                <h1 className="header-title">Malang Collection</h1>
                                <p className="header-subtitle">Curated treasures from the heart of East Java.</p>
                            </div>
                        </header>

                        {/* Product Grid */}
                        <div className="catalog-grid">
                            {products.data.length > 0 ? (
                                products.data.map((product) => (
                                    <Link href={route('produk.show', product.pakaian_id)} key={product.pakaian_id} className="product-card">
                                        <div className="product-image">
                                            <img src={product.pakaian_gambar_url || '/images/default-product.png'} alt={product.pakaian_nama} />
                                        </div>
                                        <div className="product-info">
                                            <h3 className="product-name">{product.pakaian_nama}</h3>
                                            <div className="product-meta">
                                                <span>{product.kategori_pakaian?.kategori_pakaian_nama}</span>
                                                <span className="dot">•</span>
                                                <span>Stok: {product.pakaian_stok}</span>
                                            </div>
                                            <p className="product-price">
                                                Rp {new Intl.NumberFormat('id-ID').format(Number(product.pakaian_harga.toString().replace(/\./g, '')))}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="no-products">
                                    <p>Tidak ada produk yang ditemukan.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {products.links && products.links.length > 3 && (
                            <div className="pagination">
                                {products.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`pagination-link ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </UserLayout>
    );
}
