function simulate() {
    console.log("Simulate");
}

function stop() {
    console.log("Stop");
}

function nextStep() {
    console.log("Next step");
}

function restart() {
    console.log("Restart");
}

function startAnotherSimulation() {
    console.log("Start another simulation");
}

function finish() {
    console.log("Finish");
}

function generateRandomData() {
    const numJobs = parseInt(document.getElementById('numJobs').value, 10);
    const jobPoolBody = document.getElementById('jobPoolBody');
    const readyQueueList = document.getElementById('readyQueueList');
    jobPoolBody.innerHTML = ''; // Clear existing data
    readyQueueList.innerHTML = ''; // Clear existing data

    for (let i = 0; i < numJobs; i++) {
        const row = jobPoolBody.insertRow();
        row.insertCell(0).textContent = i + 1;
        row.insertCell(1).textContent = Math.floor(Math.random() * 10); // Random arrival time between 0 and 9
        row.insertCell(2).textContent = Math.floor(Math.random() * 10) + 1; // Random burst time between 1 and 10
        row.insertCell(3).textContent = Math.floor(Math.random() * 5) + 1; // Random priority between 1 and 5
        row.insertCell(4).textContent = '0'; // Start time
        row.insertCell(5).textContent = '0'; // Wait time
        row.insertCell(6).textContent = Math.floor(Math.random() * 10) + 1; // Remain time
        row.insertCell(7).textContent = '0'; // Finish time
        row.insertCell(8).textContent = '0'; // Turnaround time
        row.insertCell(9).textContent = '0'; // Percentage

        readyQueueList.innerHTML += `<li>${i + 1}</li>`; // Add to ready queue
    }
}