export default function unslugify(slug) {
    const words = slug.split('-');
    const capitalizedWords = words.map(word => {
        const firstLetter = word[0].toUpperCase();
        const restOfWord = word.slice(1);
        return firstLetter + restOfWord;
    });
    return capitalizedWords.join(' ');
}