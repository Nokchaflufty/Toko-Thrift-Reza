import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-column">
                    <h3 className="footer-logo">Toko Thrift Malang</h3>
                    <p className="footer-desc">
                        Menyediakan pakaian thrift pilihan terbaik di Malang. Berkualitas dan terjangkau.
                    </p>
                    <div className="footer-social">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>

                <div className="footer-column">
                    <h4>Explore</h4>
                    <ul className="footer-links">
                        <li><Link href="/katalog">Shop All</Link></li>
                        <li><Link href="/new-arrivals">New Arrivals</Link></li>
                        <li><Link href="/our-story">Our Story</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Support</h4>
                    <ul className="footer-links">
                        <li><Link href="/shipping">Shipping</Link></li>
                        <li><Link href="/returns">Returns</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><Link href="/faqs">FAQs</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Location</h4>
                    <div className="footer-contact">
                        <p>Jl. Soekarno-Hatta No. 45<br />Malang, Jawa Timur 65141</p>
                        <p>hello@tokothriftmalang.com</p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Toko Thrift Malang.</p>
                <div className="footer-bottom-links">
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
