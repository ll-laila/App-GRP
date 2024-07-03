import { Pays } from 'src/app/controller/entities/adresse/pays';
export class Adresse {
id!: number;
address1?: string ;
address2?: string ;
postalCode?: string;
city?: string ;
pays?: Pays ;
}
