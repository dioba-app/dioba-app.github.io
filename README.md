# dioba.app website

Plain HTML, CSS and JavaScript. No build step.

- `index.html`: homepage
- `calculator/`: the free rev-share calculator (`engine.js` does the math)
- `privacy.html`, `terms.html`
- `assets/site.js`: **your form links and email. Edit only this file to change them.**
- `assets/tokens.css`: colors, fonts and shared styles. See `DESIGN.md` for the design rules.
- `assets/fonts/`: self-hosted fonts (SIL Open Font License)
- `tests/engine.test.js`: run `node tests/engine.test.js` to check the calculator math

Test locally: `python3 -m http.server` in this folder, then open http://localhost:8000.
After editing on GitHub, run `sudo dioba-update-site` on the server.
