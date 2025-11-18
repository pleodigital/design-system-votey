import React from 'react';
import './preview-styles.css'

const preview = {
    decorators: [
        (Story) => (
            <div style={{fontFamily: 'Nunito Sans, sans-serif'}}>
                <Story/>
            </div>
        ),
    ],
};
export default preview;
