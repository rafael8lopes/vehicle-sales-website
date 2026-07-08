/// <reference types="vite/client" />
import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import '../src/app/i18n';
import '../src/styles/globals.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default preview;