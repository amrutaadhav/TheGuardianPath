import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [completedModules, setCompletedModules] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    if (token) {
      if (user && user.completedModules) {
        setCompletedModules(user.completedModules);
      }
      // Fetch latest from backend
      axios.get('http://localhost:5000/api/progress')
        .then(res => setCompletedModules(res.data))
        .catch(err => console.error("Could not fetch progress", err));
    } else {
      setCompletedModules([]);
    }
  }, [token, user]);

  const markComplete = async (id) => {
    if (!completedModules.includes(id)) {
      setCompletedModules(prev => [...prev, id]); // Optimistic update
      if (token) {
        try {
          const res = await axios.post('http://localhost:5000/api/progress/complete', { moduleId: id });
          setCompletedModules(res.data);
        } catch (err) {
          console.error("Failed to save progress to server", err);
        }
      }
    }
  };

  const isComplete = (id) => completedModules.includes(id);

  return (
    <ProgressContext.Provider value={{ completedModules, markComplete, isComplete }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
