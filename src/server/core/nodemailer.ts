import path from "path";
import { config } from "dotenv";
import nodemailer from "nodemailer";

config({ path: path.resolve("../../../.env") });

class NodeMailer {
    private transporter!: nodemailer.Transporter;

    constructor() {
        this.Init();
    }

    public async sendMail (email: string, subject: string, text: string) {
        const usersMail = {
            subject, text, from: `GTAVMP ${'help@GTAVMP'}`, to: `${email}`
        };

        await this.transporter.sendMail(usersMail);
    }

    private Init () {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'carlotta.halvorson82@ethereal.email',
                pass: '2VZqyN4vRY3Pj7htQ4'
            }
        });

        this.transporter.verify((err: any) => {
            if (err) return console.error(err);

            console.log(`[Nodemailer] Готов к использованию.`)
        })
    }
}

const mailer = new NodeMailer();

export default mailer;