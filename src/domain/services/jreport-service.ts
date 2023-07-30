import { ReportOptions } from "../entities";

export default interface JReportService {
    report(options: ReportOptions): Promise<void>
}