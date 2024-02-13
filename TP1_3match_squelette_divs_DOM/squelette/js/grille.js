import Cookie from "./cookie.js";
import { create2DArray } from "./utils.js";

export default class Grille {
    constructor(l, c) {
        this.c = c;
        this.l = l;
        this.tabcookies = this.remplirTableauDeCookies(6)
    }

    showCookies() {
        let caseDivs = document.querySelectorAll("#grille div");
        let cookiesCliquees = [];
        caseDivs.forEach((div, index) => {
            let ligne = Math.floor(index / this.l);
            let colonne = index % this.c;

            div.addEventListener('dragover', (event) => {
                event.preventDefault(); // Empêche le comportement par défaut du navigateur
            });

            div.addEventListener('drop', (event) => {
                event.preventDefault(); // Empêche le comportement par défaut du navigateur
                let cookieIndex = event.dataTransfer.getData('text/plain');
                let cookieToDrop = this.tabcookies[cookieIndex];
                let cookieAtDropLocation = this.tabcookies[ligne][colonne];

                if (Cookie.distance(cookieToDrop, cookieAtDropLocation) === 1) {
                    Cookie.swapCookies(cookieToDrop, cookieAtDropLocation);
                    // Remplacer l'image de cookieToDrop avec celle de cookieAtDropLocation
                    div.innerHTML = ''; // Supprimer l'image actuelle
                    div.appendChild(cookieAtDropLocation.htmlImage); // Ajouter la nouvelle image
                }
            });
            
            
          

            let cookie = this.tabcookies[ligne][colonne];
            let img = cookie.htmlImage;

            img.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', index); // Stocke l'index du cookie pour le drop
                event.dataTransfer.effectAllowed = 'move';
            });

            img.draggable = true;
            div.appendChild(img);

            img.onclick = (event) => {
                console.log("On a cliqué sur la ligne " + ligne + " et la colonne " + colonne);
                cookie.selectionnee();
                cookiesCliquees.push(cookie);
            
                if (cookiesCliquees.length === 2) {
                    let cookie1 = cookiesCliquees[0];
                    let cookie2 = cookiesCliquees[1];
                    let distance = Cookie.distance(cookie1, cookie2);
            
                    if (distance === 1) {
                        Cookie.swapCookies(cookie1, cookie2);
                        this.detecterMatch3Lignes(); // Appel à partir de l'instance de Grille
                        this.detecterMatch3Colonnes(); // Appel à partir de l'instance de Grille
                    } else {
                        cookie1.deselectionnee();
                        cookie2.deselectionnee();
                    }
                    cookiesCliquees = []; // Réinitialiser le tableau après le traitement
                }
            }
            
            
        });
    }

    detecterMatch3Lignes() {
        for (let l = 0; l < this.l; l++) {
            for (let c = 0; c < this.c - 2; c++) {
                const cookie1 = this.tabcookies[l][c];
                const cookie2 = this.tabcookies[l][c + 1];
                const cookie3 = this.tabcookies[l][c + 2];
    
                if (cookie1.type === cookie2.type && cookie2.type === cookie3.type) {
                    cookie1.marquerPourDisparition();
                    cookie2.marquerPourDisparition();
                    cookie3.marquerPourDisparition();
                }
            }
        }
    }
    
    // Méthode pour détecter les groupes de 3 ou plus dans les colonnes
    detecterMatch3Colonnes() {
        for (let c = 0; c < this.c; c++) {
            for (let l = 0; l < this.l - 2; l++) {
                const cookie1 = this.tabcookies[l][c];
                const cookie2 = this.tabcookies[l + 1][c];
                const cookie3 = this.tabcookies[l + 2][c];
    
                if (cookie1.type === cookie2.type && cookie2.type === cookie3.type) {
                    cookie1.marquerPourDisparition();
                    cookie2.marquerPourDisparition();
                    cookie3.marquerPourDisparition();
                }
            }
        }
    }
    
    // Méthode pour vider les cookies faisant partie d'un groupe d'au moins 3
    viderCookiesDisparus() {
        for (let l = 0; l < this.l; l++) {
            for (let c = 0; c < this.c; c++) {
                if (this.tabcookies[l][c].candidateDisparition) {
                    // Cacher le cookie visuellement (par exemple en modifiant son image ou en cachant l'élément div)
                    const div = document.querySelector(`#grille div[data-ligne="${l}"][data-colonne="${c}"]`);
                    div.style.visibility = "hidden"; // Exemple de cacher le cookie en le rendant invisible
                }
            }
        }
    }


    
    getCookieFromLC(ligne, colonne) {
        return this.tabcookies[ligne][colonne];
    }

    remplirTableauDeCookies(nbDeCookiesDifferents) {
        let tab = create2DArray(9);
        for (let l = 0; l < this.l; l++) {
            for (let c = 0; c < this.c; c++) {
                const type = Math.floor(Math.random() * nbDeCookiesDifferents);
                tab[l][c] = new Cookie(type, l, c);
            }
        }
        return tab;
    }
}
