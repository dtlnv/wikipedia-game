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

export function getPageTitle(url: string) {
    function getLastPartOfUrl(url: string) {
        const regex = /\/wiki\/(.*)$/;
        const match = url.match(regex);
        return match ? match[1] : '';
    }

    return decodeURIComponent(getLastPartOfUrl(url)).replace(/_/g, ' ');
}
