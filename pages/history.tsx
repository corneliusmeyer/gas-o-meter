import React, {useEffect, useState} from 'react';
import {Measurement} from "../models/Measurement";
import {DateRange} from "../models/DateRange";
import {today} from "../utils/DateRanges";
import Page from "../components/Page";
import DateRangePicker from "../components/ui/DateRangePicker";
import LineChart from "../components/graphs/LineChart";
import {readGasUsageInRange} from "../utils/influxMethods";
import {NextPage} from "next";
import ModalDelete from "../components/history/modals/ModalDelete";
import ModalUsageGroup from "../components/history/modals/ModalUsageGroup";
import {showSuccessToast} from "../utils/helper";

type HistoryPageProps = {
    measurements: Measurement[];
}

const History:NextPage<HistoryPageProps> = ({measurements}) => {
    const [data, setData] = useState(measurements);
    const [selectedRange, setSelectedRange] = useState<DateRange>(today());
    const [renderCount, setRenderCount] = useState(0);

    const [showUsageModal, setShowUsageModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const deleteModalHandler = (value: boolean) => {
        setShowDeleteModal(false);
        if(value) showSuccessToast("Die Daten wurden erfolgreich gelöscht.");
    }
    const usageModalHandler = (group?: string) => {
        setShowUsageModal(false);
        if(group) showSuccessToast("Dem Zeitraum wurde " + group + " zugewiesen.");
    }

    const fetchData = async () => {
        const response = await fetch(`/api/measurements?start=${selectedRange.startDate}&end=${selectedRange.endDate}`);
        setData(await response.json());
    }

    useEffect(() => {
        if(renderCount > 2) {
            fetchData();
        }
        else setRenderCount(prevState => prevState+1);
    }, [selectedRange]);

    return (
        <Page title="Historie">
            <div className="flex flex-col h-full">
                {showDeleteModal && (
                    <ModalDelete
                        callback={() => deleteModalHandler(true)}
                    />
                )}
                {showUsageModal && (
                    <ModalUsageGroup
                        callback={usageModalHandler}
                    />
                )}
                <DateRangePicker currentValue={selectedRange} callback={setSelectedRange}/>
                <div className="flex-1">
                {
                    data && data.length > 0 ? <LineChart data={data} />
                        : <div>Es konnten keine Daten für den Zeitraum gefunden werden</div>
                }
                </div>
                {
                    data && data.length > 0 ? <div className="flex flex-row border border-solid border-gray-500 p-3 justify-around">
                        <a className="hover:font-bold"
                           href={`/analysis?start=${selectedRange.startDate.toISOString()}&end=${selectedRange.endDate.toISOString()}`}
                        >Zeitraum analysieren</a>
                        <button className="hover:font-bold"
                        onClick={() => setShowUsageModal(true)}
                        >Verbrauchsgruppe hinzufügen</button>
                        <button className="hover:font-bold"
                        onClick={() => setShowDeleteModal(true)}>Daten für Zeitraum löschen</button>
                    </div> : null
                }
            </div>
        </Page>
    );
};

export const getServerSideProps = async () => {
    const measurements = await readGasUsageInRange(today());
    return {props: {measurements}};
}

export default History;