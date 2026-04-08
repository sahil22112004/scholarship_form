import Navbar from '@/components/navbar/navbar';
import React from 'react';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ backgroundColor: '#f3f2ef', minHeight: '100vh', paddingBottom: '20px' }}>
            <Navbar />
            {children}
        </div>
    );
}