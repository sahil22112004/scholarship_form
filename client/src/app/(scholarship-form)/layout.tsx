import Navbar from '@/components/navbar/navbar';
import React from 'react';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ backgroundColor: '#f3f2ef', height: '100vh', paddingBottom: '20px',overflowY:'hidden' }}>
            <Navbar />
            {children}
        </div>
    );
}