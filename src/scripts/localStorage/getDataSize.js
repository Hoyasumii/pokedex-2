export default function getDataSize() {
    let dataLS = localStorage.getItem("data") == '' ? [] : localStorage.getItem("data").split(",");
    return dataLS.length;
}