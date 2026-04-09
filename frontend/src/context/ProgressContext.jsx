import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [completedModules, setCompletedModules] = useState([]);
  const [completedScenarios, setCompletedScenarios] = useState({});
  const { token, user } = useAuth();

  useEffect(() => {
    if (token) {
      if (user && user.completedModules) {
        setCompletedModules(user.completedModules);
        setCompletedScenarios(user.completedScenarios || {});
      }
      axios.get('http://localhost:5000/api/progress', { headers: { 'x-auth-token': token } })
        .then(res => {
          setCompletedModules(res.data.completedModules || []);
          setCompletedScenarios(res.data.completedScenarios || {});
        })
        .catch(err => console.error("Could not fetch progress", err));
    } else {
      setCompletedModules([]);
      setCompletedScenarios({});
    }
  }, [token, user]);

  const markComplete = async (id) => {
    if (!completedModules.includes(id)) {
      setCompletedModules(prev => [...prev, id]);
      if (token) {
        try {
          const res = await axios.post('http://localhost:5000/api/progress/complete', { moduleId: id }, { headers: { 'x-auth-token': token } });
          setCompletedModules(res.data.completedModules || []);
          setCompletedScenarios(res.data.completedScenarios || {});
        } catch (err) {
          console.error("Failed to save progress to server", err);
        }
      }
    }
  };

  const markScenarioComplete = async (moduleId, scenarioIndex) => {
    // Optimistic update
    setCompletedScenarios(prev => {
      const modScenarios = prev[moduleId] || [];
      if (!modScenarios.includes(scenarioIndex)) {
        return { ...prev, [moduleId]: [...modScenarios, scenarioIndex] };
      }
      return prev;
    });

    if (token) {
      try {
        const res = await axios.post(
          'http://localhost:5000/api/progress/scenario', 
          { moduleId, scenarioIndex }, 
          { headers: { 'x-auth-token': token } }
        );
        setCompletedModules(res.data.completedModules || []);
        setCompletedScenarios(res.data.completedScenarios || {});
      } catch (err) {
        console.error("Failed to save scenario progress", err);
      }
    }
  };

  const isComplete = (id) => completedModules.includes(id);

  return (
    <ProgressContext.Provider value={{ 
      completedModules, 
      completedScenarios,
      markComplete, 
      markScenarioComplete,
      isComplete 
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
