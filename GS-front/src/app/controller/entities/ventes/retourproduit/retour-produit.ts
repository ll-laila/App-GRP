import { Client } from 'src/app/controller/entities/contacts/client';
import { NoteCredit } from 'src/app/controller/entities/ventes/notecredit/note-credit';
import { Remboursement } from 'src/app/controller/entities/ventes/remboursement/remboursement';
import { RetourProduitProduit } from 'src/app/controller/entities/ventes/retourproduit/retour-produit-produit';
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';
import { StatutRetourProduitEnum } from 'src/app/controller/enums/statut-retour-produit-enum'
import {Facture} from "../facture/facture";
import {FactureProduit} from "../facture/facture-produit";
export class RetourProduit {
id!: number;
code?: string ;
statut?: StatutRetourProduitEnum ;
client?: Client ;
noteCredit?: NoteCredit ;
remboursements?: Remboursement ;
retourProduitProduit?: Array<RetourProduitProduit> ;
entreprise?: Entreprise ;
  totalUnites?: number;
  disponible?: number;
}
