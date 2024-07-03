import {Produit} from "../produit/produit";
import {Client} from "../contacts/client";
import {NiveauPrix} from "../parametres/niveau-prix";

export class ClientProduitNiveauPrix {
  id!: number;
  produit!: Produit;
  client!: Client;
  niveauPrix!: NiveauPrix;
  prix!: number;


}
