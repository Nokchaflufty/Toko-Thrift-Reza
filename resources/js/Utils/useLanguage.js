import { useState, useEffect } from 'react';

const translations = {
    ID: {
        // Sidebar
        'Dashboard': 'Dashboard',
        'Product': 'Produk',
        'Category': 'Kategori',
        'Transaction': 'Transaksi',
        'Customers': 'Pelanggan',
        'Settings': 'Pengaturan',
        'Log Out': 'Keluar',
        'THRIFT ADMIN': 'ADMIN THRIFT',
        
        // Dashboard
        'Overview': 'Ikhtisar',
        'Performance insights for Toko Thrift Malang': 'Wawasan performa untuk Toko Thrift Malang',
        'TOTAL PRODUK': 'TOTAL PRODUK',
        'TOTAL KATEGORI': 'TOTAL KATEGORI',
        'TOTAL TRANSAKSI': 'TOTAL TRANSAKSI',
        'TOTAL PENGGUNA': 'TOTAL PENGGUNA',
        'Recent Transactions': 'Transaksi Terbaru',
        'NO.': 'NO.',
        'NAMA PENGGUNA': 'NAMA PENGGUNA',
        'TANGGAL': 'TANGGAL',
        'TOTAL HARGA': 'TOTAL HARGA',
        'METODE PEMBAYARAN': 'METODE PEMBAYARAN',
        'AKSI': 'AKSI',
        
        // General
        'Search...': 'Cari...',
        'Add New': 'Tambah Baru',
        'Save Changes': 'Simpan Perubahan',
        'Cancel': 'Batal',
        'Edit': 'Ubah',
        'Delete': 'Hapus',
    },
    EN: {
        // Sidebar
        'Dashboard': 'Dashboard',
        'Product': 'Product',
        'Category': 'Category',
        'Transaction': 'Transaction',
        'Customers': 'Customers',
        'Settings': 'Settings',
        'Log Out': 'Log Out',
        'THRIFT ADMIN': 'THRIFT ADMIN',
        
        // Dashboard
        'Overview': 'Overview',
        'Performance insights for Toko Thrift Malang': 'Performance insights for Toko Thrift Malang',
        'TOTAL PRODUK': 'TOTAL PRODUCT',
        'TOTAL KATEGORI': 'TOTAL CATEGORY',
        'TOTAL TRANSAKSI': 'TOTAL TRANSACTION',
        'TOTAL PENGGUNA': 'TOTAL USERS',
        'Recent Transactions': 'Recent Transactions',
        'NO.': 'NO.',
        'NAMA PENGGUNA': 'CUSTOMER NAME',
        'TANGGAL': 'DATE',
        'TOTAL HARGA': 'TOTAL PRICE',
        'METODE PEMBAYARAN': 'PAYMENT METHOD',
        'AKSI': 'ACTION',
        
        // General
        'Search...': 'Search...',
        'Add New': 'Add New',
        'Save Changes': 'Save Changes',
        'Cancel': 'Cancel',
        'Edit': 'Edit',
        'Delete': 'Delete',
    }
};

export function useLanguage() {
    const [lang, setLang] = useState(localStorage.getItem('language') || 'ID');

    useEffect(() => {
        const handleLangChange = () => {
            setLang(localStorage.getItem('language') || 'ID');
        };
        window.addEventListener('languageChanged', handleLangChange);
        return () => window.removeEventListener('languageChanged', handleLangChange);
    }, []);

    const t = (key) => {
        return translations[lang]?.[key] || key;
    };

    const changeLanguage = (newLang) => {
        localStorage.setItem('language', newLang);
        setLang(newLang);
        window.dispatchEvent(new Event('languageChanged'));
    };

    return { lang, t, changeLanguage };
}
