import { visit } from 'unist-util-visit';

// Extract a valid YouTube video or playlist descriptor from a candidate URL.
function parseYouTubeEmbed(rawUrl) {
	try {
		const url = new URL(rawUrl.trim());
		const host = url.hostname.replace(/^www\./, '');

		if (host === 'youtu.be') {
			const videoId = url.pathname.split('/').filter(Boolean)[0];
			if (videoId && /^[a-zA-Z0-9_-]{6,15}$/.test(videoId)) {
				return { kind: 'video', id: videoId };
			}
			return null;
		}

		if (
			host === 'youtube.com' ||
			host === 'm.youtube.com' ||
			host === 'youtube-nocookie.com'
		) {
			if (url.pathname === '/playlist') {
				const listId = url.searchParams.get('list');
				if (listId && /^[a-zA-Z0-9_-]{10,64}$/.test(listId)) {
					return { kind: 'playlist', id: listId };
				}
				return null;
			}

			if (url.pathname === '/watch') {
				const videoId = url.searchParams.get('v');
				if (videoId && /^[a-zA-Z0-9_-]{6,15}$/.test(videoId)) {
					return { kind: 'video', id: videoId };
				}
				return null;
			}

			const parts = url.pathname.split('/').filter(Boolean);
			if (
				(parts[0] === 'embed' || parts[0] === 'shorts' || parts[0] === 'v') &&
				parts[1] &&
				/^[a-zA-Z0-9_-]{6,15}$/.test(parts[1])
			) {
				return { kind: 'video', id: parts[1] };
			}
		}
	} catch {
		return null;
	}
	return null;
}

// Convert a parsed embed descriptor into an iframe HTML string.
function buildEmbedHtml(parsed) {
	const safeId = encodeURIComponent(parsed.id);
	const src =
		parsed.kind === 'playlist'
			? `https://www.youtube-nocookie.com/embed/videoseries?list=${safeId}`
			: `https://www.youtube-nocookie.com/embed/${safeId}`;

	return [
		'<div class="yt-embed">',
		`<iframe src="${src}" title="YouTube video player" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
		'</div>',
	].join('');
}

// Split a paragraph into segments separated by hard/soft breaks or blank lines.
function splitParagraphSegments(children) {
	const segments = [[]];
	for (const child of children || []) {
		if (child.type === 'break') {
			segments.push([]);
			continue;
		}
		if (child.type === 'text' && child.value.includes('\n')) {
			const lines = child.value.split('\n');
			lines.forEach((line, index) => {
				if (line.trim() !== '') {
					segments[segments.length - 1].push({ type: 'text', value: line });
				}
				if (index < lines.length - 1) {
					segments.push([]);
				}
			});
			continue;
		}
		segments[segments.length - 1].push(child);
	}
	return segments.filter((seg) => seg.length > 0);
}

// Match a single segment against a YouTube URL (plain text or autolink/link).
function matchSegmentYouTube(segment) {
	if (segment.length !== 1) return null;
	const node = segment[0];

	if (node.type === 'text') {
		return parseYouTubeEmbed(node.value);
	}
	if (
		node.type === 'link' &&
		node.children?.length === 1 &&
		node.children[0].type === 'text'
	) {
		return parseYouTubeEmbed(node.url);
	}
	return null;
}

export function remarkYouTube() {
	return (tree) => {
		visit(tree, 'paragraph', (node, index, parent) => {
			if (!parent || typeof index !== 'number') return;

			const segments = splitParagraphSegments(node.children);
			if (segments.length === 0) return;

			// Replace whole paragraph when every segment is a standalone YouTube URL.
			const allYouTube = segments.every((seg) => matchSegmentYouTube(seg) !== null);
			if (allYouTube) {
				const htmlNodes = segments.map((seg) => ({
					type: 'html',
					value: buildEmbedHtml(matchSegmentYouTube(seg)),
				}));
				parent.children.splice(index, 1, ...htmlNodes);
				return index + htmlNodes.length;
			}
		});
	};
}