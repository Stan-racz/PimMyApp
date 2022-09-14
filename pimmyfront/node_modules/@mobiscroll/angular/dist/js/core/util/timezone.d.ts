export interface IDate extends Date {
    /** @hidden
     * It's a flag indicating that the Date Object as a Mobiscroll Date
     */
    _mbsc?: boolean;
    /**
     * Switches the timezone of the Date
     * @param timezone The timezone to switch the date to
     */
    setTimezone(timezone: string): void;
    /**
     * Returns a new Date object initialized with the same values.
     */
    clone(): IDate;
    createDate(value: number | Date): IDate;
    createDate(year?: number | string | IDate | Date, month?: number, date?: number, h?: number, min?: number, sec?: number, ms?: number): IDate;
}
export interface ITimezonePlugin {
    parse(date: number | string, s: any): IDate;
    createDate(s: any, year?: number | string | IDate | Date, month?: number, date?: number, h?: number, min?: number, sec?: number, ms?: number): IDate;
}
