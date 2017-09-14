export class Template {
    id: number;
    name: string;
    description: string;
    subject: string;
    senderName: string;
    senderEmail: string;
    content: string;
    // active: boolean;

    constructor(id: number, name: string, description: string, subject: string, senderName: string, senderEmail: string, content: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.subject = subject;
        this.senderName = senderName;
        this.senderEmail = senderEmail;
        this.content = content;
    }
}
