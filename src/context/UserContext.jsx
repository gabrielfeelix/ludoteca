import React, { createContext, useContext, useState, useCallback } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: "Gabriel Silva",
    email: "gabriel@ludoteca.app",
    location: "Maringá, PR",
    avatar: localStorage.getItem("userAvatar") || null,
    photoUrl: null,
    stats: {
      games: 12,
      matches: 0,
      hours: 0,
      since: "Janeiro 2025"
    },
    publicUrl: "ludoteca.app/gabriel",
    preferences: {
      theme: "light",
      complexity: "Medio",
      language: "Português",
      showPlayTime: true,
      publicNotes: false,
      publicCollection: true
    },
    notifications: {
      visits: false,
      monthly: true,
      updates: true
    }
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "welcome",
      title: "Bem-vindo à Ludoteca!",
      message: "Sua conta foi criada com sucesso",
      timestamp: new Date(),
      read: false
    },
    {
      id: 2,
      type: "info",
      title: "Mesa de Hoje está pronta",
      message: "3 jogos foram sugeridos para sua próxima sessão",
      timestamp: new Date(Date.now() - 3600000),
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const updateUserPhoto = useCallback((photoData) => {
    localStorage.setItem("userAvatar", photoData);
    setUser(prev => ({
      ...prev,
      avatar: photoData,
      photoUrl: photoData
    }));
  }, []);

  const updateUserProfile = useCallback((updates) => {
    setUser(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const updatePreferences = useCallback((preferences) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...preferences
      }
    }));
  }, []);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  }, []);

  const markAsRead = useCallback((notificationId) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  }, []);

  const deleteNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUserPhoto,
        updateUserProfile,
        updatePreferences,
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
