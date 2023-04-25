import React, {useEffect, useState} from 'react';
import { Popover } from '@headlessui/react'
import de from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, {registerLocale} from "react-datepicker";
import {DateRange} from "../../models/DateRange";
import {lastHour, lastWeek, lastYear, thisMonth, thisYear, today} from "../../utils/DateRanges";

type Props = {
    currentValue?: DateRange;
    callback: (range: DateRange) => void;
};

const DateRangePicker = ({ currentValue, callback }: Props) => {
    registerLocale("de", de);
    const options = [
        "Benutzerdefiniert",
        "Letzte Stunde",
        "Heute",
        "Letzte Woche",
        "Dieser Monat",
        "Dieses Jahr",
        "Letzte 365 Tage"
    ];

    type optionType = typeof options[number];

    const [selectedOption, setSelectedOption] = useState<optionType>(currentValue ? "Benutzerdefiniert" : "Dieser Monat");
    const [selectedRange, setSelectedRange] = useState<DateRange>(currentValue ? currentValue : thisMonth());

    useEffect(() => {
        let newRange: DateRange;
        switch (selectedOption) {
            case "Benutzerdefiniert":
                return;
            case "Letzte Stunde":
                newRange = lastHour();
                break;
            case "Heute":
                newRange = today();
                break;
            case "Letzte Woche":
                newRange = lastWeek();
                break;
            case "Dieser Monat":
                newRange = thisMonth();
                break;
            case "Dieses Jahr":
                newRange = thisYear();
                break;
            case "Letzte 365 Tage":
                newRange = lastYear();
                break;
            default:
                newRange = today();
        }
        setSelectedRange(newRange);
        callback(newRange);
    }, [selectedOption, callback]);

    const handleStartDateChange = (date: Date) => {
        setSelectedRange((prevRange) => ({
            startDate: date,
            endDate: prevRange.endDate,
        }));
        setSelectedOption('Benutzerdefiniert');
        callback(selectedRange);
    };

    const handleEndDateChange = (date: Date) => {
        console.log("enddate: " +date);
        console.log("eigentlich: " + date)
        setSelectedRange((prevRange) => ({
            startDate: prevRange.startDate,
            endDate: date,
        }));
        setSelectedOption('Benutzerdefiniert');
        callback(selectedRange);
    };

    return (
        <div className="flex flex-row border border-solid border-gray-500 p-1 justify-around">
            <div className="relative">
                <Popover>
                    <Popover.Button
                        className="bg-white text-gray-800 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100">
                        {selectedOption}
                    </Popover.Button>

                    <Popover.Panel className="absolute z-10 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                            {options
                                .filter((option) => option !== "Benutzerdefiniert")
                                .map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setSelectedOption(option)}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </Popover.Panel>
                </Popover>
            </div>

    <div className="flex flex-row items-center">
                <label className="pr-7">Von</label>
                <DatePicker
                    className="border border-solid border-gray-500 pl-2 pb-0"
                    selected={selectedRange.startDate}
                    onChange={handleStartDateChange}
                    dateFormat="dd.MM.yyyy HH:mm:ss"
                    timeFormat="HH:mm"
                    showTimeSelect
                    locale="de"
                />
            </div>
            <div className="flex flex-row items-center">
                <label className="pr-7">Bis</label>
                <DatePicker
                    className="border border-solid border-gray-500 pl-2"
                    selected={selectedRange.endDate}
                    onChange={handleEndDateChange}
                    dateFormat="dd.MM.yyyy HH:mm:ss"
                    timeFormat="HH:mm"
                    showTimeSelect
                    locale="de"
                />
            </div>
        </div>
    );
};

export default DateRangePicker;