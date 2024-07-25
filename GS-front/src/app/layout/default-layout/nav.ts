import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: {name: 'cil-speedometer'},
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    name: 'Contact',

    iconComponent: {name: 'cil-address-book'},

    children: [
      {
        name: ' Client',
        url: '/contacts/client',
        icon: 'nav-icon-bullet',
      },
      {
        name: ' Fournisseur',
        url: '/contacts/fournisseur',
        icon: 'nav-icon-bullet',
      },
      {
        name: ' Employe',
        url: '/contacts/user/employe',
        icon: 'nav-icon-bullet',
      },



    ],
  },
  {
    name: 'Produit',
    iconComponent: {name: 'cib-codepen'},
    children: [
      {
        name: ' Produit',
        url: '/produit/produit',

      },
    ],
  },
  {
    name: 'Vente',
    iconComponent: {name: 'cil-cart'},
    children: [

      {
        name: 'Commande',
        url: '/ventes/commande/commande',
        iconComponent: {name: 'cib-codesandbox'},
      },

      {
        name: 'Facture',
        url: '/ventes/facture/facture',
        iconComponent: {name: 'cil-description'},

      },


      {
        name: 'Devis',
        url: '/ventes/devis/devis',

        iconComponent: {name: 'cil-description'},

      },
      {
        name: 'Retour de produit',
        url: '/ventes/retourproduit/retour-produit',

        iconComponent: {name: 'cil-list-low-priority'},

      },

      {
        name: ' Paiement',
        url: '/ventes/paiement',
        iconComponent: {name: 'cil-credit-card'},
      },
    ],
  },
  {
    name: 'Inventaire',
    iconComponent: {name: 'cil-truck'},
    children: [
      {
        name: ' Niveau de stock',
        url: '/inventaire/niveau-stock',
        iconComponent: {name: 'cib-azure-artifacts'},
      },
      {
        name: 'Bon de commande',
        url: '/inventaire/boncommande/bon-commande',

        iconComponent: {name: 'cil-description'},

      },
      {
        name: 'Bon de livraison',
        url: '/inventaire/livraison/livraison',
        iconComponent: {name: 'cil-description'},

      },
    ],
  },
  {
    name: 'Paramètres',
    iconComponent: {name: 'cil-settings'},
    children: [

      {
        name: ' Entreprise',
        url: '/parametres/entreprise',
        iconComponent: {name: 'cil-building'},
      },
      {
        name: ' Devises',
        url: '/parametres/devises',
        iconComponent: {name: 'cil-euro'},
      },
      {
        name: ' Nouvelle Devise',
        url: '/parametres/nouvelle-devise',
        iconComponent: {name: 'cil-euro'},
      },
      {
        name: ' Méthode de paiement',
        url: '/parametres/methode-paiement',
        iconComponent: {name: 'cil-cash'},
      },
      {
        name: ' Niveau de prix',
        url: '/parametres/niveau-prix',
        iconComponent: {name: 'cib-deezer'},
      },

      {
        name: ' Taxe',
        url: '/parametres/taxe',
        iconComponent: {name: 'cil-text-square'},
      },
    ],
  },
//{
//title: true,
//name: 'adresse',
//},
/*{
    name: 'adresse',
    icon: 'nav-icon-bullet',
    children: [
      {
        name: ' Adresse',
        url: '/adresse/adresse',
        icon: 'nav-icon-bullet',
      },
      {
        name: ' Pays',
        url: '/adresse/pays',
        icon: 'nav-icon-bullet',
      },
    ],
  },*/
];

export const navItems2: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: {name: 'cil-speedometer'},
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    name: 'Contact',

    iconComponent: {name: 'cil-address-book'},

    children: [
      {
        name: ' Client',
        url: '/contacts/client',
        icon: 'nav-icon-bullet',
      },
      {
        name: ' Fournisseur',
        url: '/contacts/fournisseur',
        icon: 'nav-icon-bullet',
      },


    ],
  },
  {
    name: 'Produit',
    iconComponent: {name: 'cib-codepen'},
    children: [
      {
        name: ' Produit',
        url: '/produit/produit',
        iconComponent: {name: 'cil-basket'},
      },
    ],
  },
  {
    name: 'Vente',
    iconComponent: {name: 'cil-cart'},
    children: [
      {
        name: 'Commande',
        url: '/ventes/commande/commande',
        iconComponent: {name: 'cib-codesandbox'},
      },

      {
        name: 'Facture',
        url: '/ventes/facture/facture',
        iconComponent: {name: 'cil-cart'},

      },


      {
        name: 'Devis',
        url: '/ventes/devis/devis',

        iconComponent: {name: 'cil-cart'},
      },
      {
        name: 'Retour de produit',
        url: '/ventes/retourproduit/retour-produit',

        iconComponent: {name: ' cilArrowLeft'},

      },

      {
        name: ' Paiement',
        url: '/ventes/paiement',
        iconComponent: {name: 'cil-credit-card'},
      },
    ],
  },
//{
//title: true,
//name: 'inventaire',
//},
  {
    name: 'Inventaire',
    iconComponent: {name: 'cil-truck'},
    children: [
      {
        name: ' Niveau de stock',
        url: '/inventaire/niveau-stock',
        iconComponent: {name: 'cib-azure-artifacts'},
      },
      {
        name: 'Bon de commande',
        url: '/inventaire/boncommande/bon-commande',

        iconComponent: {name: 'cil-description'},

      },
      {
        name: 'Bon de livraison',
        url: '/inventaire/livraison/livraison',

        iconComponent: {name: ' cil-fax '},

      },
    ],
  },

  {
    name: 'Paramètres',
    iconComponent: {name: 'cil-settings'},
    children: [
      // {
      //   name: ' Alerte',
      //   url: '/parametres/alerte',
      //   iconComponent: {name: 'cil-cart'},
      //
      // },
      {
        name: ' Devises',
        url: '/parametres/devises',
        iconComponent: {name: 'cil-euro'},
      },

      {
        name: ' Méthode de paiement',
        url: '/parametres/methode-paiement',
        iconComponent: {name: 'cil-cash'},
      },
      {
        name: ' Niveau de prix',
        url: '/parametres/niveau-prix',
        iconComponent: {name: 'cib-deezer'},
      },

      {
        name: ' Taxe',
        url: '/parametres/taxe',
        iconComponent: {name: 'cil-text-square'},
      },
    ],
  },
//{
//title: true,
//name: 'adresse',
//},
/*{
    name: 'adresse',
    icon: 'nav-icon-bullet',
    children: [
      {
        name: ' Adresse',
        url: '/adresse/adresse',
        icon: 'nav-icon-bullet',
      },
      {
        name: ' Pays',
        url: '/adresse/pays',
        icon: 'nav-icon-bullet',
      },
    ],
  },*/
];
