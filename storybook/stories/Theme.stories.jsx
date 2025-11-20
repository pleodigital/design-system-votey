import React from 'react';
import {ColorSwatch} from '../components/ColorSwatch';
import colors from '../../tokens/base/colors.json';
import darkTokens from '../../tokens/dark-mode.json';
import lightTokens from '../../tokens/light-mode.json';
import {createShade, mapTokens} from "../utils";


const ALL_SHADES = [
    '25', '50', '70', '100', '200', '300',
    '400', '500', '600', '700', '800', '900'
];

const mainWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '100%',
    gap: 10,

};

const rowWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '16px',
    justifyContent: 'center',
    gap: 10,
};

const titleStyle = {
    fontSize: '18px',
    margin: 'unset',
    fontWeight: 'bold',
};

const rowStyle = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: 10,
};


function grabColor(str=''){
    const cleaned = str.replace(/[{}]/g, "");
    const parts = cleaned.split(".");
    const token = parts[1] || '';
    return [token, { ...colors.color[token], name: token }];
}

const Title = ({ children }) => <p style={titleStyle}>{children}</p>

const Item = ({ title='', data={} }) => {
    const { value } = data;
    const [token, color] = grabColor(value);

    //szpont
    const mappedColors = mapTokens([color]);
    const [finalColor] = ALL_SHADES.map(shade => {
        return createShade(mappedColors, token, shade, false);
    }).filter((item) => Boolean(item));

    return (
        <div style={rowWrapperStyle}>
            <Title>{title}</Title>
            <ColorSwatch fullName token={finalColor} />
        </div>
    );
};

//watchout! recursion
const RecursiveRow = ({ title='Row', data=[]}) => {
    if(Boolean(data?.type) && data.type === 'color') return <Item title={title} data={data}/>
    const src = Object.entries(data)
    return (
        <React.Fragment key={title}>
            <div style={rowWrapperStyle}>
                <Title>{title}</Title>
                <div style={rowStyle}>
                    {src.map(([key, value]) => (
                        <RecursiveRow key={key} title={key} data={value} />
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
};


export const Theme =({ theme='light' })=>{
    const tokens = theme === 'light' ? lightTokens : darkTokens;
    const src = Object.entries({ ...tokens })
    return (
        <div style={mainWrapperStyle}>
            {src.map(([key, value]) => (
                <React.Fragment key={key}>
                    <RecursiveRow key={key} title={key} data={value} />
                    <span style={{ width: '100%', height: '1px', backgroundColor: '#ddd', marginTop: '10px' }}/>
                </React.Fragment>
            ))}
        </div>
    )
}


export default {
    title: 'Tokens/Themes',
    component: Theme,
    argTypes:{
        theme:{
            options:['light', 'dark'],
            control:{ type: 'inline-radio' },
        },
    },
    args: {
        theme: 'light',
    },
};
