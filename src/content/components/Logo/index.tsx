import React from 'react';

/**
 * Logo component renders logo image based on the screen prop value (start, game, finish)
 */
const Logo: React.FC<LogoInterface> = ({ screen }) => {
    let logo: string = '';

    switch (screen) {
        case 'game':
            logo = 'logo-inprogress.png';
            break;
        case 'finish':
            logo = 'logo-finish.png';
            break;
        case 'start':
        default:
            logo = 'logo.png';
            break;
    }

    return (
        <div className='logo'>
            <img src={chrome.runtime.getURL(`images/${logo}`)} title='Wikipedia Game' />
        </div>
    );
};

export default Logo;
