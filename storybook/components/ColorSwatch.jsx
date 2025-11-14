import React from 'react';

const swatchesContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
};

const swatchStyle = {
    padding: '10px',
    borderRadius: '4px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const flattenTokens = (obj, prefix = '') => {
    let tokens = [];

    for (const key in obj) {
        if (obj[key].value && obj[key].type === 'color') {
            const cssName = `--${prefix}${key}`;
            tokens.push({
                name: cssName.replace(/\./g, '-'),
                value: obj[key].value,
            });

        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            tokens = tokens.concat(flattenTokens(obj[key], prefix + key + '-'));
        }
    }
    return tokens;
};

export const ColorSwatches = ({ sourceTokens }) => {
    const tokenList = flattenTokens(sourceTokens.color || sourceTokens.colors, 'color-');

    if (tokenList.length === 0) {
        return <div>Nie znaleziono tokenów kolorów w zaimportowanym obiekcie.</div>;
    }

    return (
        <div style={swatchesContainerStyle}>
            {tokenList.map(({ name, value }) => (
                <div key={name} style={{ ...swatchStyle, backgroundColor: value }}>
                    <p style={{ color: '#fff', textShadow: '0 0 3px #000', fontStyle: 'italic' }}>{name}</p>
                    <p style={{ color: '#fff', textShadow: '0 0 3px #000' }}>{value}</p>
                </div>
            ))}
        </div>
    );
};
