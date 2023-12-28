export default function size() {
    let dataLS = localStorage.getItem("data") == '' ? [] : localStorage.getItem("data").split(",");
    return dataLS.length;
}