import { NewmanOptions } from "../entities"

export default interface JAllureServerService {
    startsAllureServer(options: NewmanOptions): void
    stopsAllureServer(): void
}