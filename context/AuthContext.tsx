'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser } from '@/types';

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoaded: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials for demo
const DEMO_CREDENTIALS = {
    email: 'admin@honey.com',
    password: 'admin123'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load from localStorage on client side
        const saved = localStorage.getItem('honey-herbal-user');
        if (saved) {
            setUser(JSON.parse(saved));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            if (user) {
                localStorage.setItem('honey-herbal-user', JSON.stringify(user));
            } else {
                localStorage.removeItem('honey-herbal-user');
            }
        }
    }, [user, isLoaded]);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
            setUser({
                email: DEMO_CREDENTIALS.email,
                name: 'Admin',
                role: 'admin'
            });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoaded, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
