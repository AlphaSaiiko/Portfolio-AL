# Images pour les Projets

## Comment ajouter tes images

Ajoute tes images de projet dans ce dossier avec les noms suivants :

### Noms des fichiers attendus:
- `project-1.jpg` - Portfolio Interactif
- `project-2.jpg` - Plateforme Collaborative  
- `project-3.jpg` - Application Mobile Native
- `project-4.jpg` - API Scalable
- `project-5.jpg` - Monde 3D Interactif

## Formats recommandés:
- **Format**: JPG ou PNG
- **Taille**: 1200x900px minimum (ratio 4:3)
- **Poids**: < 500KB chacun (optimisé pour le web)

## Exemple de chemin d'accès:
```
src/images/project-1.jpg
src/images/project-2.jpg
src/images/project-3.jpg
src/images/project-4.jpg
src/images/project-5.jpg
```

## Alternative rapide - Images de démonstration

Tu peux aussi remplacer les chemins dans `index.html` par des URLs externes :

```html
<img src="https://via.placeholder.com/1200x900?text=Projet+1" alt="Portfolio Interactif" class="project-image">
```

Voici quelques sites pour des images placeholders:
- https://picsum.photos/1200/900 (images aléatoires)
- https://via.placeholder.com/1200x900 (placeholder coloré)
- https://unsplash.com (images gratuites de qualité)
- https://pexels.com (images libres de droits)

## Optimisation des images

Pour optimiser tes images:
1. Redimensionne-les à 1200x900px
2. Compresse-les avec:
   - https://tinypng.com (lossy)
   - https://compressor.io (sans perte)
   - ou utilise ImageMagick: `convert image.jpg -resize 1200x900 -quality 85 compressed.jpg`

## Note

Les images disparaîtront si le chemin est invalide (c'est intentionnel avec l'attribut `onerror="this.style.display='none'"`), et les dégradés colorés s'afficheront à la place.
