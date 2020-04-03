import { createAction } from '@reduxjs/toolkit';

/**
 * Получение списка билдов
 */
export const getBuildList = createAction('GET_BUILD_LIST');

/**
 * Получение лога билда
 *
 * @param id - id билда
 */
export const getBuildLog = createAction<string>('GET_BUILD_LOG');

/**
 * Добавление билда в очередь
 *
 * @param hash - хэш коммита
 */
export const addBuildToQueue = createAction<string>('ADD_BUILD_TO_QUEUE');

/**
 * Получение информации о билде
 *
 * @param buildId - хэш коммита
 */
export const getBuildDetails = createAction<string>('GET_BUILD_DETAILS');
