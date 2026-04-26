import { Link } from '@inertiajs/react';

export default function FeaturedProducts({ products }) {
    return (
        <section className="products">
            <div className="section-header">
                <div>
                    <h2 className="section-title">Produk Unggulan</h2>
                </div>
            </div>
            <div className="product-grid">
                {products && products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index} className="product-card">
                            <div className="product-image">
                                <img src={product.pakaian_gambar_url || '/images/default-product.png'} alt={product.pakaian_nama} />
                            </div>
                            <div className="product-info">
                                <span className="product-category">
                                    {product.kategori_pakaian?.kategori_pakaian_nama || 'General'}
                                </span>
                                <h3 className="product-name">{product.pakaian_nama}</h3>
                                <p className="product-price">
                                    Rp {new Intl.NumberFormat('id-ID').format(Number(product.pakaian_harga.toString().replace(/\./g, '')))}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Tidak ada produk unggulan saat ini.</p>
                )}
            </div>
        </section>
    );
}
