import { createAction } from '@reduxjs/toolkit';

/**
 * Получение настроек пользователя
 */
export const getSettings = createAction('GET_SETTINGS');

/**
 * Сохранение настроек пользователя
 */
export const saveSettings = createAction('SAVE_SETTINGS');

/**
 * Отмена введенных значений
 */
export const cancelChangedSettings = createAction('CANCEL_CHANGED_SETTINGS');
