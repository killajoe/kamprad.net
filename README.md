# joekamprad's Blog

Personal blog of **joekamprad** (Der Doktor). I write about whatever is on my mind: technology, cooking, politics, and thoughts on existence.

**Live:** https://kamprad.net

## Topics

- **Technology**: Linux, open source, software and tinkering
- **Cooking**: recipes, experiments and kitchen notes
- **Politics**: opinions and commentary
- **Life & existence**: reflections and random thoughts

## About

I'm a developer and lead maintainer of the ISO and desktop setups for [EndeavourOS](https://endeavouros.com/). This blog, however, is not limited to that. Here you can dive into what is rattling inside my brain aside that..

## Features

- Minimal styling based on the Astro blog template
- 100/100 Lighthouse performance
- SEO-friendly with canonical URLs and Open Graph data
- Sitemap support
- RSS feed support
- Markdown & MDX support

## Project Structure

```text
├── public/            # Static files (images, favicon, fonts)
├── src/
│   ├── assets/        # Imported images and graphics
│   ├── components/    # Astro components
│   ├── content/
│   │   └── blog/      # Blog posts (.md / .mdx)
│   ├── layouts/       # Page layouts
│   └── pages/         # Routes, derived from file names
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Every `.astro` or `.md` file in `src/pages/` becomes a route automatically. Posts live in the content collection at `src/content/blog/`, and their frontmatter is validated by a schema in `src/content.config.ts`. See the [Content Collections docs](https://docs.astro.build/en/guides/content-collections/).

## Writing a New Post

1. Create a file in `src/content/blog/`, e.g. `my-post.md`
2. Fill in the frontmatter:

   ```md
   ---
   title: "Post title"
   description: "Short description for previews and SEO"
   pubDate: 2026-11-22
   heroImage: "../../assets/my-image.jpg"
   ---
   ```

3. Write the post, check it locally with `npm run dev`, then commit.

### Adding Files to Posts (PDFs, configs, etc.)

Downloadable files such as PDFs, config files or archives go into `public/files/`. Everything in `public/` is served as-is from the site root, so `public/files/example.pdf` is available at `/files/example.pdf`.

Link to a file in a post with an absolute path starting with `/files/`:

```md
[Download the PDF](/files/example.pdf)
[My sway config](/files/sway-config)
```

Notes:

- Do **not** include `public` in the link: use `/files/...`, not `/public/files/...`.
- Use lowercase file names without spaces (e.g. `my-config.conf`) to avoid broken links.
- Images that should be optimized by Astro belong in `src/assets/` instead.
- To force a download instead of opening the file in the browser (in `.mdx` or raw HTML), use `<a href="/files/example.pdf" download>Download</a>`.

### Embedding PDFs

PDFs from `public/files/` can be displayed directly inside a post. Wrap an `<iframe>` in a `pdf-embed` div:

```html
<div class="pdf-embed">
  <iframe src="/files/example.pdf" title="Description of the PDF"></iframe>
</div>
```

Always set a meaningful `title` for accessibility. The `pdf-embed` class takes care of the sizing and styling.

### Embedding YouTube Videos

YouTube links in a post are automatically rendered as an embedded video player, so no HTML is needed. Just paste the link:

```md
https://www.youtube.com/watch?v=VIDEO_ID
```

## Commands

All commands are run from the root of the project:

| Command                   | Action                                            |
| :------------------------ | :------------------------------------------------ |
| `npm install`             | Installs dependencies                             |
| `npm run dev`             | Starts local dev server at `localhost:4321`       |
| `npm run build`           | Builds the production site to `./dist/`           |
| `npm run preview`         | Previews the build locally before deploying       |
| `npm run astro ...`       | Runs CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Shows help for the Astro CLI                      |

## License & Credits

- Content: © joekamprad ([joelicense 1.0 (2021)](https://kamprad.net/privacy/))
- Built with [Astro](https://astro.build/)
- Theme based on the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/)
