import type { FC } from 'react';

interface LogoInterface {
    screen: 'start' | 'game' | 'finish';
}

/**
 * Logo component renders logo image based on the screen prop value (start, game, finish)
 */
const Logo: FC<LogoInterface> = ({ screen }) => {
    let logo: string = '';

    switch (screen) {
        case 'game':
            logo = 'logo-inprogress.png';
            break;
        case 'finish':
            logo = 'logo-finish.png';
            break;
        default:
            logo = 'logo.png';
            break;
    }

    return (
        <div className='logo'>
            <img src={chrome.runtime.getURL(`images/${logo}`)} title='Wiki Game' alt='Wiki Game' />
        </div>
    );
};

export default Logo;
