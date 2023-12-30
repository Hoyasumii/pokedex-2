import mySlug from "../mySlug";
import getInput from "./getInput";

export default function getInputValue(id) {
    return mySlug(getInput(id).value);
}