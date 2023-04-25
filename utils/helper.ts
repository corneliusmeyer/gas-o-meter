import {SavingTipList} from "./savingTipList";
import {SavingTip} from "../models/SavingTip";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {DateRange} from "../models/DateRange";
import moment from "moment";

export const getFirstPartofURL = (url: string | null) : string => {
    if(url) {
        const urls = url.match(/^\/[^\/]+/);
        if(urls) return urls[0];
    }
    return "/";
}

export const getSavingTipOfTheDay = ():SavingTip => {
    let alltips:SavingTip[] = [];
    SavingTipList.map((categorie) => categorie.tips.map((tip) => alltips.push(tip)));
    const index = new Date().getDate() % alltips.length;
    return alltips[index];
}

export function showErrorToast(message: string) {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });
}

export function showSuccessToast(message: string) {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT
    });
}

export function showWarningToast(message: string) {
    toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT
    })
}

function getDurationForRange(range:DateRange):moment.Duration {
    return moment.duration(moment(range.endDate).diff(moment(range.startDate)));
}

export function rangeToUnit(range:DateRange):string {
    const duration = getDurationForRange(range);
    if(duration.asHours() < 50)
        return 'hour';
    else if (duration.asDays() < 13)
        return 'day';
    else if(duration.asWeeks() < 10)
        return 'week';
    else if(duration.asMonths() < 20)
        return 'month';
    else if(duration.asYears() > 2)
        return 'year';
    return '';
}
