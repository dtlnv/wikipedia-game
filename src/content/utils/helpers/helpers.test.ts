import { restrictions, derestrictions } from './index';

describe('helpers', () => {
    it('should disable inputs', () => {
        const input = document.createElement('input');
        input.type = 'text';
        document.body.appendChild(input);
        restrictions();
        expect(input.disabled).toBe(true);
    });

    it('should enable inputs', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.disabled = true;
        document.body.appendChild(input);
        derestrictions();
        expect(input.disabled).toBe(false);
    });
});
