import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFilePath);

const journeyFixture = JSON.parse(
	readFileSync(resolve(currentDirectory, '../fixtures/sales-calendar-to-vdp.json'), 'utf-8'),
) as {
	sales: unknown[];
	vehicles: unknown[];
	latencyMs: number;
};

test.describe('public sales calendar journey', () => {
	test('applies a basic filter, opens catalogue, opens reduced VDP, and returns to catalogue', async ({ page }) => {
		await page.addInitScript((fixture) => {
			(window as Window & { __E2E_MOCK_DATA__?: unknown }).__E2E_MOCK_DATA__ = fixture;
		}, journeyFixture);

		await page.goto('/');

		await expect(page.getByRole('heading', { name: /vehicle sales/i })).toBeVisible();
		await expect(page.getByRole('article').filter({ hasText: 'Prestige & Classic Motor Cars' })).toBeVisible();
		await expect(page.getByRole('article').filter({ hasText: 'Berlin EV Showcase' })).toBeVisible();

		await page.getByRole('button', { name: /live/i }).click();

		await expect(page.getByRole('article').filter({ hasText: 'Prestige & Classic Motor Cars' })).toBeVisible();
		await expect(page.getByRole('article').filter({ hasText: 'Berlin EV Showcase' })).toHaveCount(0);

		await page.getByRole('link', { name: /view catalogue for prestige & classic motor cars/i }).click();

		await expect(page).toHaveURL(/\/sales\/sale-london-journey-2026-07$/);
		await expect(page.getByText('2 lots in this sale')).toBeVisible();

		await page.getByRole('link', { name: /view details for aston martin db5/i }).click();

		await expect(page).toHaveURL(/\/vehicles\/lot-gb-journey-001$/);
		await expect(page.getByRole('heading', { name: 'Aston Martin DB5' })).toBeVisible();

		await page.getByRole('link', { name: /back to prestige & classic motor cars/i }).click();

		await expect(page).toHaveURL(/\/sales\/sale-london-journey-2026-07$/);
	});
});