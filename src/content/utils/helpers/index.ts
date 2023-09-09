export function restrictions(): void {
    document.querySelectorAll<HTMLInputElement>('input[type=search], input[type=text]').forEach((input) => {
        input.disabled = true;
    });
}

export function derestrictions(): void {
    document.querySelectorAll<HTMLInputElement>('input[type=search], input[type=text]').forEach((input) => {
        if (input.disabled) {
            input.disabled = false;
        }
    });
}
