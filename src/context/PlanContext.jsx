'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
    const [plan, setPlan] = useState([]);
    const [saved, setSaved] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Hydrate state from localStorage on client mount
    useEffect(() => {
        try {
            const storedPlan = localStorage.getItem('fitlog_today_plan');
            const storedSaved = localStorage.getItem('fitlog_saved');
            const storedCompleted = localStorage.getItem('fitlog_completed');

            if (storedPlan) setPlan(JSON.parse(storedPlan));
            if (storedSaved) setSaved(JSON.parse(storedSaved));
            if (storedCompleted) setCompleted(JSON.parse(storedCompleted));
        } catch (error) {
            console.error('Failed to load fitlog data from localStorage:', error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    const addToPlan = (workout) => {
        if (!workout) return { success: false };

        if (plan.some((item) => String(item.id) === String(workout.id))) {
            toast.warning('Already added to today\'s plan!', {
                position: 'bottom-right',
                theme: 'dark',
                autoClose: 3000,
            });
            return { success: false, reason: 'exists' };
        }

        if (plan.length >= 5) {
            toast.warning('Cap of 5 lifts for today reached!', {
                position: 'bottom-right',
                theme: 'dark',
                autoClose: 3000,
            });
            return { success: false, reason: 'limit' };
        }

        const newPlan = [...plan, workout];
        setPlan(newPlan);
        try {
            localStorage.setItem('fitlog_today_plan', JSON.stringify(newPlan));
        } catch (e) {}

        toast.success(`Added "${workout.name}" to today's plan!`, {
            position: 'bottom-right',
            theme: 'dark',
            autoClose: 3000,
        });
        return { success: true };
    };

    const removeFromPlan = (id) => {
        const itemToRemove = plan.find((item) => String(item.id) === String(id));
        const newPlan = plan.filter((item) => String(item.id) !== String(id));
        setPlan(newPlan);

        const newCompleted = completed.filter((cId) => String(cId) !== String(id));
        setCompleted(newCompleted);

        try {
            localStorage.setItem('fitlog_today_plan', JSON.stringify(newPlan));
            localStorage.setItem('fitlog_completed', JSON.stringify(newCompleted));
        } catch (e) {}

        toast.info(`Removed "${itemToRemove?.name || 'Workout'}" from today's plan`, {
            position: 'bottom-right',
            theme: 'dark',
            autoClose: 3000,
        });
    };

    const toggleSave = (workout) => {
        if (!workout) return;
        const exists = saved.some((item) => String(item.id) === String(workout.id));
        let newSaved;
        if (exists) {
            newSaved = saved.filter((item) => String(item.id) !== String(workout.id));
            toast.info(`Removed "${workout.name}" from saved`, {
                position: 'bottom-right',
                theme: 'dark',
                autoClose: 3000,
            });
        } else {
            newSaved = [...saved, workout];
            toast.success(`Saved "${workout.name}" for later!`, {
                position: 'bottom-right',
                theme: 'dark',
                autoClose: 3000,
            });
        }
        setSaved(newSaved);
        try {
            localStorage.setItem('fitlog_saved', JSON.stringify(newSaved));
        } catch (e) {}
    };

    const removeFromSaved = (id) => {
        const itemToRemove = saved.find((item) => String(item.id) === String(id));
        const newSaved = saved.filter((item) => String(item.id) !== String(id));
        setSaved(newSaved);
        try {
            localStorage.setItem('fitlog_saved', JSON.stringify(newSaved));
        } catch (e) {}

        toast.info(`Removed "${itemToRemove?.name || 'Workout'}" from saved`, {
            position: 'bottom-right',
            theme: 'dark',
            autoClose: 3000,
        });
    };

    const toggleCompleted = (id) => {
        const isDone = completed.some((cId) => String(cId) === String(id));
        const item = plan.find((w) => String(w.id) === String(id));
        const newCompleted = isDone
            ? completed.filter((cId) => String(cId) !== String(id))
            : [...completed, id];
        setCompleted(newCompleted);
        try {
            localStorage.setItem('fitlog_completed', JSON.stringify(newCompleted));
        } catch (e) {}

        if (!isDone) {
            toast.success(`Marked "${item?.name || 'Workout'}" as completed! ✓`, {
                position: 'bottom-right',
                theme: 'dark',
                autoClose: 3000,
            });
        } else {
            toast.info(`Unmarked "${item?.name || 'Workout'}"`, {
                position: 'bottom-right',
                theme: 'dark',
                autoClose: 2000,
            });
        }
    };

    const isInPlan = (id) => plan.some((item) => String(item.id) === String(id));
    const isSaved = (id) => saved.some((item) => String(item.id) === String(id));
    const isCompleted = (id) => completed.some((cId) => String(cId) === String(id));

    return (
        <PlanContext.Provider
            value={{
                plan,
                saved,
                completed,
                isLoaded,
                addToPlan,
                removeFromPlan,
                toggleSave,
                removeFromSaved,
                toggleCompleted,
                isInPlan,
                isSaved,
                isCompleted,
            }}
        >
            {children}

            {/* React Toastify Container */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </PlanContext.Provider>
    );
};

export const usePlan = () => {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error('usePlan must be used within a PlanProvider');
    }
    return context;
};
