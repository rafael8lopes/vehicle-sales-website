import { useSeo } from '@/app/useSeo';

export function NotFoundPage() {
	useSeo({
		title: 'Page Not Found',
		description: 'The requested page does not exist on AutoAuction.',
		canonicalPath: '/not-found',
		noIndex: true,
	});

	return (
		<section style={{ textAlign: 'center', padding: '4rem 1rem' }}>
			<h1>Page not found</h1>
			<p>The page you are looking for does not exist.</p>
		</section>
	);
}
