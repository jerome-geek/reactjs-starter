import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import GlobalStyle from '../src/styles/global-styles';

addDecorator((story) => (
    <>
        <GlobalStyle />
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    </>
));

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
