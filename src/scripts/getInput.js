import slugify from "slugify";

export default function getInput() {
    let input = document.getElementById('pokemon-name');
    input = slugify(input.value, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true
    });
    return input;
}