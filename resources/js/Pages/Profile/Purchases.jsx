import { Head, Link } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

function formatDate(value) {
    if (!value) return '-';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
}

function formatMoney(value) {
    const n = Number(value || 0);
    return `Rp${new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(n)}`;
}

export default function Purchases({ orders }) {
    return (
        <UserLayout>
            <Head title="Riwayat Pembelian" />

            <div className="profile-page">
                <div className="profile-container">
                    <aside className="profile-sidebar">
                        <div className="sidebar-header">
                            <h2 className="sidebar-title">Profile</h2>
                            <p className="sidebar-subtitle">
                                Review and track your past orders.
                            </p>
                        </div>
                        <nav className="profile-nav">
                            <Link href="/profile" className="nav-item">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="nav-icon"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                Personal Info
                            </Link>

                            <Link
                                href="/profile/purchases"
                                className="nav-item active"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="nav-icon"
                                >
                                    <path d="M6 2h12l3 6v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8l3-6Z"></path>
                                    <path d="M3 8h18"></path>
                                    <path d="M16 12a4 4 0 0 1-8 0"></path>
                                </svg>
                                Riwayat Pembelian
                            </Link>

                            <button
                                onClick={() => window.history.back()}
                                className="nav-item"
                                type="button"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="nav-icon"
                                >
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                                Kembali
                            </button>
                        </nav>
                    </aside>

                    <main className="profile-main">
                        <section className="profile-section purchase-history">
                            <div className="purchase-header">
                                <h3 className="section-title">Purchase History</h3>
                                <div className="purchase-meta">
                                    <span className="purchase-count">
                                        {orders?.length || 0} orders
                                    </span>
                                </div>
                            </div>

                            {orders?.length ? (
                                <div className="orders-list">
                                    {orders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="order-block"
                                        >
                                            <div className="order-top">
                                                <div className="order-title">
                                                    <span className="order-label">
                                                        ORDER #{order.id}
                                                    </span>
                                                    <span className="order-dot">
                                                        •
                                                    </span>
                                                    <span className="order-date">
                                                        {formatDate(order.date)}
                                                    </span>
                                                </div>

                                                <div className="order-right">
                                                    <span
                                                        className={`order-status status-${String(
                                                            order.status || '',
                                                        ).toLowerCase()}`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="order-sub">
                                                <div className="order-sub-left">
                                                    <span className="order-pay">
                                                        Metode:{' '}
                                                        <b>
                                                            {order.payment?.type ||
                                                                '-'}
                                                        </b>
                                                        {order.payment?.number
                                                            ? ` • ${order.payment.number}`
                                                            : ''}
                                                    </span>
                                                </div>
                                                <div className="order-sub-right">
                                                    <span className="order-total">
                                                        Total:{' '}
                                                        <b>
                                                            {formatMoney(
                                                                order.total,
                                                            )}
                                                        </b>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="order-items-grid">
                                                {(order.items || []).map(
                                                    (it) => (
                                                        <div
                                                            key={it.id}
                                                            className="order-item-card"
                                                        >
                                                            <div className="order-item-img">
                                                                <img
                                                                    src={
                                                                        it.product
                                                                            ?.image ||
                                                                        '/images/default-product.png'
                                                                    }
                                                                    alt={
                                                                        it.product
                                                                            ?.name ||
                                                                        'Product'
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="order-item-info">
                                                                <div className="order-item-name">
                                                                    {it.product
                                                                        ?.name ||
                                                                        'Produk tidak tersedia'}
                                                                </div>
                                                                <div className="order-item-sub">
                                                                    <span className="pill">
                                                                        Qty{' '}
                                                                        {it.qty}
                                                                    </span>
                                                                    <span className="order-item-price">
                                                                        {formatMoney(
                                                                            it.line_total,
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-orders">
                                    <p>
                                        Kamu belum punya riwayat pembelian.
                                    </p>
                                    <Link href="/katalog" className="btn-text-link">
                                        Mulai belanja →
                                    </Link>
                                </div>
                            )}
                        </section>
                    </main>
                </div>
            </div>
        </UserLayout>
    );
}

