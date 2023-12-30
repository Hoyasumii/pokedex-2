export default function sendingDataToLS(data, setLs) {
    let dataLS = localStorage.getItem("data").split(",");
    dataLS = dataLS.filter((item) => item != data);
    dataLS.push(data);
    localStorage.setItem("data", dataLS);
    setLs(dataLS);
}