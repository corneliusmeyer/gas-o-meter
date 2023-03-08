import React, {useEffect, useState} from 'react';
import { Listbox } from '@headlessui/react';
import de from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {DateRange} from "../../models/DateRange";
import {lastHour, lastWeek, lastYear, thisMonth, thisYear, today} from "../../utils/DateRanges";

type Props = {
    currentValue: DateRange;
    callback: (range: DateRange) => void;
};

const DateRangePicker = ({ currentValue, callback }: Props) => {
    const options = [
        "Letzte Stunde",
        "Heute",
        "Letzte Woche",
        "Dieser Monat",
        "Dieses Jahr",
        "Letzte 365 Tage",
    ];
    const [selectedOption, setSelectedOption] = useState<string>(options[1]);
    const [selectedRange, setSelectedRange] = useState<DateRange>(currentValue);

    useEffect(() => {
        let newRange: DateRange;
        switch (selectedOption) {
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
        callback(selectedRange);
    };

    const handleEndDateChange = (date: Date) => {
        setSelectedRange((prevRange) => ({
            startDate: prevRange.startDate,
            endDate: date,
        }));
        callback(selectedRange);
    };

    return (
        <div className="flex flex-row border border-solid border-gray-500 p-3 justify-around">
            <div className="flex flex-col">
                <Listbox value={selectedOption} onChange={setSelectedOption}>
                    <Listbox.Button className="border px-2 py-1 rounded">
                        {selectedOption}
                    </Listbox.Button>
                    <Listbox.Options className="border p-2 rounded">
                        {options.map((option) => (
                            <Listbox.Option key={option} value={option}>
                                {option}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox>
            </div>
            <div className="flex flex-row">
                <label className="pr-7">Von</label>
                <DatePicker
                    className="border border-solid border-gray-500 pl-2"
                    selected={selectedRange.startDate}
                    onChange={handleStartDateChange}
                    dateFormat="dd.MM.yyyy HH:mm:ss"
                    timeFormat="HH:mm"
                    showTimeSelect
                    locale={de}
                />
            </div>
            <div className="flex flex-row">
                <label className="pr-7">Bis</label>
                <DatePicker
                    className="border border-solid border-gray-500 pl-2"
                    selected={selectedRange.endDate}
                    onChange={handleEndDateChange}
                    dateFormat="dd.MM.yyyy HH:mm:ss"
                    timeFormat="HH:mm"
                    showTimeSelect
                    locale={de}
                />
            </div>
        </div>
    );
};

export default DateRangePicker;