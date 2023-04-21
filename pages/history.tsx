import React, {useEffect, useState} from 'react';
import {Measurement} from "../models/Measurement";
import {DateRange} from "../models/DateRange";
import {today} from "../utils/DateRanges";
import Page from "../components/Page";
import DateRangePicker from "../components/ui/DateRangePicker";
import LineChart from "../components/graphs/LineChart";
import {readGasUsageInRange} from "../utils/influxMethods";
import {GetServerSidePropsContext, NextPage} from "next";
import ModalDelete from "../components/history/modals/ModalDelete";
import ModalUsageGroup from "../components/history/modals/ModalUsageGroup";
import {showErrorToast, showSuccessToast} from "../utils/helper";
import {deleteValuesInRange, findMaximumGascount} from "../utils/influxdb";
import {saveSettings} from "../utils/apis";

type HistoryPageProps = {
    measurements: Measurement[];
}

const History:NextPage<HistoryPageProps> = ({measurements}) => {
    const [data, setData] = useState(measurements);
    const [selectedRange, setSelectedRange] = useState<DateRange>(today());
    const [renderCount, setRenderCount] = useState(0);

    const [showUsageModal, setShowUsageModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const deleteModalHandler = async (consent: boolean) => {
        setShowDeleteModal(false);
        if(consent === true) {
            const result = await deleteValuesInRange(selectedRange);
            if(result) {
                const max = await findMaximumGascount();
                const settingsreq = await fetch('/api/settings');
                const settings = await settingsreq.json();
                if(settings) {
                    settings.lastMeasurement = max;
                    await saveSettings(settings);
                }
                setSelectedRange(selectedRange);
                showSuccessToast('Die Daten wurden für den Zeitraum erfolgreich gelöscht');
            }
            else showErrorToast('Die Daten konnten für den Zeitraum nicht gelöscht werden');
        }
    }

    const usageModalHandler = (group?: string) => {
        setShowUsageModal(false);
        if(group) showSuccessToast("Dem Zeitraum wurde " + group + " zugewiesen.");
    }

    const fetchData = async () => {
        const response = await fetch(`/api/measurements?start=${selectedRange.startDate.toISOString()}`+
                                                                `&end=${selectedRange.endDate.toISOString()}`);
        const result = await response.json();
        setData(result);
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
                        callback={deleteModalHandler}
                    />
                )}
                {showUsageModal && (
                    <ModalUsageGroup
                        callback={usageModalHandler}
                    />
                )}
                <DateRangePicker currentValue={selectedRange} callback={setSelectedRange}/>
                <div className="max-h-fit h-fit my-2">
                {
                     data && data.length > 0 ? <LineChart data={data} dateRange={selectedRange} />
                          : <div>Es konnten keine Daten für den Zeitraum gefunden werden</div>
                }
                </div>
                {
                    data && data.length > 0 ? <div className="flex h-full flex-row border border-solid border-gray-500 p-2 justify-around">
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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const measurements = await readGasUsageInRange(today());
    return {props: {measurements}};
}

export default History;