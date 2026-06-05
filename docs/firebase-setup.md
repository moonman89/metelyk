# Firebase setup (Metelyk)

## Project

- **ID:** `metelyk-shop`
- Enable **Firestore**, **Storage**, **Authentication** (Anonymous for tea guide)
- **Blaze** plan required for Cloud Functions

```bash
firebase login && firebase use metelyk-shop
npm run firebase:deploy:rules
```

Copy web app config into `.env` from `.env.example`.

## Asset paths (Storage seeding)

Upload from `public/assets/`:

| Local path | Storage path |
|------------|----------------|
| `products/{slug}.png` | `products/{slug}.png` |
| `teaware/{slug}.png` | `teaware/{slug}.png` |
| `brand/hero.png`, `brand/logo.png` | `brand/` |

## Firestore import

Import `data/catalog.json` into collections: `products`, `teaware`, `certificates`, `categories`.

See example admin script in git history (`scripts/seed-firestore.md`).
