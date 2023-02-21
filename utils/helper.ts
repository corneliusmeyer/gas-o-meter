import {SavingTipList} from "./savingTipList";
import {SavingTip} from "../models/SavingTip";
import {DateRange} from "../models/DateRange";

export function getFirstPartofURL(url: string | null) : string {
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
    const tips = Object.values(SavingTipList);
    return tips[0];
}

export const today = (): DateRange => {
    const midnight = new Date().setHours(0,0,1,0)
    return {startDate: new Date(midnight), endDate: new Date()}
}