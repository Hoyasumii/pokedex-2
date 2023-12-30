import slugify from "slugify";

export default function mySlug(value) {
    return slugify(value, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true
    });
}