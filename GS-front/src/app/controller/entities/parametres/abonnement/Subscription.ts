import {AppUser} from "../../../auth/entities/app-user";
import {Plan} from "./Plan";

export class Subscription {
    id!: number;
    plan?: Plan ;
    user?: AppUser ;
    subscriptionDate?: Date ;
    subscriptionEndDate?: Date ;
}
