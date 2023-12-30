import mySlug from "../mySlug";

export default function getInput() {
    let input = document.getElementById('pokemon-name');
    return mySlug(input.value);
}