import React from 'react';
import {ColorSwatch} from '../components/ColorSwatch';
import sourceTokens from '../../tokens/base/colors.json';

export default {
    title: 'Tokens/Colors',
    component: ColorSwatch,
};

const flattenTokens = (obj, prefix = '') => {
    let tokens = [];

    for (const key in obj) {
        if (obj[key].value && obj[key].type === 'color') {
            const rawCssName = `${prefix}${key}`;
            const name = `--${rawCssName.replace(/\./g, '-')}`;

            tokens.push({
                name: name,
                value: obj[key].value,
            });

        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            tokens = tokens.concat(flattenTokens(obj[key], prefix + key + '-'));
        }
    }

    tokens.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    return tokens;
};

const groupTokensByBaseColor = (flatTokens) => {
    const grouped = {};

    flatTokens.forEach(token => {
        const nameWithoutPrefix = token.name.replace(/^--color-/, '');
        const parts = nameWithoutPrefix.split('-');
        let groupKey = parts[0];
        if (parts.length > 1 && isNaN(parseInt(parts[1]))) {
            groupKey = parts[0] + '-' + parts[1];
        }

        if (!grouped[groupKey]) {
            grouped[groupKey] = [];
        }

        grouped[groupKey].push(token);
    });

    return grouped;
};

const ColorRow = ({ groupName, tokens }) => (
    <div style={{ marginBottom: '1px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        <h3 style={{fontStyle: 'italic', fontSize: "14px", color: tokens[0].value === '#ffffff' ? '#c6c6c6' : tokens[0].value}}>{groupName.toUpperCase()}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {tokens.map(token => (
                <ColorSwatch key={token.name} token={token} />
            ))}
        </div>
    </div>
);


export const Palette = {
    render: () => {
        const flatTokens = flattenTokens(sourceTokens.color || sourceTokens.colors, 'color-');
        const groupedTokens = groupTokensByBaseColor(flatTokens);
        return (
            <div>
                {Object.keys(groupedTokens).sort().map(groupName => (
                    <ColorRow
                        key={groupName}
                        groupName={groupName}
                        tokens={groupedTokens[groupName]}
                    />
                ))}
            </div>
        );
    },
    name: 'Design System | Color Tokens from FIGMA',
};
