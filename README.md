# Portfolio — Saiiko

Un portfolio web moderne et interactif, construit avec HTML, CSS et JavaScript (GSAP).

## 📁 Structure du Projet

```
Portfolio/
├── index.html                 # Page principale
├── README.md                  # Ce fichier
├── src/
│   ├── css/
│   │   └── styles.css        # Feuilles de style (bien organisées)
│   ├── js/
│   │   └── script.js         # Logique JavaScript (animations GSAP)
│   └── images/               # Dossier pour les images (vide pour l'instant)
└── portfolio.html            # Ancien fichier (peut être supprimé)
```

## 🎨 Caractéristiques

- ✨ **Animations Fluides** : Utilise GSAP pour les animations performantes
- 📱 **Responsive Design** : Adapté à tous les appareils
- 3️⃣ **Éléments 3D** : Effets 3D CSS et parallaxe
- 🎯 **Interactions Avancées** : Curseur personnalisé, hover effects
- ⚡ **Performance** : Code optimisé et bien organisé
- 🎬 **Sections Dynamiques** : Projets, compétences, contact

## 🚀 Sections Principales

### Hero
- Animation d'entrée impressionnante
- Champ de particules interactif
- Parallaxe 3D au survol

### À Propos
- Présentation personnelle
- Statistiques de projets
- Citation inspirante

### Projets
- 5 projets présentés
- Design en grille avec alternance
- Animations au scroll
- Détails technologiques

### Compétences
- Grille de 6 cartes de compétences
- Barres de progression animées
- Effets 3D au survol
- Tilt et brillance interactive

### Contact
- Call-to-action clair
- Liens vers les réseaux
- Animation de révélation au scroll

### Footer
- Navigation simple
- Informations de crédits

## 🛠️ Dépendances

- **GSAP 3.12.5** : Librairie d'animation
- **ScrollTrigger** : Plugin GSAP pour les animations au scroll
- **Google Fonts** : Polices Cinzel, Cormorant Garamond, Barlow
- **ScrollToPlugin** : Navigation smooth

## 📝 Comment Utiliser

1. **Ouvrir le site** :
   ```bash
   cd /home/saiiko/projet\ perso/portfolio/Portfolio
   # Ouvrir index.html dans un navigateur
   ```

2. **Modifier le contenu** :
   - Éditez `index.html` pour changer le texte et la structure
   - Modifiez `src/css/styles.css` pour les styles
   - Mettez à jour `src/js/script.js` pour les animations

3. **Ajouter des images** :
   - Placez vos images dans `src/images/`
   - Référencez-les avec le chemin `src/images/nom-image.jpg`

## 🎨 Personnalisation

### Couleurs
Les variables CSS sont définies en haut de `styles.css` :
```css
:root {
  --black: #050508;
  --dark: #0d0d14;
  --orange: #ff7b2e;
  --pink: #ff2d78;
  --cyan: #00e5ff;
  --gold: #f0c060;
  --cream: #e8d5b0;
  --muted: #8a8090;
  --white: #f4f0e8;
}
```

### Animations
Les animations principales sont contrôlées par GSAP dans `script.js`. Vous pouvez ajuster :
- Durées des animations
- Valeurs d'easing
- Délais des éléments
- Effets de parallaxe

## 📱 Responsive

Le site est optimisé pour :
- 📱 Mobile (< 600px)
- 📱 Tablette (600px - 900px)
- 💻 Desktop (> 900px)

Media queries disponibles pour les écrans jusqu'à 900px.

## ⚡ Performance

- Code CSS bien organisé et minifié possible
- JavaScript modulaire et performant
- Utilise `will-change` pour les animations GPU
- Lazy loading possible pour les images
- ScrollTrigger optimisé

## 🔧 Amélioration Futures

- [ ] Ajouter des images réelles pour les projets
- [ ] Implémenter le formulaire de contact
- [ ] Ajouter des cas d'études détaillés
- [ ] Optimiser les images avec WebP
- [ ] Ajouter le support du thème sombre/clair
- [ ] Intégrer un système de blog

## 📄 Licence

Tous droits réservés © 2026 Saiiko

## 👤 Auteur

**Saiiko** — Étudiant en informatique, IUT du Havre

---

**Créé avec ❤️ et beaucoup de CSS**
