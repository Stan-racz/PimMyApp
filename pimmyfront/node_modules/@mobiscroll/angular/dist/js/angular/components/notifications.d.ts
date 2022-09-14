import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { MbscAlertOptions, MbscConfirmOptions, MbscPromptOptions, MbscSnackbarOptions, MbscToastOptions } from '../../core/components/notifications/notifications';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from './input.module';
import * as ɵngcc2 from './popup.module';
export declare class Notifications {
    private _injector;
    private _cfr;
    private _app;
    constructor(_injector: Injector, _cfr: ComponentFactoryResolver, _app: ApplicationRef);
    toast(options: MbscToastOptions): Promise<undefined>;
    snackbar(options: MbscSnackbarOptions): Promise<undefined>;
    alert(options: MbscAlertOptions): Promise<undefined>;
    confirm(options: MbscConfirmOptions): Promise<boolean>;
    prompt(options: MbscPromptOptions): Promise<string | null>;
    private _createPopup;
    private _showToast;
    private _showSnackbar;
    private _showAlert;
    private _showConfirm;
    private _showPrompt;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<Notifications, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<Notifications>;
}
export declare class MbscNotificationsModule {
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<MbscNotificationsModule, never>;
    static ɵmod: ɵngcc0.ɵɵNgModuleDeclaration<MbscNotificationsModule, never, [typeof ɵngcc1.MbscInputModule, typeof ɵngcc2.MbscPopupModule], never>;
    static ɵinj: ɵngcc0.ɵɵInjectorDeclaration<MbscNotificationsModule>;
}

//# sourceMappingURL=notifications.d.ts.map