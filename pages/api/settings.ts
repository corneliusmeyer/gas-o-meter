import {NextApiRequest, NextApiResponse} from "next";
import {writeSettings} from "../../services/StorageManager";
import {isValidSettings} from "../../services/Validator";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'POST') {
        const body = req.body;
         if(isValidSettings(body)) {
            console.log("written")
            writeSettings(body);
            res.status(200).end();
            return;
         }
    }
    res.status(400).end();
}