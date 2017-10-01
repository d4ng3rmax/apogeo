export class Template {
    id: number;
    name: string;
    description: string;
    subject: string;
    senderName: string;
    senderEmail: string;
    content: string;
    clientId: number;
    clientName: string;

    constructor(id: number, name: string, description: string, subject: string, senderName: string, senderEmail: string, content: string, clientId: number, clientName: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.subject = subject;
        this.senderName = senderName;
        this.senderEmail = senderEmail;
        this.content = content;
        this.clientId = clientId;
        this.clientName = clientName;
    }
}
