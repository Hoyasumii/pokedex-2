export default function create() {
    if (localStorage.getItem("data") === null) {
        localStorage.setItem("data", []);
    }
}