# Guide de Déploiement et Maintenance

## 🎯 Vue d'ensemble

Ce portfolio est un site statique entièrement côté client. Il ne nécessite aucun serveur backend pour fonctionner, juste un serveur web pour servir les fichiers.

## 🚀 Déploiement

### Option 1 : GitHub Pages (Gratuit)
```bash
# 1. Pousser le code sur GitHub
git add .
git commit -m "Initial portfolio commit"
git push origin main

# 2. Aller sur GitHub → Settings → Pages
# 3. Sélectionner "Deploy from a branch"
# 4. Choisir la branche "main" et "/ (root)"
# 5. Sauvegarder
```

URL finale : `https://username.github.io/portfolio`

### Option 2 : Netlify (Gratuit avec CI/CD)
```bash
# 1. Se connecter sur netlify.com
# 2. Cliquer "New site from Git"
# 3. Sélectionner le repo GitHub
# 4. Laisser les paramètres par défaut
# 5. Cliquer "Deploy"
```

### Option 3 : Vercel (Gratuit avec CI/CD)
```bash
# 1. Se connecter sur vercel.com
# 2. Cliquer "New Project"
# 3. Importer le repo GitHub
# 4. Cliquer "Deploy"
```

### Option 4 : Serveur Personnel (VPS/Hosting)
```bash
# 1. Télécharger les fichiers via FTP
# 2. Placer tous les fichiers dans le répertoire public_html/
# 3. S'assurer que index.html est à la racine
# 4. Visiter votre domaine
```

## 🔧 Maintenance Locale

### Démarrer un serveur local
```bash
# Python 3
python -m http.server 8000

# Puis visiter http://localhost:8000

# Ou avec npm (si Node.js est installé)
npx http-server

# Ou avec VS Code (extension Live Server)
# Clic droit sur index.html → "Open with Live Server"
```

## 📝 Modifications Courantes

### Changer les informations personnelles
- Éditer `index.html` pour le nom et la description
- Mettre à jour les e-mails et liens sociaux

### Ajouter un nouveau projet
1. Dupliquer un bloc `project-section` dans `index.html`
2. Changer les textes et couleurs
3. Actualiser le navigateur

### Modifier les couleurs
- Ouvrir `src/css/styles.css`
- Aller à `:root { ... }`
- Changer les valeurs des variables de couleur

### Optimiser les images
```bash
# Avec ImageMagick
convert image.jpg -resize 1200x800 -quality 85 image-optimized.jpg

# Ou utiliser des outils en ligne :
# - TinyPNG.com
# - Squoosh.app
```

## ⚡ Performance

### Checklist de performance
- [ ] Images optimisées et compressées
- [ ] CSS et JS minifiés (optionnel)
- [ ] Lazy loading pour les images
- [ ] Cache navigateur configuré
- [ ] GZIP activé sur le serveur

### Tester la performance
- Utiliser [PageSpeed Insights](https://pagespeed.web.dev/)
- Utiliser [GTmetrix](https://gtmetrix.com/)
- Utiliser les DevTools du navigateur (F12 → Lighthouse)

## 🔐 Sécurité

### Recommandations
- Utiliser HTTPS (automatique avec GitHub Pages, Netlify, Vercel)
- Valider tous les formulaires côté client ET serveur
- Ne pas stocker de secrets dans le code
- Mettre à jour régulièrement les dépendances
- Utiliser Content Security Policy (CSP)

### Headers de sécurité (si applicable)
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 📊 Analytics

### Ajouter Google Analytics
```html
<!-- Ajouter à la fin de index.html, avant </body> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 🐛 Dépannage

### Le site ne s'affiche pas
1. Vérifier que tous les fichiers sont présents
2. Vérifier les chemins des ressources (CSS, JS)
3. Ouvrir la console (F12) pour voir les erreurs
4. S'assurer que le serveur fonctionne

### Les animations ne fonctionnent pas
1. Vérifier que GSAP est chargé (Inspecteur → Network)
2. Vérifier que `script.js` est chargé
3. Ouvrir la console pour voir les erreurs JavaScript
4. Vérifier que les éléments HTML ont les bons IDs

### Problèmes de responsive
1. Ajouter la meta viewport : ✓ (déjà présente)
2. Tester avec l'inspecteur responsive (F12 → Responsive Design Mode)
3. Tester sur de vrais appareils
4. Vérifier les media queries dans CSS

## 📈 Suivi des visiteurs

Metrics importants à suivre :
- Nombre de visiteurs
- Temps de chargement
- Taux de rebond
- Pages les plus visitées
- Sources de trafic

## 🔄 Mise à jour

### Calendrier recommandé
- ✅ Mise à jour du portfolio : Tous les trimestres
- ✅ Ajout de nouveaux projets : Au fur et à mesure
- ✅ Audit de performance : Tous les 6 mois
- ✅ Vérification des liens : Mensuellement

## 📞 Support

En cas de problème :
1. Consulter la console du navigateur (F12)
2. Vérifier les chemins des fichiers
3. Redémarrer le serveur
4. Vider le cache du navigateur (Ctrl+F5)
5. Tester sur un autre navigateur

---

**Dernière mise à jour** : Mai 2026
**Version** : 1.0.0
