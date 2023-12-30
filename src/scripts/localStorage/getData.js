export default function getData() {
    let dataLS = localStorage.getItem("data").split(",");
    dataLS = dataLS.filter((item) => item !== "");
    dataLS.reverse();
    return dataLS;
}