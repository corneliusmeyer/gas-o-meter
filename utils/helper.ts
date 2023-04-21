import {SavingTipList} from "./savingTipList";
import {SavingTip} from "../models/SavingTip";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getFirstPartofURL = (url: string | null) : string => {
    if(url) {
        const urls = url.match(/^\/[^\/]+/);
        if(urls) return urls[0];
    }
    return "/";
}

export const getSavingTipOfTheDay = ():SavingTip => {
    return SavingTipList[0].tips[0];
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

