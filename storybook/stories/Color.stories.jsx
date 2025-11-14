import React from 'react';
import { ColorSwatches } from '../components/ColorSwatch';
import sourceTokens from '../../tokens/base/colors.json';

export default {
    title: 'Tokens/Colors',
    component: ColorSwatches,
};

export const Palette = {
    render: () => <ColorSwatches sourceTokens={sourceTokens} />,
    name: 'Color Palette (based on Figma Design System)',
};
