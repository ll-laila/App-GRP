import { Produit } from 'src/app/controller/entities/produit/produit';
import { NoteCredit } from 'src/app/controller/entities/ventes/notecredit/note-credit';
export class NoteCreditProduit {
id!: number;
total!: number;
quantite!: number;
disque!: number;
produit?: Produit ;
noteCredit?: NoteCredit ;
}
