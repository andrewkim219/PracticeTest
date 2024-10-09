const menuDaily = document.getElementById("menuDaily");
const menuInfo = document.getElementById("menuInfo");
const menuStats = document.getElementById("menuStats");

const sectionDaily = document.getElementById("sectionDaily");
const sectionInfo = document.getElementById("sectionInfo");
const sectionStats = document.getElementById("sectionStats");

function showDaily() {
    menuDaily.style.backgroundColor = "red";
    menuInfo.style.backgroundColor = "transparent";
    menuStats.style.backgroundColor = "transparent";

    sectionDaily.style.display = "block";
    sectionInfo.style.display = "none";
    sectionStats.style.display = "none";
}

function showInfo() {
    menuDaily.style.backgroundColor = "transparent";
    menuInfo.style.backgroundColor = "red";
    menuStats.style.backgroundColor = "transparent";

    sectionDaily.style.display = "none";
    sectionInfo.style.display = "block";
    sectionStats.style.display = "none";
}

function showStats() {
    menuDaily.style.backgroundColor = "transparent";
    menuInfo.style.backgroundColor = "transparent";
    menuStats.style.backgroundColor = "red";

    sectionDaily.style.display = "none";
    sectionInfo.style.display = "none";
    sectionStats.style.display = "block";
}

showDaily();

menuDaily.addEventListener("click", showDaily);
menuInfo.addEventListener("click", showInfo);
menuStats.addEventListener("click", showStats);

const favicon = document.getElementById("favicon");
async function setFavicon() {
    const response = await fetch("https://cws.auckland.ac.nz/Qz2021JGC/logo192.png");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    favicon.href = url;
}

setFavicon();

let dates = [];
let counts = [];

async function caseCounts() {
    const response = await fetch("https://cws.auckland.ac.nz/Qz2021JGC/api/CaseCounts");
    const cases = await response.json();
    console.log(cases);
    Object.entries(cases).forEach(([key, value]) => {
        dates.push(key);
        counts.push(value);
    })
    generateGraph(dates, counts);
}

caseCounts();

const graphContainer = document.getElementById("graphContainer");
function generateGraph(dates, counts) {
    const min = Math.min(...counts);
    const max = Math.max(...counts);
    const length = dates.length;
    const startDate = dates[0];
    const endDate = dates[length - 1];

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 800 500");

    const xAxis = document.createElementNS(svgNS, "line");
    xAxis.setAttribute("x1", "50");
    xAxis.setAttribute("y1", "400");
    xAxis.setAttribute("x2", "700");
    xAxis.setAttribute("y2", "400");
    xAxis.setAttribute("stroke", "black");
    svg.appendChild(xAxis);

    const yAxis = document.createElementNS(svgNS, "line");
    yAxis.setAttribute("x1", "50");
    yAxis.setAttribute("y1", "400");
    yAxis.setAttribute("x2", "50");
    yAxis.setAttribute("y2", "50");
    yAxis.setAttribute("stroke", "black");
    svg.appendChild(yAxis);









    graphContainer.appendChild(svg);
}
