import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import UserLayout from '@/Layouts/UserLayout';
import Hero from '@/Components/Hero';
import CategoryGrid from '@/Components/CategoryGrid';
import FeaturedProducts from '@/Components/FeaturedProducts';

export default function Welcome({ categories, featuredProducts }) {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }, []);

    return (
        <UserLayout>
            <Head title="Beranda" />
            
            <Hero />
            
            <div className="container">
                <CategoryGrid categories={categories} />
                <FeaturedProducts products={featuredProducts} />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 5%;
                }
            `}} />
        </UserLayout>
    );
}
