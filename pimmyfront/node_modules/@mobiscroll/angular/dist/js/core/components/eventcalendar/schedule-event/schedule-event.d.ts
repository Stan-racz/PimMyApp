import { BaseComponent, IBaseProps } from '../../../base';
import { MbscCalendarEventData } from '../eventcalendar';
export interface MbscScheduleEventOptions extends IBaseProps {
    contentTemplate?: any;
    drag?: boolean;
    event: MbscCalendarEventData;
    gridEndHour: Date;
    gridStartHour: Date;
    hidden?: boolean;
    inactive?: boolean;
    isDrag?: boolean;
    lastDay?: Date;
    resize?: boolean;
    rtl?: boolean;
    theme: string;
    timestamp: number;
    onClick?(arg: any): void;
    onDelete?(arg: any): void;
    onDragEnd?(arg: any): void;
    onDragModeOff?(args: any): void;
    onDragModeOn?(args: any): void;
    onDragMove?(arg: any): void;
    onDragStart?(arg: any): void;
    renderContent?(event: MbscCalendarEventData): any;
    render?(event: MbscCalendarEventData): any;
}
export interface MbscScheduleEventState {
    hasHover?: boolean;
    hasFocus?: boolean;
}
/** @hidden */
export declare class ScheduleEventBase extends BaseComponent<MbscScheduleEventOptions, MbscScheduleEventState> {
    _content: any;
    _cssClass: string;
    _html: any;
    _hasResizeStart: boolean | undefined;
    _hasResizeEnd: boolean | undefined;
    _rangeText: string | undefined;
    _style: any;
    protected _shouldEnhance: boolean;
    private _doc;
    private _isDrag;
    private _touchTimer;
    private _unlisten;
    private _unsubscribe;
    _onClick: (ev: any) => void;
    protected _onDocTouch: (ev: any) => void;
    protected _mounted(): void;
    protected _destroy(): void;
    protected _render(s: MbscScheduleEventOptions, state: MbscScheduleEventState): void;
    private _updateState;
}
