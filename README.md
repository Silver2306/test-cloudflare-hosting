# test-cloudflare-hosting

A tiny Next.js site (Home, About, Blog + posts, Contact, 404) for learning how to host on Cloudflare.
It uses a **static export** (`output: "export"`), so `npm run build` produces plain files in `./out`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes ./out
```

## Deploy option 1: Git integration (recommended for learning)

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → connect the repo.
3. Build command: `npm run build` · Build output directory / assets: `out`
   (if the form asks for a deploy command use `npx wrangler deploy`; `wrangler.jsonc` points at `./out`).
4. Every push to the branch redeploys automatically. You get a `*.workers.dev` / `*.pages.dev` URL.

## Deploy option 2: CLI

```bash
npm run build
npx wrangler login
npx wrangler deploy
```

## Next steps to explore

- Add a custom domain in the Cloudflare dashboard.
- Preview deployments from other branches.
- For SSR/API routes, switch from static export to the `@opennextjs/cloudflare` adapter.
