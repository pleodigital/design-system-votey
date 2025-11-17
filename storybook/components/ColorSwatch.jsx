import React from 'react';

const swatchesContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '10px',
    padding: '10px',
};

const swatchStyle = {
    padding: '10px',
    borderRadius: '4px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

export const ColorSwatch = ({ key, token }) => {
    return (
        <div style={swatchesContainerStyle}>
            <div key={key} style={{ ...swatchStyle, backgroundColor: token.value }}>
                <p style={{ color: '#fff', textShadow: '0 0 3px #000', fontStyle: 'italic' }}>{token.name}</p>
                <p style={{ color: '#fff', textShadow: '0 0 3px #000' }}>{token.value}</p>
            </div>
        </div>
    );
};
