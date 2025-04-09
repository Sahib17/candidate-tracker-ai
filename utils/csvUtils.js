import {Parser} from "json2csv";

export const downloadCSV = (res, fileName, fields, data) => {
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
};

