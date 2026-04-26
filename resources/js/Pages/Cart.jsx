import { Head, Link, router } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { useState, useEffect } from 'react';

export default function Cart({ cartItems, subtotal }) {
    const [items, setItems] = useState(cartItems);

    useEffect(() => {
        setItems(cartItems);
    }, [cartItems]);

    const formatPrice = (price) => {
        const cleanPrice = Number(price.toString().replace(/\./g, ''));
        return new Intl.NumberFormat('id-ID').format(cleanPrice);
    };

    const getPriceValue = (price) => {
        return Number(price.toString().replace(/\./g, ''));
    };

    const updateQuantity = (id, delta) => {
        const item = items.find(i => i.keranjang_id === id);
        const newQty = Math.max(1, item.keranjang_qty + delta);
        
        setItems(prev => prev.map(i => i.keranjang_id === id ? { ...i, keranjang_qty: newQty } : i));

        router.patch(`/cart/${id}`, {
            qty: newQty
        }, {
            preserveScroll: true
        });
    };

    const removeItem = (id) => {
        router.delete(`/cart/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setItems(prev => prev.filter(i => i.keranjang_id !== id));
            }
        });
    };

    const calculateSubtotalValue = () => {
        return items.reduce((sum, item) => sum + (getPriceValue(item.pakaian.pakaian_harga) * item.keranjang_qty), 0);
    };

    return (
        <UserLayout>
            <Head title="Keranjang Belanja" />

            <div className="cart-page">
                <div className="cart-container">
                    <header className="cart-header">
                        <h1 className="cart-title">Keranjang Belanja</h1>
                        <p className="cart-subtitle">{items.length} items ready for a new home.</p>
                    </header>

                    <div className="cart-layout">
                        {/* Cart Items */}
                        <div className="cart-items-section">
                            {items.length > 0 ? (
                                <div className="cart-list">
                                    {items.map((item) => (
                                        <div key={item.keranjang_id} className="cart-item-card">
                                            <div className="cart-item-image">
                                                <img src={item.pakaian.pakaian_gambar_url || '/images/default-product.png'} alt={item.pakaian.pakaian_nama} />
                                            </div>
                                            <div className="cart-item-details">
                                                <div className="item-header">
                                                    <div>
                                                        <h3 className="item-name">{item.pakaian.pakaian_nama}</h3>
                                                        <p className="item-price-label">
                                                            Harga satuan: Rp {formatPrice(item.pakaian.pakaian_harga)}
                                                        </p>
                                                    </div>
                                                    <div className="item-subtotal-info">
                                                        <span className="item-subtotal">
                                                            Rp {new Intl.NumberFormat('id-ID').format(getPriceValue(item.pakaian.pakaian_harga) * item.keranjang_qty)}
                                                        </span>
                                                        <span className="subtotal-label">SUBTOTAL</span>
                                                    </div>
                                                </div>

                                                <div className="item-actions">
                                                    <div className="quantity-selector small">
                                                        <button 
                                                            onClick={() => updateQuantity(item.keranjang_id, -1)}
                                                            className="qty-btn"
                                                            disabled={item.keranjang_qty <= 1}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="qty-value">{item.keranjang_qty}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.keranjang_id, 1)}
                                                            className="qty-btn"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button onClick={() => removeItem(item.keranjang_id)} className="remove-btn">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="trash-icon">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        </svg>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-cart">
                                    <p>Keranjang kamu masih kosong.</p>
                                    <Link href="/katalog" className="btn-text-link">Mulai belanja →</Link>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <aside className="cart-summary-section">
                            <div className="summary-card">
                                <h3 className="summary-title">Ringkasan Pesanan</h3>
                                
                                <div className="summary-rows">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>Rp {new Intl.NumberFormat('id-ID').format(calculateSubtotalValue())}</span>
                                    </div>
                                </div>

                                <div className="summary-total-row">
                                    <span>Total</span>
                                    <span className="total-amount">
                                        Rp {new Intl.NumberFormat('id-ID').format(calculateSubtotalValue())}
                                    </span>
                                </div>

                                <button className="checkout-btn" disabled={items.length === 0}>
                                    Lanjut ke Checkout
                                </button>
                                
                                <p className="secure-checkout-text">
                                    SECURE CHECKOUT BY THRIFTED BOUTIQUE
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
