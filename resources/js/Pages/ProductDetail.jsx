import { Head, Link, usePage, router } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import LoginModal from '@/Components/LoginModal';
import { useState, useRef } from 'react';

export default function ProductDetail({ product, allProducts }) {
    const { auth } = usePage().props;
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollRef = useRef(null);

    const handleAddToCart = () => {
        if (!auth.user) {
            setIsModalOpen(true);
            return;
        }
        
        router.post('/cart', {
            pakaian_id: product.pakaian_id,
            qty: quantity
        }, {
            onSuccess: () => {
                // Success feedback is handled by flash messages or we can add a notification here
            }
        });
    };

    const handleQuantityChange = (type) => {
        if (type === 'plus') {
            if (quantity < product.pakaian_stok) {
                setQuantity(prev => prev + 1);
            }
        } else {
            if (quantity > 1) {
                setQuantity(prev => prev - 1);
            }
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' 
                ? scrollLeft - clientWidth * 0.5 
                : scrollLeft + clientWidth * 0.5;
            
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <UserLayout>
            <Head title={product.pakaian_nama} />

            <div className="product-detail-page">
                <div className="detail-container">
                    {/* Breadcrumbs */}
                    <nav className="breadcrumbs">
                        <Link href="/katalog">KATALOG</Link>
                        <span className="separator">›</span>
                        <span className="current">{product.kategori_pakaian?.kategori_pakaian_nama.toUpperCase()}</span>
                    </nav>

                    <div className="detail-main">
                        {/* Left - Image */}
                        <div className="detail-image-section">
                            <div className="detail-image-wrapper">
                                <img src={product.pakaian_gambar_url || '/images/default-product.png'} alt={product.pakaian_nama} />
                            </div>
                        </div>

                        {/* Right - Info */}
                        <div className="detail-info-section">
                            <span className="detail-category">{product.kategori_pakaian?.kategori_pakaian_nama.toUpperCase()}</span>
                            <h1 className="detail-name">{product.pakaian_nama}</h1>
                            <p className="detail-price">
                                Rp {new Intl.NumberFormat('id-ID').format(Number(product.pakaian_harga.toString().replace(/\./g, '')))}
                            </p>
                            <p className="detail-stock">Stok: {product.pakaian_stok} Tersedia</p>

                            <div className="detail-description">
                                <p>{product.pakaian_deskripsi || 'Tidak ada deskripsi untuk produk ini.'}</p>
                            </div>

                            <div className="detail-actions">
                                <div className="quantity-selector-container">
                                    <span className="action-label">Jumlah</span>
                                    <div className="quantity-selector">
                                        <button 
                                            onClick={() => handleQuantityChange('minus')}
                                            className="qty-btn"
                                            disabled={quantity <= 1}
                                        >
                                            −
                                        </button>
                                        <span className="qty-value">{quantity}</span>
                                        <button 
                                            onClick={() => handleQuantityChange('plus')}
                                            className="qty-btn"
                                            disabled={quantity >= product.pakaian_stok}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="detail-primary-actions">
                                    <button onClick={handleAddToCart} className="add-to-cart-btn">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                                            <line x1="3" y1="6" x2="21" y2="6"></line>
                                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                                        </svg>
                                        Tambah ke Keranjang
                                    </button>
                                    <Link href="/katalog" className="cancel-btn">
                                        Batal
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products Carousel */}
                    <section className="related-section">
                        <div className="section-header">
                            <div>
                                <h2 className="related-title">Produk Lainnya</h2>
                                <p className="related-subtitle">Jelajahi koleksi terbaik kami lainnya.</p>
                            </div>
                            <div className="carousel-controls">
                                <button onClick={() => scroll('left')} className="carousel-btn" aria-label="Previous">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                                <button onClick={() => scroll('right')} className="carousel-btn" aria-label="Next">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>
                        </div>

                        <div className="product-carousel-wrapper">
                            <div className="product-carousel" ref={scrollRef}>
                                {allProducts.map((item) => (
                                    <Link href={`/produk/${item.pakaian_id}`} key={item.pakaian_id} className="product-card carousel-item">
                                        <div className="product-image">
                                            <img src={item.pakaian_gambar_url || '/images/default-product.png'} alt={item.pakaian_nama} />
                                        </div>
                                        <div className="product-info">
                                            <h3 className="product-name">{item.pakaian_nama}</h3>
                                            <div className="product-meta">
                                                <p className="product-price">
                                                    Rp {new Intl.NumberFormat('id-ID').format(Number(item.pakaian_harga.toString().replace(/\./g, '')))}
                                                </p>
                                                <span className="dot">•</span>
                                                <span className="category-tag">{item.kategori_pakaian?.kategori_pakaian_nama}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <LoginModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </UserLayout>
    );
}
