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

export const fetcherGet = (url: string) => fetch(url).then((res) => res.json());

export const fetcherPost = async (url: string, data: any) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

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