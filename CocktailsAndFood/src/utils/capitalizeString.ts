export default function capitalizeString(input: string): string {
    const words = input.toLowerCase().split(' ');

    for (let i = 0; i < words.length; i++) {
        if (i === 0 || words[i - 1][words[i - 1].length - 1] === '.') {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        } else {
            words[i] = words[i].toLowerCase();
        }
    }

    return words.join(' ');
}
