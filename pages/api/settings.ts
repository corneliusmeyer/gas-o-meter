import {NextApiRequest, NextApiResponse} from "next";
import {writeSettings} from "../../services/StorageManager";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'POST') {
        writeSettings(req.body);
        res.status(200).end();
    }
}
