import JEmailModel from "../entities/jemail-model";

export default interface JEMailService {
    sendMail(message: JEmailModel): Promise<void>
}