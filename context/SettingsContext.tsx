'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Settings } from '@/types';
import { mockSettings } from '@/data/mockData';
import { settingsApi } from '@/services/api';

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Settings) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(mockSettings);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const data = await settingsApi.get();
            if (data) {
                setSettings(data);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const updateSettings = async (newSettings: Settings) => {
        try {
            // Optimistic update
            setSettings(newSettings);
            await settingsApi.update(newSettings);
        } catch (error) {
            console.error('Failed to update settings:', error);
            // Revert on error (could re-fetch)
            fetchSettings();
        }
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
