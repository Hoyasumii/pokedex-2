export default function createIfNotExist() {
    if (localStorage.getItem("data") === null) {
        localStorage.setItem("data", []);
    }
}