const INPUT_SELECTOR = 'input[type=search], input[type=text]';

function setInputsDisabled(disabled: boolean): void {
    document.querySelectorAll<HTMLInputElement>(INPUT_SELECTOR).forEach((input) => {
        input.disabled = disabled;
    });
}

export function restrictions(): void {
    setInputsDisabled(true);
}

export function derestrictions(): void {
    setInputsDisabled(false);
}
