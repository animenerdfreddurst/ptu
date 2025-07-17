# Vite Hot Reload
When the system is used via `npm run dev` and the system is accessed via a browser the vite dev server
will intercept callbacks to the foundry system folders.
## Benefits
Upon saving the edited file:
1. All css changes occur immediately (hot reload)
2. Saved changes javascript updates are also changed immediately, but depending on how they are loaded by the system their effect may not be visible until the vite server is restarted (r + enter)
3. Changes to .hbs template files can be visualized by a page reload