/* @odoo-module */


import { Component, useState } from "@odoo/owl";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
import { deserializeDateTime } from "@web/core/l10n/dates";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { useDebounced } from "@web/core/utils/timing";
import { isIosApp } from "@web/core/browser/feature_detection";

const { DateTime } = luxon;

export class ActivityMenu extends Component {
    static components = {Dropdown, DropdownItem};
    static props = [];
    static template = "occ_break.custom_attendance_menu";

    setup() {
        this.rpc = useService("rpc");
        this.ui = useState(useService("ui"));
        this.userService = useService("user");
        this.employee = false;
        this.state = useState({
            checkedIn: false,
            isDisplayed: false,
            isBreak: false,
            isBreakDone: false,
        });
        this.date_formatter = registry.category("formatters").get("float_time")
        this.onClickSignInOut = useDebounced(this.signInOut, 200, true);
        this.onClickTakeABreak = useDebounced(this.takeBreak, 200, true);
        this.onClickEndBreak = useDebounced(this.endBreak, 200, true);
        // load data but do not wait for it to render to prevent from delaying
        // the whole webclient
        this.searchEmployeeBreak();
        this.searchReadEmployee();
    }  

    async searchEmployeeBreak() {
        const result = await this.rpc("/hr_attendance/take_break")
        console.log("Check Employee Break!");
        this.employee = result;
        console.log(result);
        if (this.employee.id) {
            this.breakTimeStart = this.date_formatter(this.employee.start_lunch);
            // this.breakDuration = this.date_formatter(this.employee.duration);
            this.state.isBreak = this.employee.is_break
        }
        else {
            this.state.isBreak = false
        }

        this.state.isBreakDone = this.employee.is_break_done

    }

    async takeBreak() {
        // const scriptElement = document.getElementById("web.layout.odooscript");
        // const scriptContent = scriptElement.textContent;
        // const tempScript = document.createElement('script');
        // tempScript.textContent = scriptContent;
        // document.head.appendChild(tempScript);
        // const csrfToken = window.odoo.csrf_token;
        // document.head.removeChild(tempScript);
        
        
        await this.rpc('/hr_attendance/systray_break_out');
        await this.searchReadEmployee()
        await this.searchEmployeeBreak()


    }

    async endBreak() {

        console.log("end break!");

        await this.rpc('/hr_attendance/systray_break_out');
        await this.searchReadEmployee()
        await this.searchEmployeeBreak()
    }

    async searchReadEmployee(){
        const result = await this.rpc("/hr_attendance/attendance_user_data");
        this.employee = result;
        console.log("Read Employee!");
        if (this.employee.id) {
            this.hoursToday = this.date_formatter(
                this.employee.hours_today
            );
            this.hoursPreviouslyToday = this.date_formatter(
                this.employee.hours_previously_today
            );
            this.lastAttendanceWorkedHours = this.date_formatter(
                this.employee.last_attendance_worked_hours
            );
            this.lastCheckIn = deserializeDateTime(this.employee.last_check_in).toLocaleString(DateTime.TIME_SIMPLE);
            this.state.checkedIn = this.employee.attendance_state === "checked_in";
            this.isFirstAttendance = this.employee.hours_previously_today === 0;
            this.state.isDisplayed = this.employee.display_systray
        } else {
            this.state.isDisplayed = false
        }
        await this.searchEmployeeBreak();
    }

    async signInOut() {
        // iOS app lacks permissions to call `getCurrentPosition`
        if (!isIosApp()) {
            navigator.geolocation.getCurrentPosition(
                async ({coords: {latitude, longitude}}) => {
                    await this.rpc("/hr_attendance/systray_check_in_out", {
                        latitude,
                        longitude
                    })
                    await this.searchReadEmployee()
                },
                async err => {
                    await this.rpc("/hr_attendance/systray_check_in_out")
                    await this.searchReadEmployee()
                },
                {
                    enableHighAccuracy: true,
                }
            )
        } else {
            await this.rpc("/hr_attendance/systray_check_in_out")
            await this.searchReadEmployee()
        }
    }
}

export const systrayAttendance = {
    Component: ActivityMenu,
};

registry
    .category("systray")
    .add("occ_break.custom_attendance_menu", systrayAttendance, { sequence: 101 })
    .remove("hr_attendance.attendance_menu", systrayAttendance, { sequence: 101 });