# luxbase.github.io

Static homepage for LuxbaseDev services.

## Contact Form

The contact form uses Web3Forms. Add your public access key locally:

```sh
NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here
```

Then generate the browser config file:

```sh
node scripts/build-web3forms-config.mjs
```

Commit the generated `web3forms-config.js` before publishing with GitHub Pages. The `.env` file stays local and is ignored.
