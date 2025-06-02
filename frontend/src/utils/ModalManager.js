/**
 * Modal management for Edit and Creation of Tasks
 */
import { useState } from 'react';

/**
 * Hook for managing edit modal state
 * @returns {Object} Modal state and handlers
 */
export const useEditModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const openModal = (item) => {
    setEditingItem(item);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setEditingItem(null);
  };

  return {
    isVisible,
    editingItem,
    openModal,
    closeModal
  };
};

/**
 * Hook for managing create modal state
 * @returns {Object} Modal state and handlers
 */
export const useCreateModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return {
    isVisible,
    openModal,
    closeModal
  };
};
