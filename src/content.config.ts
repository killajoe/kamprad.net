import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z
			.object({
				title: z.string(),
				description: z.string().optional().default(''),
				// Support both WordPress export (`date`) and Astro template (`pubDate`)
				date: z.coerce.date().optional(),
				pubDate: z.coerce.date().optional(),
				updatedDate: z.coerce.date().optional(),
				categories: z.array(z.string()).optional().default([]),
				tags: z.array(z.string()).optional().default([]),
				// WordPress export saves the filename string in `coverImage`
				coverImage: z.string().optional(),
				heroImage: z.optional(image()),
			})
			.transform((data) => ({
				...data,
				// Ensure `pubDate` is always populated from either `pubDate` or `date`
				pubDate: data.pubDate ?? data.date ?? new Date(0),
			})),
});

export const collections = { blog };