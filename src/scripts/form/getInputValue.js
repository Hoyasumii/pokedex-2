import mySlug from "../mySlug";
import getInput from "./getInput";

export default function getInputValue() {
    return mySlug(getInput().value);
}