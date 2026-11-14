# Other Privacy Policies, Vikaranet (Pty) Ltd

Privacy policies for Vikaranet apps, served from two places so they stay online if one fails.

| | URL | Role |
|---|---|---|
| **Cloudflare Worker** | https://policies.vikaranet.com/audit-and-order/ | Primary. Use this in Play Console |
| **GitHub Pages** | https://victorkgwaadira-ctrl.github.io/other-privacy-policies/audit-and-order/ | Backup mirror |

If the Worker is ever down, open Play Console > App content > Privacy policy, paste the GitHub Pages link and save.

## Layout
```
docs/                         <- the pages (single source of truth)
  index.html                  <- list of all policies
  app-ads.txt                 <- AdMob authorised-seller line
  audit-and-order/index.html  <- Audit & Order policy
  heisenbug/index.html        <- Heisenbug policy
  entropy-rush/index.html     <- Entropy Rush policy
  spooky-twins/index.html     <- Spooky Twins policy
worker.js                     <- Cloudflare Worker, imports the pages from docs/
wrangler.toml                 <- Worker config (name must stay "other-privacy-policies")
```

## Policies
| App | Path |
|---|---|
| Audit & Order | `/audit-and-order/` (aliases: `/auditandorder`, `/audit-order`, `/audit`, `/com.vikaranet.auditandorder`) |
| Heisenbug | `/heisenbug/` (aliases: `/heisenbug/privacy`, `/com.vikaranet.heisenbug`) |
| Entropy Rush | `/entropy-rush/` (aliases: `/entropyrush`, `/entropy-rush/privacy`, `/com.vikaranet.entropyrush`) |
| Spooky Twins | `/spooky-twins/` (aliases: `/spookytwins`, `/spooky`, `/spooky-twins/privacy`, `/com.vikaranet.spookytwins`) |

## Add a new app policy
1. Create `docs/<slug>/index.html`.
2. Add a link card for it in `docs/index.html`.
3. In `worker.js`, add `import myApp from "./docs/<slug>/index.html";` and `"<slug>": myApp,` in `PAGES`.
4. Commit and push to `main`. The Worker (via Workers Builds) and GitHub Pages both update automatically.

## Deploys
Pushing to `main` triggers Cloudflare Workers Builds (`npx wrangler deploy`) and GitHub Pages automatically.

## Rollback
- Worker: Cloudflare dashboard > other-privacy-policies > Deployments > roll back, or `git revert` the bad commit and push.
- Pages: `git revert` and push.
