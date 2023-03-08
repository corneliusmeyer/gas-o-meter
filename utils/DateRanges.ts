import {DateRange} from "../models/DateRange";

export const lastHour = (): DateRange => {
    const now = new Date();
    const oneHour = 60*60*1000;
    return {startDate: new Date(now.getTime()-oneHour), endDate: now}
}

export const today = (): DateRange => {
    const midnight = new Date().setHours(0,0,1,0)
    return {startDate: new Date(midnight), endDate: new Date()}
}

export const lastWeek = (): DateRange => {
    const now = new Date();
    const oneWeekInMilliseconds = 7*24*60*60*1000;
    const lastWeek = new Date(now.getTime() - oneWeekInMilliseconds);
    return {startDate: lastWeek, endDate: now}
}

export const thisMonth = (): DateRange => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    firstDayOfMonth.setHours(0, 0, 1, 0);
    return {startDate: firstDayOfMonth, endDate: now}}

export const thisYear = (): DateRange => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const firstDayOfYear = new Date(currentYear, 0, 1);
    return {startDate: firstDayOfYear, endDate: now}
}

export const lastYear = (): DateRange => {
    const now = new Date();
    const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
    const oneYearAgo = new Date(now.getTime() - oneYearInMilliseconds);
    return {startDate: oneYearAgo, endDate: now}
}

export const getTimeOfDate = (date: Date):String => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return`${hours}:${minutes}:${seconds}`;
}
