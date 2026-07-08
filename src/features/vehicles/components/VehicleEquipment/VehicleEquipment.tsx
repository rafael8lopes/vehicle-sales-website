import { CircleCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import '@/features/vehicles/components/VehicleEquipment/VehicleEquipment.scss';

type VehicleEquipmentProps = {
	equipment: string[];
};

export function VehicleEquipment({ equipment }: VehicleEquipmentProps) {
	const { t } = useTranslation();

	if (equipment.length === 0) return null;

	return (
		<section className="vehicle-equipment">
			<h2 className="vehicle-equipment__title">{t('vehicleEquipment.title')}</h2>
			<ul className="vehicle-equipment__list">
				{equipment.map((item) => (
					<li key={item} className="vehicle-equipment__item">
						<CircleCheck size={14} aria-hidden="true" />
						{item}
					</li>
				))}
			</ul>
		</section>
	);
}
