import { Link } from '@inertiajs/react';

export default function Hero() {
    return (
        <section className="hero" style={{ backgroundImage: 'url(/images/hero-bg.png)' }}>
            <div className="hero-overlay">
                <h1 className="hero-title">Toko Thrift <span>Malang</span></h1>
                <p className="hero-subtitle">
                    Pakaian thrift pilihan, harga terjangkau. Temukan gaya unikmu di sini.
                </p>
                <Link href="/katalog" className="btn-primary">
                    Lihat Katalog
                </Link>
            </div>
        </section>
    );
}
