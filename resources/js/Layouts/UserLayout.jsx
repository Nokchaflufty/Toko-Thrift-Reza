import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import '@/../css/user.css';

export default function UserLayout({ children }) {
    return (
        <div className="user-layout">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
