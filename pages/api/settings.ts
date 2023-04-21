import {NextApiRequest, NextApiResponse} from "next";
import {readSettings, writeSettings} from "../../utils/storagehelper";
import {isValidSettings} from "../../utils/validator";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        const body = req.body;
         if(isValidSettings(body)) {
            writeSettings(body);
            res.status(200).end();
            return;
         }
    }
    else if(req.method === 'GET') {
        const settings = await readSettings();
        res.status(200).json(settings);
        return;
    }
    res.status(400).end();
}