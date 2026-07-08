import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

import '@/components/Dropdown/Dropdown.scss';

export type DropdownOption<TValue extends string> = {
	value: TValue;
	label: string;
	icon?: ReactNode;
	triggerLabel?: ReactNode;
};

type DropdownProps<TValue extends string> = {
	value: TValue;
	options: DropdownOption<TValue>[];
	onChange: (value: TValue) => void;
	ariaLabel: string;
	className?: string;
};

export function Dropdown<TValue extends string>({
	value,
	options,
	onChange,
	ariaLabel,
	className,
}: DropdownProps<TValue>) {
	const [isOpen, setIsOpen] = useState(false);
	const [menuSide, setMenuSide] = useState<'right' | 'left'>('right');
	const containerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLUListElement>(null);

	useLayoutEffect(() => {
		if (!isOpen || !menuRef.current) {
			return;
		}

		const rect = menuRef.current.getBoundingClientRect();

		if (rect.left < 0) {
			setMenuSide('left');
		} else if (rect.right > window.innerWidth) {
			setMenuSide('right');
		}
	}, [isOpen]);

	const selectedOption = options.find((option) => option.value === value) ?? options[0];

	const handleSelect = (selectedValue: TValue) => {
		onChange(selectedValue);
		setIsOpen(false);
	};

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handlePointerDown = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handlePointerDown);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handlePointerDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	if (!selectedOption) {
		return null;
	}

	return (
		<div className={clsx('dropdown', className)} ref={containerRef}>
			<button
				type="button"
				className="dropdown__trigger"
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				aria-label={ariaLabel}
				onClick={() => setIsOpen((open) => !open)}
			>
				{selectedOption.icon && (
					<span className="dropdown__icon" aria-hidden="true">
						{selectedOption.icon}
					</span>
				)}
				<span className="dropdown__trigger-label">
					{selectedOption.triggerLabel ?? selectedOption.label}
				</span>
				<ChevronDown className="dropdown__chevron" size={14} aria-hidden="true" />
			</button>

			{isOpen && (
			<ul
				ref={menuRef}
				className={clsx('dropdown__menu', menuSide === 'left' && 'dropdown__menu--left')}
				role="listbox"
				aria-label={ariaLabel}
			>
					{options.map((option) => {
						const isActive = option.value === selectedOption.value;

						return (
							<li key={option.value} role="none">
								<button
									type="button"
									role="option"
									aria-selected={isActive}
									className="dropdown__option"
									onClick={() => handleSelect(option.value)}
								>
									{option.icon && (
										<span className="dropdown__icon" aria-hidden="true">
											{option.icon}
										</span>
									)}
									<span className="dropdown__option-label">{option.label}</span>
									{isActive && (
										<Check className="dropdown__check" size={14} aria-hidden="true" />
									)}
								</button>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
