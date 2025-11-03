import React from 'react';

const swatchesContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    padding: '20px',
};

const swatchStyle = {
    padding: '10px',
    borderRadius: '4px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const formatTokens = (tokens) => {
    const list = [];
    // Użyj logiki do iterowania przez Twoje tokeny (w tym przykładzie używamy przykładowej struktury)
    // W rzeczywistości zaimportujesz swój wygenerowany preset/JSON.
    if (tokens.theme && tokens.theme.extend && tokens.theme.extend.colors) {
        for (const [name, value] of Object.entries(tokens.theme.extend.colors)) {
            list.push({ name: name.replace('-', '.'), value });
        }
    }
    return list;
};


export const ColorSwatches = ({ tokens }) => {
    const tokenList = formatTokens(tokens);

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
