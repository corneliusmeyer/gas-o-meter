import type {GetServerSideProps, NextPage} from 'next'
import Page from "../components/Page";
import CostsOverview from "../components/overview/CostsOverview";
import UsageComparison from "../components/overview/UsageComparison";
import DailySavingTip from "../components/overview/DailySavingTip";
import {SavingTip} from "../models/SavingTip";
import {getSavingTipOfTheDay} from "../utils/helper";
import {Measurement} from "../models/Measurement";
import DailyUsageGraph from "../components/overview/DailyUsageGraph";
import {readGasUsageInRange} from "../utils/influxMethods";
import {today} from "../utils/DateRanges";

type OverviewPageProps = {
    dailyTip: SavingTip,
    gasusage: Measurement[],
}

const Home:NextPage<OverviewPageProps> = (props) => {
    const {dailyTip, gasusage} = props;
    return (
        <Page title="Überblick">
            <div className="lg:grid grid-cols-2 h-full grid-rows-2">
                <div className="bg-gray-100 m-2 p-3">
                    <span className="text-xl">Tagesverbrauch</span>
                    <DailyUsageGraph data={gasusage} />
                </div>
                <div className="bg-gray-100 m-2 p-3 flex flex-col">
                    <span className="text-xl">Kostenübersicht</span>
                    <CostsOverview today={1.28} yesterday={2.46} weekly={19.40} monthly={25.56} />
                </div>
                <div className="bg-gray-100 m-2 p-3 flex flex-col">
                    <span className="text-xl">Spartipp des Tages</span>
                </div>
                <div className="bg-gray-100 m-2 p-3 flex flex-col">
                    <span className="text-xl">Status & Meldungen</span>
                    <UsageComparison currentDiff={17} dailyDiff={-2} weeklyDiff={-3} />
                    <hr className="mx-11 mb-4" />
                </div>
            </div>
        </Page>
    )
}

export const getServerSideProps = async () => {
    const tip = getSavingTipOfTheDay();
    const gasusage = await readGasUsageInRange(today());
    return {props: {dailyTip: tip, gasusage: gasusage}}
}

export default Home;
