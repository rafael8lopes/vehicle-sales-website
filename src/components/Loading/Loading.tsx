import '@/components/Loading/Loading.scss';

type LoadingProps = {
	message?: string;
};

export function Loading({ message = 'Loading…' }: LoadingProps) {
	return (
		<div className="loading" role="status">
			<div className="loading__spinner" />
			<p className="loading__message">{message}</p>
		</div>
	);
}
