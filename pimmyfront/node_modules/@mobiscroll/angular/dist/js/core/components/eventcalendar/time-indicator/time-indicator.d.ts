import { BaseComponent } from '../../../base';
export interface MbscTimeIndicatorOptions {
    displayedHours: number;
    displayedDays: number;
    rtl?: boolean;
    theme?: string;
    scheduleType?: 'week' | 'day';
    startDay: number;
    startTime: Date;
    timeFormat?: string;
}
export interface MbscTimeIndicatorState {
    pos: any;
}
/** @hidden */
export declare class TimeIndicatorBase extends BaseComponent<MbscTimeIndicatorOptions, MbscTimeIndicatorState> {
    _cssClass: string;
    _time: string;
    _pos: any;
    private _timer;
    protected _mounted(): void;
    protected _destroy(): void;
    protected _render(s: MbscTimeIndicatorOptions, state: MbscTimeIndicatorState): void;
    private _getPos;
}
