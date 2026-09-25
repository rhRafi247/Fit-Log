'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
    const [plan, setPlan] = useState([]);
    const [saved, setSaved] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

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

    const showToast = (msg, type = 'info') => {
        setToastMessage({ msg, type });
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    const addToPlan = (workout) => {
        if (!workout) return { success: false };

        if (plan.some((item) => String(item.id) === String(workout.id))) {
            showToast('Already added to today\'s plan!', 'warning');
            return { success: false, reason: 'exists' };
        }

        if (plan.length >= 5) {
            showToast('Cap of 5 lifts for today reached!', 'warning');
            return { success: false, reason: 'limit' };
        }

        const newPlan = [...plan, workout];
        setPlan(newPlan);
        try {
            localStorage.setItem('fitlog_today_plan', JSON.stringify(newPlan));
        } catch (e) {}

        showToast(`Added "${workout.name}" to today's plan!`, 'success');
        return { success: true };
    };

    const removeFromPlan = (id) => {
        const newPlan = plan.filter((item) => String(item.id) !== String(id));
        setPlan(newPlan);

        const newCompleted = completed.filter((cId) => String(cId) !== String(id));
        setCompleted(newCompleted);

        try {
            localStorage.setItem('fitlog_today_plan', JSON.stringify(newPlan));
            localStorage.setItem('fitlog_completed', JSON.stringify(newCompleted));
        } catch (e) {}

        showToast('Removed workout from today\'s plan', 'info');
    };

    const toggleSave = (workout) => {
        if (!workout) return;
        const exists = saved.some((item) => String(item.id) === String(workout.id));
        let newSaved;
        if (exists) {
            newSaved = saved.filter((item) => String(item.id) !== String(workout.id));
            showToast(`Removed "${workout.name}" from saved`, 'info');
        } else {
            newSaved = [...saved, workout];
            showToast(`Saved "${workout.name}" for later!`, 'success');
        }
        setSaved(newSaved);
        try {
            localStorage.setItem('fitlog_saved', JSON.stringify(newSaved));
        } catch (e) {}
    };

    const removeFromSaved = (id) => {
        const newSaved = saved.filter((item) => String(item.id) !== String(id));
        setSaved(newSaved);
        try {
            localStorage.setItem('fitlog_saved', JSON.stringify(newSaved));
        } catch (e) {}
        showToast('Removed from saved list', 'info');
    };

    const toggleCompleted = (id) => {
        const isDone = completed.some((cId) => String(cId) === String(id));
        const newCompleted = isDone
            ? completed.filter((cId) => String(cId) !== String(id))
            : [...completed, id];
        setCompleted(newCompleted);
        try {
            localStorage.setItem('fitlog_completed', JSON.stringify(newCompleted));
        } catch (e) {}
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

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
                    <div
                        className={`px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 border backdrop-blur-md ${
                            toastMessage.type === 'success'
                                ? 'bg-[#182412]/95 text-[#c6ff00] border-[#c6ff00]/40'
                                : toastMessage.type === 'warning'
                                ? 'bg-[#291e12]/95 text-[#fbbf24] border-[#fbbf24]/40'
                                : 'bg-[#161822]/95 text-white border-[#232733]'
                        }`}
                    >
                        <span>{toastMessage.msg}</span>
                    </div>
                </div>
            )}
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
