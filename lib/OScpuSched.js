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
        this.speed = 500;
        this.timeQuantumUsed = 0; // Track quantum usage for RR
    }

    initialize(processes, algorithm, quantum) {
        // Deep copy processes to avoid reference issues
        this.processes = processes.map(p => ({
            id: p.id,
            arrivalTime: parseInt(p.arrivalTime),
            burstTime: parseInt(p.burstTime),
            priority: parseInt(p.priority),
            remainTime: parseInt(p.burstTime),
            startTime: -1,
            waitTime: 0,
            finishTime: -1,
            turnaroundTime: 0,
            percentage: 0
        }));
        
        this.algorithm = algorithm;
        this.quantum = parseInt(quantum);
        this.currentTime = 0;
        this.currentProcess = null;
        this.readyQueue = [];
        this.completedProcesses = [];
        this.ganttChart = [];
        this.isRunning = false;
        this.timeQuantumUsed = 0;
        
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

        // Get process with shortest remaining time
        const available = this.processes.filter(p => 
            p.arrivalTime <= this.currentTime && 
            p.remainTime > 0 &&
            !this.completedProcesses.includes(p)
        );
        
        if (available.length > 0) {
            available.sort((a, b) => a.remainTime - b.remainTime);
            this.assignProcess(available[0]);
        } else {
            this.currentProcess = null;
        }
    }

    roundRobin() {
        if (this.currentProcess) {
            this.currentProcess.remainTime--;
            this.timeQuantumUsed++;
            
            if (this.currentProcess.remainTime === 0) {
                this.completeCurrentProcess();
                this.timeQuantumUsed = 0;
            } else if (this.timeQuantumUsed >= this.quantum) {
                // Time quantum expired, move to ready queue
                this.readyQueue.push(this.currentProcess);
                this.currentProcess = null;
                this.timeQuantumUsed = 0;
            }
        }

        if (!this.currentProcess) {
            this.getNextProcess();
        }
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
            p.remainTime > 0 &&
            !this.completedProcesses.includes(p)
        );
        
        if (available.length > 0) {
            available.sort((a, b) => a.priority - b.priority);
            this.assignProcess(available[0]);
        } else {
            this.currentProcess = null;
        }
    }

    getNextProcess() {
        // Add arriving processes to ready queue
        this.processes.forEach(p => {
            if (p.arrivalTime === this.currentTime && 
                p.remainTime > 0 && 
                !this.readyQueue.includes(p) && 
                p !== this.currentProcess &&
                !this.completedProcesses.includes(p)) {
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
                    this.readyQueue.sort((a, b) => a.remainTime - b.remainTime);
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
        } else {
            this.currentProcess = null;
        }
    }

    assignProcess(process) {
        this.currentProcess = process;
        if (process.startTime === -1) {
            process.startTime = this.currentTime;
        }

        // Add to Gantt chart
        const lastSegment = this.ganttChart[this.ganttChart.length - 1];
        if (lastSegment && lastSegment.process === process.id && lastSegment.end === this.currentTime) {
            // Continue existing segment
            lastSegment.end = this.currentTime + 1;
        } else {
            // New segment
            this.ganttChart.push({
                process: process.id,
                start: this.currentTime,
                end: this.currentTime + 1
            });
        }
    }

    completeCurrentProcess() {
        if (!this.currentProcess) return;
        
        this.currentProcess.finishTime = this.currentTime + 1;
        this.currentProcess.turnaroundTime = this.currentProcess.finishTime - this.currentProcess.arrivalTime;
        this.currentProcess.waitTime = this.currentProcess.turnaroundTime - this.currentProcess.burstTime;
        this.currentProcess.percentage = this.currentProcess.turnaroundTime > 0 ? 
            (this.currentProcess.waitTime / this.currentProcess.turnaroundTime) * 100 : 0;
        
        this.completedProcesses.push(this.currentProcess);
        this.currentProcess = null;
        this.timeQuantumUsed = 0;
    }

    step() {
        if (this.isSimulationComplete()) return false;

        this.currentTime++;
        
        // Update wait times for processes in ready queue (not being executed)
        this.readyQueue.forEach(p => {
            if (p !== this.currentProcess) {
                p.waitTime++;
            }
        });

        // Add arriving processes
        this.processes.forEach(p => {
            if (p.arrivalTime === this.currentTime && 
                p.remainTime > 0 && 
                !this.readyQueue.includes(p) && 
                p !== this.currentProcess &&
                !this.completedProcesses.includes(p)) {
                this.readyQueue.push(p);
            }
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

        return { avgWait: avgWait.toFixed(3), avgTurnaround: avgTurnaround.toFixed(3) };
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
    
    // Initialize if not already done
    if (scheduler.processes.length === 0) {
        const processes = getProcessesFromTable();
        if (processes.length === 0) {
            alert("Please generate some processes first!");
            return;
        }
        const algorithm = document.getElementById('algorithm').value;
        const quantum = parseInt(document.getElementById('quantum').value);
        scheduler.initialize(processes, algorithm, quantum);
    }
    
    scheduler.isRunning = true;
    const speed = parseInt(document.getElementById('simSpeed').value);
    scheduler.speed = 600 - (speed * 50);
    
    scheduler.intervalId = setInterval(() => {
        if (!scheduler.step()) {
            stop();
            alert("Simulation completed!");
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
    if (scheduler.processes.length === 0) {
        const processes = getProcessesFromTable();
        if (processes.length === 0) {
            alert("Please generate some processes first!");
            return;
        }
        const algorithm = document.getElementById('algorithm').value;
        const quantum = parseInt(document.getElementById('quantum').value);
        scheduler.initialize(processes, algorithm, quantum);
    }
    
    if (scheduler.step()) {
        updateUI();
    } else {
        alert("Simulation completed!");
    }
}

function restart() {
    stop();
    const processes = getProcessesFromTable();
    if (processes.length === 0) {
        alert("Please generate some processes first!");
        return;
    }
    const algorithm = document.getElementById('algorithm').value;
    const quantum = parseInt(document.getElementById('quantum').value);
    
    scheduler.initialize(processes, algorithm, quantum);
    updateUI();
}

function startAnotherSimulation() {
    stop();
    scheduler.processes = [];
    scheduler.currentTime = 0;
    scheduler.currentProcess = null;
    scheduler.readyQueue = [];
    scheduler.completedProcesses = [];
    scheduler.ganttChart = [];
    
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
    if (scheduler.processes.length === 0) {
        const processes = getProcessesFromTable();
        if (processes.length === 0) {
            alert("Please generate some processes first!");
            return;
        }
        const algorithm = document.getElementById('algorithm').value;
        const quantum = parseInt(document.getElementById('quantum').value);
        scheduler.initialize(processes, algorithm, quantum);
    }
    
    let hasSteps = true;
    while (hasSteps) {
        hasSteps = scheduler.step();
    }
    updateUI();
    alert("Simulation completed!");
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
        row.insertCell(6).textContent = row.cells[2].textContent;
        row.insertCell(7).textContent = '0';
        row.insertCell(8).textContent = '0';
        row.insertCell(9).textContent = '0';
    }
    
    // Auto-initialize scheduler with new data
    const processes = getProcessesFromTable();
    const algorithm = document.getElementById('algorithm').value;
    const quantum = parseInt(document.getElementById('quantum').value);
    scheduler.initialize(processes, algorithm, quantum);
}

function getProcessesFromTable() {
    const processes = [];
    const rows = document.getElementById('jobPoolBody').rows;
    
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        processes.push({
            id: cells[0].textContent,
            arrivalTime: parseInt(cells[1].textContent) || 0,
            burstTime: parseInt(cells[2].textContent) || 1,
            priority: parseInt(cells[3].textContent) || 1,
            startTime: parseInt(cells[4].textContent) || 0,
            waitTime: parseInt(cells[5].textContent) || 0,
            remainTime: parseInt(cells[6].textContent) || parseInt(cells[2].textContent) || 1,
            finishTime: parseInt(cells[7].textContent) || 0,
            turnaroundTime: parseInt(cells[8].textContent) || 0,
            percentage: parseFloat(cells[9].textContent) || 0
        });
    }
    
    return processes;
}

function updateUI() {
    // Update job pool table
    const jobPoolBody = document.getElementById('jobPoolBody');
    const allProcesses = scheduler.processes;
    
    // Clear and rebuild table to ensure proper ordering
    jobPoolBody.innerHTML = '';
    
    allProcesses.forEach(process => {
        const row = jobPoolBody.insertRow();
        row.insertCell(0).textContent = process.id;
        row.insertCell(1).textContent = process.arrivalTime;
        row.insertCell(2).textContent = process.burstTime;
        row.insertCell(3).textContent = process.priority;
        row.insertCell(4).textContent = process.startTime !== -1 ? process.startTime : '0';
        row.insertCell(5).textContent = process.waitTime;
        row.insertCell(6).textContent = process.remainTime;
        row.insertCell(7).textContent = process.finishTime !== -1 ? process.finishTime : '0';
        row.insertCell(8).textContent = process.turnaroundTime;
        row.insertCell(9).textContent = process.percentage.toFixed(2);
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
    document.getElementById('avgWaiting').textContent = averages.avgWait;
    document.getElementById('avgTurnaround').textContent = averages.avgTurnaround;

    // Update Gantt chart
    updateGanttChart();
}

function updateGanttChart() {
    const ganttChart = document.querySelector('.gantt-chart');
    ganttChart.innerHTML = '';
    
    if (scheduler.ganttChart.length === 0) return;
    
    const colors = ['red', 'yellow', 'orange', 'purple', 'blue', 'green', 'cyan', 'magenta'];
    let colorIndex = 0;
    const colorMap = {};
    
    // Calculate total simulation time for scaling
    const totalTime = Math.max(scheduler.currentTime, 1);
    
    scheduler.ganttChart.forEach(segment => {
        if (!colorMap[segment.process]) {
            colorMap[segment.process] = colors[colorIndex % colors.length];
            colorIndex++;
        }
        
        const bar = document.createElement('div');
        bar.className = `bar ${colorMap[segment.process]}`;
        const duration = segment.end - segment.start;
        const widthPercent = (duration / totalTime) * 100;
        bar.style.width = `${widthPercent}%`;
        bar.textContent = `${segment.process}`;
        bar.title = `${segment.process} (${segment.start}-${segment.end})`;
        ganttChart.appendChild(bar);
    });
}

// Initialize event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generateRandomData').addEventListener('click', function() {
        generateRandomData();
    });

    // Add change listener for algorithm to show/hide quantum
    document.getElementById('algorithm').addEventListener('change', function() {
        const quantumLabel = document.querySelector('label[for="quantum"]');
        const quantumInput = document.getElementById('quantum');
        if (this.value === 'rr') {
            quantumLabel.style.display = 'inline';
            quantumInput.style.display = 'inline';
        } else {
            quantumLabel.style.display = 'none';
            quantumInput.style.display = 'none';
        }
    });

    // Initialize quantum visibility
    document.getElementById('algorithm').dispatchEvent(new Event('change'));
});