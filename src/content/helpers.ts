// content helpers

export function restrictions(): void {
    document.querySelectorAll('input').forEach((input) => {
        input.disabled = true;
    });
}

export function derestrictions(): void {
    document.querySelectorAll('input').forEach((input) => {
        if (input.disabled) {
            input.disabled = false;
        }
    });
}
