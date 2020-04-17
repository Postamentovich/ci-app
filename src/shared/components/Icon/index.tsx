import { ReactType } from "react";
import { IClassNameProps } from "@bem-react/core";
import { cn } from "@bem-react/classname";
import "./Icon.css";
export interface IIconProps extends IClassNameProps {
    /**
     * HTML-атрибут для рендера
     * @default 'i'
     */
    as?: ReactType;
}

export const cnIcon = cn("Icon");
