import { useEffect } from 'react';

const metaTagCache = new Map<string, HTMLMetaElement>();
let canonicalLinkCache: HTMLLinkElement | null = null;

type UseSeoParams = {
	title: string;
	description: string;
	canonicalPath: string;
	noIndex?: boolean;
};

export function useSeo({ title, description, canonicalPath, noIndex = false }: UseSeoParams) {
	useEffect(() => {
		const seoTitle = `${title} | AutoAuction`;
		const canonicalUrl = buildAbsoluteUrl(canonicalPath);

		if (document.title !== seoTitle) {
			document.title = seoTitle;
		}

		setMetaTag('name', 'description', description);
		setMetaTag('name', 'robots', noIndex ? 'noindex,nofollow' : 'index,follow');
		setMetaTag('property', 'og:title', seoTitle);
		setMetaTag('property', 'og:description', description);
		setMetaTag('property', 'og:type', 'website');
		setMetaTag('property', 'og:url', canonicalUrl);
		setMetaTag('name', 'twitter:title', seoTitle);
		setMetaTag('name', 'twitter:description', description);
		setCanonicalLink(canonicalUrl);
	}, [canonicalPath, description, noIndex, title]);
}

function buildAbsoluteUrl(path: string) {
	if (typeof window === 'undefined') {
		return path;
	}

	return new URL(path, window.location.origin).toString();
}

function setMetaTag(attribute: 'name' | 'property', key: string, content: string) {
	const cacheKey = `${attribute}:${key}`;
	let tag = metaTagCache.get(cacheKey);

	if (!tag || !tag.isConnected) {
		const selector = `meta[${attribute}="${key}"]`;
		tag = document.head.querySelector<HTMLMetaElement>(selector);

		if (!tag) {
			tag = document.createElement('meta');
			tag.setAttribute(attribute, key);
			document.head.appendChild(tag);
		}

		metaTagCache.set(cacheKey, tag);
	}

	if (tag.content !== content) {
		tag.content = content;
	}
}

function setCanonicalLink(href: string) {
	let canonical = canonicalLinkCache;

	if (!canonical || !canonical.isConnected) {
		canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

		if (!canonical) {
			canonical = document.createElement('link');
			canonical.rel = 'canonical';
			document.head.appendChild(canonical);
		}

		canonicalLinkCache = canonical;
	}

	if (canonical.href !== href) {
		canonical.href = href;
	}
}