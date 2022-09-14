import { BaseComponent, IBaseProps } from '../../../base';
export interface MbscWeekDayOptions extends IBaseProps {
    day: string;
    dayNames: string[];
    firstDay: number;
    index: number;
    isToday: boolean;
    rtl: boolean;
    selectable: boolean;
    selected: boolean;
    theme: string;
    timestamp: number;
    onClick: any;
}
export interface MbscWeekDayState {
    hasHover: boolean;
}
/** @hidden */
export declare class WeekDayBase extends BaseComponent<MbscWeekDayOptions, MbscWeekDayState> {
    _cssClass: string;
    private _unlisten;
    _onClick: () => void;
    protected _mounted(): void;
    protected _destroy(): void;
    protected _render(s: MbscWeekDayOptions, state: MbscWeekDayState): void;
}
