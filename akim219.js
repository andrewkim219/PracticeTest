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
let length = 0;

async function caseCounts() {
    const response = await fetch("https://cws.auckland.ac.nz/Qz2021JGC/api/CaseCounts");
    const cases = await response.json();
    console.log(cases);
    Object.entries(cases).forEach(([key, value]) => {
        dates.push(key);
        counts.push(value);
    })
    generateGraph(dates, counts);
    length = dates.length;
    populateItems(dates, counts);
}

function populateItems(dates, counts) {
    const itemContainer = document.getElementById("itemContainer");
    let odd = true;
    for (let i = 0; i < length; i++) {
        const block = document.createElement("div");
        block.className = odd ? "odd" : "even";
        const itemContent = `
        <div>
        <h2>${dates[i]}</h2>
        <p>${counts[i]}</p>
        `;
        block.innerHTML = itemContent;
        itemContainer.appendChild(block);
        odd = !odd;
    }
}

caseCounts();

const graphContainer = document.getElementById("graphContainer");
function generateGraph(dates, counts) {
    const min = Math.min(...counts);
    const max = Math.max(...counts);
    const length = dates.length;
    const startDate = dates[0];
    const endDate = dates[length - 1];
    const xSpacing = 650 / (length - 1);
    const ySpacing = 350 / (max - min);

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 800 2000");

    const rect = document.createElementNS(svgNS,"rect");
    rect.setAttribute("width", "800");
    rect.setAttribute("height", "2000");
    rect.setAttribute("fill", "grey");
    svg.appendChild(rect);

    const xAxis = document.createElementNS(svgNS, "line");
    xAxis.setAttribute("x1", "50");
    xAxis.setAttribute("y1", "400");
    xAxis.setAttribute("x2", "700");
    xAxis.setAttribute("y2", "400");
    xAxis.setAttribute("stroke", "black");
    svg.appendChild(xAxis);

    const xAxis2 = document.createElementNS(svgNS, "line");
    xAxis2.setAttribute("x1", "50");
    xAxis2.setAttribute("y1", "50");
    xAxis2.setAttribute("x2", "700");
    xAxis2.setAttribute("y2", "50");
    xAxis2.setAttribute("stroke", "black");
    svg.appendChild(xAxis2);

    const yAxis = document.createElementNS(svgNS, "line");
    yAxis.setAttribute("x1", "50");
    yAxis.setAttribute("y1", "400");
    yAxis.setAttribute("x2", "50");
    yAxis.setAttribute("y2", "50");
    yAxis.setAttribute("stroke", "black");
    svg.appendChild(yAxis);

    const yAxis2 = document.createElementNS(svgNS, "line");
    yAxis2.setAttribute("x1", "700");
    yAxis2.setAttribute("y1", "400");
    yAxis2.setAttribute("x2", "700");
    yAxis2.setAttribute("y2", "50");
    yAxis2.setAttribute("stroke", "black");
    svg.appendChild(yAxis2);

    const minText = document.createElementNS(svgNS, "text");
    minText.setAttribute("x", "30");
    minText.setAttribute("y", "400");
    minText.setAttribute("font-size", "20");
    minText.textContent = min.toString();
    svg.appendChild(minText);

    const maxText = document.createElementNS(svgNS, "text");
    maxText.setAttribute("x", "10");
    maxText.setAttribute("y", "55");
    maxText.setAttribute("font-size", "20");
    maxText.textContent = max.toString();
    svg.appendChild(maxText);

    const start = document.createElementNS(svgNS, "text");
    start.setAttribute("x", "40");
    start.setAttribute("y", "430");
    start.setAttribute("font-size", "20");
    start.textContent = startDate;
    svg.appendChild(start);

    const end = document.createElementNS(svgNS, "text");
    end.setAttribute("x", "650");
    end.setAttribute("y", "430");
    end.setAttribute("font-size", "20");
    end.textContent = endDate;
    svg.appendChild(end);

    let visitPoints = "";
    for (let i = 0; i < length; i++) {
        const x = 50 + (i * xSpacing);
        const y = 400 - (counts[i] - min) * ySpacing;
        visitPoints += `${x} ${y} `;
    }

    const stats = document.createElementNS(svgNS, "polyline");
    stats.setAttribute("points", visitPoints);
    stats.setAttribute("stroke", "red");
    stats.setAttribute("stroke-width", "2");
    stats.setAttribute("fill", "none");
    stats.setAttribute("stroke-linejoin", "round");
    svg.appendChild(stats);

    graphContainer.appendChild(svg);
}
