class CPUScheduler {
    constructor() {
        this.processes = [];
        this.currentTime = 0;
        this.currentProcess = null;
        this.readyQueue = [];
        this.completedProcesses = [];
        this.ganttChart = [];
        this.isRunning = false;
        this.intervalId = null;
        this.algorithm = 'fcfs';
        this.quantum = 4;
        this.speed = 500; // ms per time unit
    }

    initialize(processes, algorithm, quantum) {
        this.processes = processes.map(p => ({
            ...p,
            remainTime: p.burstTime,
            startTime: -1,
            waitTime: 0,
            finishTime: -1,
            turnaroundTime: 0,
            percentage: 0
        }));
        
        this.algorithm = algorithm;
        this.quantum = quantum;
        this.currentTime = 0;
        this.currentProcess = null;
        this.readyQueue = [];
        this.completedProcesses = [];
        this.ganttChart = [];
        this.isRunning = false;
        
        // Sort by arrival time initially
        this.processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    }

    // Algorithm implementations
    fcfs() {
        if (this.currentProcess && this.currentProcess.remainTime > 0) {
            this.currentProcess.remainTime--;
            if (this.currentProcess.remainTime === 0) {
                this.completeCurrentProcess();
            }
            return;
        }

        this.getNextProcess();
    }

    sjf() {
        if (this.currentProcess && this.currentProcess.remainTime > 0) {
            this.currentProcess.remainTime--;
            if (this.currentProcess.remainTime === 0) {
                this.completeCurrentProcess();
            }
            return;
        }

        // Get process with shortest burst time
        const available = this.processes.filter(p => 
            p.arrivalTime <= this.currentTime && 
            p.remainTime > 0
        );
        
        if (available.length > 0) {
            available.sort((a, b) => a.burstTime - b.burstTime);
            this.assignProcess(available[0]);
        }
    }

    roundRobin() {
        if (this.currentProcess) {
            this.currentProcess.remainTime--;
            
            // Check if time quantum expired or process finished
            const currentGantt = this.ganttChart[this.ganttChart.length - 1];
            const timeInCPU = this.currentTime - currentGantt.start + 1;
            
            if (this.currentProcess.remainTime === 0) {
                this.completeCurrentProcess();
            } else if (timeInCPU >= this.quantum) {
                this.readyQueue.push(this.currentProcess);
                this.currentProcess = null;
            }
        }

        this.getNextProcess();
    }

    priority() {
        if (this.currentProcess && this.currentProcess.remainTime > 0) {
            this.currentProcess.remainTime--;
            if (this.currentProcess.remainTime === 0) {
                this.completeCurrentProcess();
            }
            return;
        }

        // Get process with highest priority (lowest number)
        const available = this.processes.filter(p => 
            p.arrivalTime <= this.currentTime && 
            p.remainTime > 0
        );
        
        if (available.length > 0) {
            available.sort((a, b) => a.priority - b.priority);
            this.assignProcess(available[0]);
        }
    }

    getNextProcess() {
        // Add arriving processes to ready queue
        this.processes.forEach(p => {
            if (p.arrivalTime === this.currentTime && p.remainTime > 0) {
                this.readyQueue.push(p);
            }
        });

        if (this.readyQueue.length > 0) {
            let nextProcess;
            
            switch(this.algorithm) {
                case 'fcfs':
                    nextProcess = this.readyQueue.shift();
                    break;
                case 'sjf':
                    this.readyQueue.sort((a, b) => a.burstTime - b.burstTime);
                    nextProcess = this.readyQueue.shift();
                    break;
                case 'priority':
                    this.readyQueue.sort((a, b) => a.priority - b.priority);
                    nextProcess = this.readyQueue.shift();
                    break;
                case 'rr':
                    nextProcess = this.readyQueue.shift();
                    break;
                default:
                    nextProcess = this.readyQueue.shift();
            }
            
            this.assignProcess(nextProcess);
        }
    }

    assignProcess(process) {
        this.currentProcess = process;
        if (process.startTime === -1) {
            process.startTime = this.currentTime;
        }

        // Add to Gantt chart
        this.ganttChart.push({
            process: process.id,
            start: this.currentTime,
            end: this.currentTime + 1
        });
    }

    completeCurrentProcess() {
        this.currentProcess.finishTime = this.currentTime + 1;
        this.currentProcess.turnaroundTime = this.currentProcess.finishTime - this.currentProcess.arrivalTime;
        this.currentProcess.waitTime = this.currentProcess.turnaroundTime - this.currentProcess.burstTime;
        this.currentProcess.percentage = (this.currentProcess.waitTime / this.currentProcess.turnaroundTime) * 100;
        
        this.completedProcesses.push(this.currentProcess);
        this.currentProcess = null;
    }

    step() {
        if (this.isSimulationComplete()) return false;

        this.currentTime++;
        
        // Update wait times for processes in ready queue
        this.readyQueue.forEach(p => {
            p.waitTime++;
        });

        // Execute current algorithm
        switch(this.algorithm) {
            case 'fcfs': this.fcfs(); break;
            case 'sjf': this.sjf(); break;
            case 'rr': this.roundRobin(); break;
            case 'priority': this.priority(); break;
            default: this.fcfs();
        }

        return true;
    }

    isSimulationComplete() {
        return this.processes.every(p => p.remainTime === 0);
    }

    calculateAverages() {
        const completed = this.completedProcesses;
        if (completed.length === 0) return { avgWait: 0, avgTurnaround: 0 };

        const avgWait = completed.reduce((sum, p) => sum + p.waitTime, 0) / completed.length;
        const avgTurnaround = completed.reduce((sum, p) => sum + p.turnaroundTime, 0) / completed.length;

        return { avgWait, avgTurnaround };
    }

    getUtilization() {
        if (this.currentTime === 0) return 0;
        const busyTime = this.ganttChart.reduce((sum, segment) => sum + (segment.end - segment.start), 0);
        return (busyTime / this.currentTime) * 100;
    }
}

// Global scheduler instance
const scheduler = new CPUScheduler();

function simulate() {
    if (scheduler.isRunning) return;
    
    scheduler.isRunning = true;
    const speed = document.getElementById('simSpeed').value;
    scheduler.speed = 600 - (speed * 50); // Convert to ms (5 = 350ms, 1 = 550ms, 10 = 100ms)
    
    scheduler.intervalId = setInterval(() => {
        if (!scheduler.step()) {
            stop();
        }
        updateUI();
    }, scheduler.speed);
}

function stop() {
    scheduler.isRunning = false;
    if (scheduler.intervalId) {
        clearInterval(scheduler.intervalId);
        scheduler.intervalId = null;
    }
}

function nextStep() {
    stop();
    if (scheduler.step()) {
        updateUI();
    }
}

function restart() {
    stop();
    const processes = getProcessesFromTable();
    const algorithm = document.getElementById('algorithm').value;
    const quantum = parseInt(document.getElementById('quantum').value);
    
    scheduler.initialize(processes, algorithm, quantum);
    updateUI();
}

function startAnotherSimulation() {
    stop();
    document.getElementById('jobPoolBody').innerHTML = '';
    document.getElementById('readyQueueList').innerHTML = '';
    document.getElementById('currentJob').textContent = 'None';
    document.getElementById('currentTime').textContent = '0';
    document.getElementById('utilization').textContent = '0%';
    document.getElementById('avgWaiting').textContent = '0';
    document.getElementById('avgTurnaround').textContent = '0';
    document.querySelector('.gantt-chart').innerHTML = '';
}

function finish() {
    stop();
    while (scheduler.step()) {
        // Run all steps
    }
    updateUI();
}

function generateRandomData() {
    const numJobs = parseInt(document.getElementById('numJobs').value, 10);
    const jobPoolBody = document.getElementById('jobPoolBody');
    jobPoolBody.innerHTML = '';

    for (let i = 0; i < numJobs; i++) {
        const row = jobPoolBody.insertRow();
        row.insertCell(0).textContent = `J${i + 1}`;
        row.insertCell(1).textContent = Math.floor(Math.random() * 10);
        row.insertCell(2).textContent = Math.floor(Math.random() * 10) + 1;
        row.insertCell(3).textContent = Math.floor(Math.random() * 5) + 1;
        row.insertCell(4).textContent = '0';
        row.insertCell(5).textContent = '0';
        row.insertCell(6).textContent = row.cells[2].textContent; // Remain = Burst
        row.insertCell(7).textContent = '0';
        row.insertCell(8).textContent = '0';
        row.insertCell(9).textContent = '0';
    }
}

function getProcessesFromTable() {
    const processes = [];
    const rows = document.getElementById('jobPoolBody').rows;
    
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        processes.push({
            id: cells[0].textContent,
            arrivalTime: parseInt(cells[1].textContent),
            burstTime: parseInt(cells[2].textContent),
            priority: parseInt(cells[3].textContent),
            startTime: parseInt(cells[4].textContent),
            waitTime: parseInt(cells[5].textContent),
            remainTime: parseInt(cells[6].textContent),
            finishTime: parseInt(cells[7].textContent),
            turnaroundTime: parseInt(cells[8].textContent),
            percentage: parseFloat(cells[9].textContent)
        });
    }
    
    return processes;
}

function updateUI() {
    // Update job pool table
    const jobPoolBody = document.getElementById('jobPoolBody');
    const allProcesses = [...scheduler.processes, ...scheduler.completedProcesses];
    
    allProcesses.forEach((process, index) => {
        if (index < jobPoolBody.rows.length) {
            const cells = jobPoolBody.rows[index].cells;
            cells[4].textContent = process.startTime !== -1 ? process.startTime : '0';
            cells[5].textContent = process.waitTime;
            cells[6].textContent = process.remainTime;
            cells[7].textContent = process.finishTime !== -1 ? process.finishTime : '0';
            cells[8].textContent = process.turnaroundTime;
            cells[9].textContent = process.percentage.toFixed(2);
        }
    });

    // Update CPU section
    document.getElementById('currentJob').textContent = 
        scheduler.currentProcess ? scheduler.currentProcess.id : 'None';
    document.getElementById('currentTime').textContent = scheduler.currentTime;
    document.getElementById('utilization').textContent = 
        scheduler.getUtilization().toFixed(1) + '%';

    // Update ready queue
    const readyQueueList = document.getElementById('readyQueueList');
    readyQueueList.innerHTML = scheduler.readyQueue
        .map(p => `<li>${p.id}</li>`)
        .join('');

    // Update averages
    const averages = scheduler.calculateAverages();
    document.getElementById('avgWaiting').textContent = averages.avgWait.toFixed(3);
    document.getElementById('avgTurnaround').textContent = averages.avgTurnaround.toFixed(3);

    // Update Gantt chart
    updateGanttChart();
}

function updateGanttChart() {
    const ganttChart = document.querySelector('.gantt-chart');
    ganttChart.innerHTML = '';
    
    const colors = ['red', 'yellow', 'orange', 'purple', 'blue', 'green', 'cyan', 'magenta'];
    let colorIndex = 0;
    const colorMap = {};
    
    scheduler.ganttChart.forEach(segment => {
        if (!colorMap[segment.process]) {
            colorMap[segment.process] = colors[colorIndex % colors.length];
            colorIndex++;
        }
        
        const bar = document.createElement('div');
        bar.className = `bar ${colorMap[segment.process]}`;
        bar.style.width = `${(segment.end - segment.start) * 5}%`;
        bar.title = `${segment.process} (${segment.start}-${segment.end})`;
        ganttChart.appendChild(bar);
    });
}

// Initialize event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generateRandomData').addEventListener('click', function() {
        generateRandomData();
        // Initialize scheduler with generated data
        const processes = getProcessesFromTable();
        const algorithm = document.getElementById('algorithm').value;
        const quantum = parseInt(document.getElementById('quantum').value);
        scheduler.initialize(processes, algorithm, quantum);
    });

    // Add algorithm options
    const algorithmSelect = document.getElementById('algorithm');
    algorithmSelect.innerHTML = `
        <option value="fcfs">FCFS (First-Come First-Serve)</option>
        <option value="sjf">SJF (Shortest Job First)</option>
        <option value="rr">Round Robin</option>
        <option value="priority">Priority Scheduling</option>
    `;
});