export const enumToText = (enumName?: string | null): string => {
    if (!enumName) return '';
    return enumName
        .replace(/_/g, ' ')
        .toLowerCase()
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export const slugToText = (slug?: string | null): string => {
    if (!slug) return '';
    return slug
        .replace(/-/g, ' ')
        .toLowerCase()
        .trim()
        .split(' ')
        .map((word: string) => {
            if (word.length > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word;
        })
        .join(' ');
}

export const upperToLower = (str: string): string => {
    if (!str) return '';
    return str
        .toLowerCase()
        .trim()
}
