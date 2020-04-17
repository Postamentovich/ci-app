import * as React from "react";
import { withBemMod } from "@bem-react/core";
import { ReactComponent as IconSvg } from "../assets/clear.svg";
import { IIconProps, cnIcon } from "../index";

export interface IIconTypeClearProps {
    /**
     * Тип иконки
     */
    type?: "clear";
}

/**
 * Модификатор, отвечающий за тип иконки
 */
export const withIconTypeClear = withBemMod<IIconTypeClearProps, IIconProps>(
    cnIcon(),
    { type: "clear" },
    (Icon) => (props) => (
        <Icon {...props}>
            <IconSvg />
        </Icon>
    )
);
