import path from "path";
import fs from "fs";

export const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const logsDir = path.join(process.cwd(), "logs");

    const logFile = path.join(logsDir, "app.logs");

    fs.mkdirSync(logsDir, {recursive: true});

    res.on("finish", () => {
        const log = `${timestamp} | ${req.method} | ${req.originalUrl} | ${res.statusCode}\n`
        fs.appendFileSync(logFile, log)
    })

    next();
}