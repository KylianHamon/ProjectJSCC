export default class Cookie {
  ligne=0;
  colone=0;
  type=0;
  htmlImage=undefined;
  candidateDisparition = false; // Ajout de l'attribut candidateDisparition
  
  

  static urlsImagesNormales = [
    "./assets/images/Croissant@2x.png",
    "./assets/images/Cupcake@2x.png",
    "./assets/images/Danish@2x.png",
    "./assets/images/Donut@2x.png",
    "./assets/images/Macaroon@2x.png",
    "./assets/images/SugarCookie@2x.png",
  ];
  static urlsImagesSurlignees = [
    "./assets/images/Croissant-Highlighted@2x.png",
    "./assets/images/Cupcake-Highlighted@2x.png",
    "./assets/images/Danish-Highlighted@2x.png",
    "./assets/images/Donut-Highlighted@2x.png",
    "./assets/images/Macaroon-Highlighted@2x.png",
    "./assets/images/SugarCookie-Highlighted@2x.png",
  ];

  constructor(type, ligne, colonne) {
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;

    // On récupère l'URL de l'image correspondant au type
    // qui est un nombre entre 0 et 5
    const url = Cookie.urlsImagesNormales[type];

    // On crée une image HTML avec l'API du DOM
    let img = document.createElement("img");
    img.src = url;
    img.width = 80;
    img.height = 80;
    // pour pouvoir récupérer la ligne et la colonne
    // quand on cliquera sur une image et donc à partir
    // de cette ligne et colonne on pourra récupérer le cookie
    // On utilise la dataset API du DOM, qui permet de stocker
    // des données arbitraires dans un élément HTML
    img.dataset.ligne = ligne;
    img.dataset.colonne = colonne;

    

    // On stocke l'image dans l'objet cookie
    this.htmlImage = img;
  }

  marquerPourDisparition() {
    this.htmlImage = undefined;
    this.candidateDisparition = true;
  }

// Méthode pour annuler la marque du cookie comme candidat à la disparition
  annulerMarquePourDisparition() {
  this.candidateDisparition = false;
  }
  selectionnee() {
    // Ajoute la classe "cookies-selected" pour mettre en évidence le cookie
    this.htmlImage.classList.add('cookies-selected');
    // Change l'image pour son image highlightée
    this.htmlImage.src = Cookie.urlsImagesSurlignees[this.type];
}

deselectionnee() {
    // Supprime la classe "cookies-selected" pour désélectionner le cookie
    this.htmlImage.classList.remove('cookies-selected');
    // Change l'image pour son image normale
    this.htmlImage.src = Cookie.urlsImagesNormales[this.type];
}


  static swapCookies(c1, c2) {
    // Échange des types de cookies
    let tempType = c1.type;
    let tempImageSrc = c1.htmlImage.src;

    c1.type = c2.type;
    c1.htmlImage.src = c2.htmlImage.src;

    c2.type = tempType;
    c2.htmlImage.src = tempImageSrc;

    // Réinitialisation des images avant la désélection
    c1.deselectionnee();
    c2.deselectionnee();
}


  /** renvoie la distance au sens "nombre de cases" 
   * entre deux cookies. Servira pour savoir si on peut
   * swapper deux cookies */
  static distance(cookie1, cookie2) {
    let l1 = cookie1.ligne;
    let c1 = cookie1.colonne;
    let l2 = cookie2.ligne;
    let c2 = cookie2.colonne;

    const distance = Math.sqrt((c2 - c1) * (c2 - c1) + (l2 - l1) * (l2 - l1));
    console.log("Distance = " + distance);
    return distance;
  }
}
