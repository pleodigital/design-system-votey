import React from 'react';
import { ColorSwatches } from '../components/ColorSwatch';
import * as generatedTokensModule from '../../dist/js/tailwind-preset.js';

const generatedTokens = generatedTokensModule.default;

export default {
    title: 'Tokens/Colors',
    component: ColorSwatches,
};

export const Palette = {
    // Pamiętaj, że generatedTokens ma strukturę Tailwind, np. { theme: { extend: { colors: { ... } } } }
    render: () => <ColorSwatches tokens={generatedTokens} />,
    name: 'All colors',
};
