import {NextApiRequest, NextApiResponse} from "next";
import {DateRange} from "../../models/DateRange";
import {readGasUsageInRange} from "../../utils/influxMethods";

export default async function handler(req: NextApiRequest, res: NextApiResponse) : Promise<any> {
    const start = Date.parse(req.query.start as string);
    const end = Date.parse(req.query.end as string);

    if(isNaN(start) || isNaN(end)) {
        res.status(400).end();
        return ;
    }

    const range = new DateRange(new Date(start), new Date(end));
    const measurements = await readGasUsageInRange(range);
    res.status(200).json(measurements);
}