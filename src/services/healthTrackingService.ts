import { type HealthMetric, type MetricType } from '../types';

const STORAGE_KEY = 'wellness_ai_data';

interface StorageData {
    metrics: Record<MetricType, HealthMetric[]>;
    userProfile?: {
        goal?: string;
    };
}

const INITIAL_DATA: StorageData = {
    metrics: {
        weight: [],
        sleep: [],
        steps: [],
        blood_pressure_sys: [],
        blood_pressure_dia: [],
        height: []
    }
};

const getStorageData = (): StorageData => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        return INITIAL_DATA;
    }
    try {
        const parsedData = JSON.parse(data, (key, value) => {
            if (key === 'date') return new Date(value);
            return value;
        });

        // Merge with initial data to ensure all keys exist
        return {
            ...INITIAL_DATA,
            ...parsedData,
            metrics: {
                ...INITIAL_DATA.metrics,
                ...(parsedData.metrics || {})
            }
        };
    } catch (error) {
        console.error("Error parsing health data:", error);
        return INITIAL_DATA;
    }
};

const saveStorageData = (data: StorageData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const saveMetric = (type: MetricType, value: number, unit: string) => {
    const data = getStorageData();
    const newMetric: HealthMetric = {
        id: Date.now().toString(),
        type,
        value,
        unit,
        date: new Date()
    };

    if (!data.metrics[type]) {
        data.metrics[type] = [];
    }

    data.metrics[type].push(newMetric);
    saveStorageData(data);
    return newMetric;
};

export const getHistory = (type: MetricType): HealthMetric[] => {
    const data = getStorageData();
    return data.metrics[type] || [];
};

export const getAllMetrics = () => {
    const data = getStorageData();
    return data.metrics;
};

export const saveUserGoal = (goal: string) => {
    const data = getStorageData();
    data.userProfile = { ...data.userProfile, goal };
    saveStorageData(data);
};

export const getUserGoal = (): string | undefined => {
    const data = getStorageData();
    return data.userProfile?.goal;
};
