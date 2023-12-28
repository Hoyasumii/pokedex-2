export default function add(data, setLs) {
    let dataLS = localStorage.getItem("data").split(",");
    dataLS.push(data);
    localStorage.setItem("data", dataLS);
    setLs(dataLS);
}