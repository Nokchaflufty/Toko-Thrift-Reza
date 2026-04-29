import { Head, Link, useForm } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { useMemo, useState } from 'react';

const PAYMENT_LABEL = {
    DANA: { title: 'DANA', subtitle: 'Saldo Digital • Instant' },
    OVO: { title: 'OVO', subtitle: 'Saldo Digital • Instant' },
    BCA: { title: 'BCA Virtual Account', subtitle: null },
    COD: { title: 'COD (Bayar di Tempat)', subtitle: 'Bayar saat pesanan tiba' },
};

function formatRupiah(value) {
    const n = Number(value || 0);
    return `Rp${new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(n)}`;
}

function getPriceValue(price) {
    if (price === null || price === undefined) return 0;
    return Number(price.toString().replace(/\./g, '')) || 0;
}

export default function Checkout({ cartItems, total, paymentMethods }) {
    const defaultType = paymentMethods?.[0]?.metode_pembayaran_jenis || 'DANA';
    const defaultMethodId = paymentMethods?.[0]?.metode_pembayaran_id || null;

    const { data, setData, post, processing } = useForm({
        payment_method_id: defaultMethodId,
        payment_method_type: defaultType,
        payment_method_number:
            paymentMethods?.[0]?.metode_pembayaran_nomor || '',
    });

    const [useNewMethod, setUseNewMethod] = useState(
        !defaultMethodId || paymentMethods.length === 0,
    );

    const summaryItems = useMemo(() => {
        return (cartItems || []).map((item) => {
            const price = getPriceValue(item?.pakaian?.pakaian_harga);
            const qty = Number(item?.keranjang_qty || 0);
            return {
                id: item.keranjang_id,
                name: item?.pakaian?.pakaian_nama,
                image: item?.pakaian?.pakaian_gambar_url || '/images/default-product.png',
                qty,
                price,
                lineTotal: price * qty,
            };
        });
    }, [cartItems]);

    const submit = (e) => {
        e.preventDefault();
        post('/checkout', {
            preserveScroll: true,
        });
    };

    const selectExisting = (method) => {
        setUseNewMethod(false);
        setData({
            payment_method_id: method.metode_pembayaran_id,
            payment_method_type: method.metode_pembayaran_jenis,
            payment_method_number: method.metode_pembayaran_nomor || '',
        });
    };

    const selectNewType = (type) => {
        setUseNewMethod(true);
        setData((prev) => ({
            ...prev,
            payment_method_id: null,
            payment_method_type: type,
            payment_method_number:
                type === 'BCA' ? prev.payment_method_number : '',
        }));
    };

    const showNumberField = data.payment_method_type === 'BCA';

    return (
        <UserLayout>
            <Head title="Checkout" />

            <div className="checkout-page">
                <div className="checkout-container">
                    <header className="checkout-header">
                        <h1 className="checkout-title">Checkout</h1>
                        <p className="checkout-subtitle">
                            Complete your curated collection.
                        </p>
                    </header>

                    <div className="checkout-layout">
                        <section className="checkout-main">
                            <h3 className="checkout-section-title">
                                Pilih Metode Pembayaran
                            </h3>

                            <form onSubmit={submit} className="payment-form">
                                <div className="payment-list">
                                    {(paymentMethods || []).map((m) => {
                                        const meta =
                                            PAYMENT_LABEL[m.metode_pembayaran_jenis] ||
                                            PAYMENT_LABEL.DANA;
                                        const selected =
                                            !useNewMethod &&
                                            data.payment_method_id ===
                                                m.metode_pembayaran_id;

                                        return (
                                            <button
                                                key={m.metode_pembayaran_id}
                                                type="button"
                                                className={`payment-item ${
                                                    selected ? 'selected' : ''
                                                }`}
                                                onClick={() => selectExisting(m)}
                                            >
                                                <div className="payment-left">
                                                    <span
                                                        className={`radio-dot ${
                                                            selected ? 'on' : ''
                                                        }`}
                                                    />
                                                    <div className="payment-text">
                                                        <div className="payment-title">
                                                            {meta.title}
                                                        </div>
                                                        <div className="payment-subtitle">
                                                            {meta.subtitle ||
                                                                m.metode_pembayaran_nomor ||
                                                                ''}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="payment-icon">
                                                    <span className="payment-badge">
                                                        {m.metode_pembayaran_jenis}
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}

                                    {(['DANA', 'OVO', 'BCA', 'COD'] || []).map(
                                        (type) => {
                                            const meta =
                                                PAYMENT_LABEL[type] ||
                                                PAYMENT_LABEL.DANA;
                                            const selected =
                                                useNewMethod &&
                                                data.payment_method_type === type;

                                            return (
                                                <button
                                                    key={`new-${type}`}
                                                    type="button"
                                                    className={`payment-item ${
                                                        selected ? 'selected' : ''
                                                    }`}
                                                    onClick={() => selectNewType(type)}
                                                >
                                                    <div className="payment-left">
                                                        <span
                                                            className={`radio-dot ${
                                                                selected ? 'on' : ''
                                                            }`}
                                                        />
                                                        <div className="payment-text">
                                                            <div className="payment-title">
                                                                {meta.title}
                                                            </div>
                                                            <div className="payment-subtitle">
                                                                {meta.subtitle || ''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="payment-icon">
                                                        <span className="payment-badge">
                                                            {type}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        },
                                    )}
                                </div>

                                <div className="payment-add-row">
                                    <button
                                        type="button"
                                        className="payment-add-link"
                                        onClick={() => setUseNewMethod(true)}
                                    >
                                        + Tambah Metode Pembayaran Baru
                                    </button>
                                </div>

                                {showNumberField && useNewMethod && (
                                    <div className="payment-number-field">
                                        <label>Nomor Virtual Account</label>
                                        <input
                                            value={data.payment_method_number}
                                            onChange={(e) =>
                                                setData(
                                                    'payment_method_number',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Contoh: 8001 0812 3456 7890"
                                        />
                                    </div>
                                )}

                                <div className="checkout-actions">
                                    <Link href="/cart" className="return-link">
                                        ← Return to Cart
                                    </Link>
                                    <button
                                        type="submit"
                                        className="confirm-btn"
                                        disabled={
                                            processing ||
                                            !summaryItems.length ||
                                            (showNumberField &&
                                                useNewMethod &&
                                                !data.payment_method_number)
                                        }
                                    >
                                        Konfirmasi Pembelian
                                    </button>
                                </div>
                            </form>
                        </section>

                        <aside className="checkout-summary">
                            <div className="summary-card checkout-summary-card">
                                <h3 className="summary-title">Order Summary</h3>

                                <div className="checkout-summary-items">
                                    {summaryItems.map((it) => (
                                        <div
                                            key={it.id}
                                            className="checkout-summary-item"
                                        >
                                            <div className="checkout-summary-img">
                                                <img
                                                    src={it.image}
                                                    alt={it.name}
                                                />
                                            </div>
                                            <div className="checkout-summary-meta">
                                                <div className="checkout-summary-name">
                                                    {it.name}
                                                </div>
                                                <div className="checkout-summary-sub">
                                                    <span className="pill">
                                                        Qty {it.qty}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="checkout-summary-price">
                                                {formatRupiah(it.lineTotal)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="checkout-summary-total">
                                    <span>Total Harga</span>
                                    <span className="checkout-total-amount">
                                        {formatRupiah(total)}
                                    </span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

