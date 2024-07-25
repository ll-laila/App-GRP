import {Employe} from "../contacts/user/employe";
export class Notification {
    id?: number;
    type?: string ;
    message?: string ;
    nomEmploye?: string;
    employe?:Employe;
    entrepriseId?: number;
}
