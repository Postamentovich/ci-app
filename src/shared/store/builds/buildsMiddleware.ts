import { Middleware } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { RootState } from "../rootReducer";
import { globalSlice } from "../global/globalSlice";
import { buildApi } from "../../api/buildApi";
import * as BUILD_ACTIONS from "./buildsActions";
import { bulidsSlice } from "./buildsSlice";
import { BuildModel } from "models/BuildModel";
import { BuildStatus } from "models/BuildStatus";

let pollingBuildListTimeout: NodeJS.Timeout;

const pageSize = 10;

// eslint-disable-next-line consistent-return
const buildsMiddleware: Middleware<RootState> = ({ dispatch, getState }) => (next) => async (
    action
) => {
    next(action);

    /**
     * Отмена поллинга списка билдов
     */
    if (BUILD_ACTIONS.cancelPollingBuildList.match(action)) {
        clearTimeout(pollingBuildListTimeout);
    }

    const startPollingBuilds = (list: Array<BuildModel>) => {
        const itemWithWaitingStatus = list.find(
            (el) => el.status === BuildStatus.Waiting || el.status === BuildStatus.InProgress
        );

        /**
         * Если есть билды для которых сборка еще не завершена,
         * запрашиваем список листов повторно
         */
        if (itemWithWaitingStatus) {
            clearTimeout(pollingBuildListTimeout);

            pollingBuildListTimeout = setTimeout(() => {
                dispatch(BUILD_ACTIONS.getBuildList());
            }, 10000);
        }
    };

    /**
     * Получение списка билдов
     */
    if (BUILD_ACTIONS.getBuildList.match(action)) {
        try {
            const {
                bulidsSlice: { page },
            }: RootState = getState();

            dispatch(bulidsSlice.actions.setIsLoading(true));

            const list = await buildApi.getList(0, page * pageSize);

            dispatch(bulidsSlice.actions.setList(list));

            dispatch(bulidsSlice.actions.setIsLoading(false));

            startPollingBuilds(list);
        } catch (error) {
            dispatch(bulidsSlice.actions.setIsLoading(false));

            dispatch(
                globalSlice.actions.addNotify({
                    message: "Error getting list of builds",
                    id: Date.now().valueOf(),
                    type: "error",
                })
            );
        }
    }

    /**
     * Получение дополнительных билдов
     */
    if (BUILD_ACTIONS.getMoreBuilds.match(action)) {
        try {
            const {
                bulidsSlice: { page },
            }: RootState = getState();

            dispatch(bulidsSlice.actions.setIsMoreBuildsLoading(true));

            const newPage = page + 1;

            const list = await buildApi.getList(page * pageSize, pageSize);

            dispatch(bulidsSlice.actions.setIsMoreBuildsLoading(false));

            if (list.length) {
                dispatch(bulidsSlice.actions.setList(list));

                dispatch(bulidsSlice.actions.setPage(newPage));

                startPollingBuilds(list);
            } else {
                dispatch(
                    globalSlice.actions.addNotify({
                        message: "No more builds",
                        id: Date.now().valueOf(),
                        type: "warning",
                    })
                );
            }
        } catch (error) {
            dispatch(bulidsSlice.actions.setIsMoreBuildsLoading(false));

            dispatch(
                globalSlice.actions.addNotify({
                    message: "Error getting builds",
                    id: Date.now().valueOf(),
                    type: "error",
                })
            );
        }
    }

    /**
     * Получение лога
     */
    if (BUILD_ACTIONS.getBuildLog.match(action)) {
        try {
            dispatch(bulidsSlice.actions.setIsLogLoading(true));

            const log = await buildApi.getLog(action.payload);

            dispatch(bulidsSlice.actions.setLog({ id: action.payload, log }));

            dispatch(bulidsSlice.actions.setIsLogLoading(false));
        } catch (error) {
            dispatch(bulidsSlice.actions.setIsLogLoading(false));

            dispatch(
                globalSlice.actions.addNotify({
                    message: "Error getting log",
                    id: Date.now().valueOf(),
                    type: "error",
                })
            );
        }
    }

    /**
     * Добавление билда в очередь
     */
    if (BUILD_ACTIONS.addBuildToQueue.match(action)) {
        try {
            dispatch(bulidsSlice.actions.setIsBuildAdding(true));

            const build = await buildApi.addBuild(action.payload);

            dispatch(bulidsSlice.actions.addBuildToList(build));

            dispatch(bulidsSlice.actions.setIsBuildAdding(false));

            dispatch(push(`/build/${build.id}`));

            dispatch(
                globalSlice.actions.addNotify({
                    message: "Build successfully added",
                    id: Date.now().valueOf(),
                    type: "success",
                })
            );
        } catch (error) {
            dispatch(bulidsSlice.actions.setIsBuildAdding(false));

            dispatch(
                globalSlice.actions.addNotify({
                    message: "Error adding build to queue",
                    id: Date.now().valueOf(),
                    type: "error",
                })
            );
        }
    }

    /**
     * Получение детальной информации о билде
     */
    if (BUILD_ACTIONS.getBuildDetails.match(action)) {
        try {
            const build = await buildApi.getDetails(action.payload);

            dispatch(bulidsSlice.actions.addBuildToList(build));

            switch (build.status) {
                case BuildStatus.InProgress:
                    return dispatch(
                        globalSlice.actions.addNotify({
                            message: "Build in progress",
                            id: Date.now().valueOf(),
                            type: "warning",
                        })
                    );

                case BuildStatus.Waiting:
                    return dispatch(
                        globalSlice.actions.addNotify({
                            message: "Build is waiting",
                            id: Date.now().valueOf(),
                            type: "warning",
                        })
                    );

                default:
                    dispatch(BUILD_ACTIONS.getBuildLog(build.id));
            }
        } catch (error) {
            dispatch(
                globalSlice.actions.addNotify({
                    message: "Error getting build details",
                    id: Date.now().valueOf(),
                    type: "error",
                })
            );
        }
    }
};

export default buildsMiddleware;
