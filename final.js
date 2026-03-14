// ============================================
// CUSTOMER DASHBOARD - JAVASCRIPT
// ============================================

// Current user
let currentUser = {
    name: 'Acme Corporation',
    email: 'customer@acme.com',
    role: 'customer'
};

// Chart instances
let charts = {};

// ============================================
// PAGE INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Customer Dashboard Loading...');
    
    setupUserProfile();
    setupNavigation();
    setupButtons();
    setupExecutiveButtons();
    initializeCharts();
    initializeAdditionalCharts();
    
    console.log('✅ Customer Dashboard Ready!');
});

// ============================================
// USER PROFILE SETUP
// ============================================

function setupUserProfile() {
    document.getElementById('userName').textContent = currentUser.name;
}

// ============================================
// NAVIGATION SETUP
// ============================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active from all
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            // Get section ID
            const sectionId = this.getAttribute('data-section');
            
            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Resize charts
            setTimeout(() => {
                Object.values(charts).forEach(chart => {
                    if (chart && chart.resize) {
                        chart.resize();
                    }
                });
            }, 100);
        });
    });
}

// ============================================
// BUTTON SETUP
// ============================================

function setupButtons() {
    const logoutBtn = document.getElementById('logoutBtn');
    const exportBtn = document.getElementById('exportBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', performLogout);
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportReport);
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshData);
    }
}

// ============================================
// CHART INITIALIZATION
// ============================================

function initializeCharts() {
    console.log('📊 Initializing charts...');

    // Cost Trend Chart
    const costCtx = document.getElementById('costTrendChart');
    if (costCtx) {
        charts.costTrend = new Chart(costCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Actual Spend',
                        data: [35000, 36500, 37200, 38100, 39000, 40200, 41000, 41500, 42000, 42300, 42800, 45200],
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3,
                    },
                    {
                        label: 'Budget',
                        data: [40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000],
                        borderColor: '#10b981',
                        borderDash: [5, 5],
                        fill: false,
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'K';
                            },
                        },
                    },
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
            },
        });
    }

    // Cost by Service Chart
    const serviceCtx = document.getElementById('costByServiceChart');
    if (serviceCtx) {
        charts.costByService = new Chart(serviceCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['EC2', 'RDS', 'S3', 'Lambda', 'Data Transfer', 'Other'],
                datasets: [
                    {
                        data: [40.9, 18.1, 14.4, 11.5, 9.5, 5.5],
                        backgroundColor: [
                            '#3b82f6',
                            '#8b5cf6',
                            '#ec4899',
                            '#f59e0b',
                            '#06b6d4',
                            '#10b981',
                        ],
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        });
    }

    // Cost by Region Chart
    const regionCtx = document.getElementById('costByRegionChart');
    if (regionCtx) {
        charts.costByRegion = new Chart(regionCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-south-1'],
                datasets: [
                    {
                        data: [45, 25, 20, 10],
                        backgroundColor: [
                            '#3b82f6',
                            '#8b5cf6',
                            '#ec4899',
                            '#f59e0b',
                        ],
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        });
    }

    // EC2 Utilization Chart
    const ec2Ctx = document.getElementById('ec2UtilizationChart');
    if (ec2Ctx) {
        charts.ec2Utilization = new Chart(ec2Ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Instance 1\n(m5.large)', 'Instance 2\n(c5.2xlarge)', 'Instance 3\n(r5.large)', 'Instance 4\n(t3.large)'],
                datasets: [
                    {
                        label: 'CPU Utilization %',
                        data: [12, 8, 18, 5],
                        backgroundColor: ['#ef4444', '#ef4444', '#f59e0b', '#ef4444'],
                        borderRadius: 8,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }

    // Issues Severity Chart
    const issuesCtx = document.getElementById('issuesSeverityChart');
    if (issuesCtx) {
        charts.issuesSeverity = new Chart(issuesCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['High Priority', 'Medium Priority', 'Low Priority'],
                datasets: [
                    {
                        label: 'Number of Issues',
                        data: [4, 5, 3],
                        backgroundColor: ['#ef4444', '#f59e0b', '#06b6d4'],
                                                borderRadius: 8,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }

    console.log('✅ Charts initialized');
}

// ============================================
// EXPORT FUNCTIONALITY
// ============================================

function exportReport() {
    const timestamp = new Date().toISOString().split('T')[0];
    const reportData = generateReportData();
    const csvContent = generateCSVContent(reportData);
    
    downloadCSV(csvContent, `AWS_Cost_Report_${timestamp}.csv`);
    showToast('✓ Report exported successfully!', 'success');
}

function generateReportData() {
    return {
        exportDate: new Date().toISOString().split('T')[0],
        company: currentUser.name,
        email: currentUser.email,
        currentMonthSpend: 45200,
        previousMonthSpend: 44300,
        optimizationPotential: 1450,
        annualSavings: 17400,
        ec2Cost: 18500,
        rdsDBCost: 8200,
        s3Cost: 6500,
        lambdaCost: 5200,
        dataTransferCost: 4300,
        otherCost: 2500,
        underutilizedInstances: 4,
        highPriorityIssues: 4,
        mediumPriorityIssues: 5,
        lowPriorityIssues: 3,
    };
}

function generateCSVContent(data) {
    let csv = 'AWS CLOUD COST ANALYSIS REPORT\n';
    csv += `Report Date,${data.exportDate}\n`;
    csv += `Customer,${data.company}\n`;
    csv += `Email,${data.email}\n\n`;
    
    csv += 'COST SUMMARY\n';
    csv += `Current Month Spend,$${data.currentMonthSpend.toLocaleString()}\n`;
    csv += `Previous Month Spend,$${data.previousMonthSpend.toLocaleString()}\n`;
    csv += `Month-over-Month Change,$${(data.currentMonthSpend - data.previousMonthSpend).toLocaleString()}\n`;
    csv += `Optimization Potential,$${data.optimizationPotential.toLocaleString()}/month\n`;
    csv += `Annual Savings Potential,$${data.annualSavings.toLocaleString()}\n\n`;
    
    csv += 'COST BREAKDOWN BY SERVICE\n';
    csv += `EC2 Instances,$${data.ec2Cost.toLocaleString()}\n`;
    csv += `RDS Database,$${data.rdsDBCost.toLocaleString()}\n`;
    csv += `S3 Storage,$${data.s3Cost.toLocaleString()}\n`;
    csv += `Lambda Functions,$${data.lambdaCost.toLocaleString()}\n`;
    csv += `Data Transfer,$${data.dataTransferCost.toLocaleString()}\n`;
    csv += `Other Services,$${data.otherCost.toLocaleString()}\n\n`;
    
    csv += 'ISSUES SUMMARY\n';
    csv += `High Priority Issues,${data.highPriorityIssues}\n`;
    csv += `Medium Priority Issues,${data.mediumPriorityIssues}\n`;
    csv += `Low Priority Issues,${data.lowPriorityIssues}\n`;
    csv += `Underutilized EC2 Instances,${data.underutilizedInstances}\n`;
    
    return csv;
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ============================================
// REFRESH FUNCTIONALITY
// ============================================

function refreshData() {
    showToast('🔄 Refreshing AWS data...', 'info');
    
    // Simulate data refresh
    setTimeout(() => {
        // Reinitialize charts with fresh data
        Object.values(charts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        
        charts = {};
        initializeCharts();
        
        showToast('✓ Data refreshed successfully!', 'success');
    }, 1500);
}

// ============================================
// LOGOUT FUNCTIONALITY
// ============================================

function performLogout() {
    showToast('Logging out...', 'info');
    
    setTimeout(() => {
        // Redirect to login page
        window.location.href = 'login.html';
    }, 1000);
}

// ============================================
// EXECUTIVE SUMMARY SETUP
// ============================================

function setupExecutiveButtons() {
    const modifyInputsBtn = document.getElementById('modifyInputsBtn');
    const exportFullReportBtn = document.getElementById('exportFullReportBtn');
    const startNewAnalysisBtn = document.getElementById('startNewAnalysisBtn');
    
    if (modifyInputsBtn) {
        modifyInputsBtn.addEventListener('click', function() {
            showToast('📝 Opening project inputs editor...', 'info');
            console.log('Modify inputs clicked');
        });
    }
    
    if (exportFullReportBtn) {
        exportFullReportBtn.addEventListener('click', function() {
            showToast('📄 Generating comprehensive PDF report...', 'info');
            setTimeout(() => {
                const timestamp = new Date().toISOString().split('T')[0];
                const csvContent = generateExecutiveSummaryCSV();
                downloadCSV(csvContent, `Executive_Summary_${timestamp}.csv`);
                showToast('✓ Report exported successfully!', 'success');
            }, 1500);
        });
    }
    
    if (startNewAnalysisBtn) {
        startNewAnalysisBtn.addEventListener('click', function() {
            showToast('🔄 Starting new analysis...', 'info');
            setTimeout(() => {
                Object.values(charts).forEach(chart => {
                    if (chart) {
                        chart.destroy();
                    }
                });
                charts = {};
                initializeCharts();
                initializeAdditionalCharts();
                showToast('✓ New analysis started!', 'success');
            }, 1500);
        });
    }
}

function generateExecutiveSummaryCSV() {
    const timestamp = new Date().toISOString().split('T')[0];
    let csv = 'EXECUTIVE DECISION SUMMARY REPORT\n';
    csv += `Generated: ${timestamp}\n`;
    csv += `Customer: ${currentUser.name}\n\n`;

    csv += 'KEY METRICS\n';
    csv += `Current Monthly Spend,$45200\n`;
    csv += `Optimization Potential,$1450\n`;
    csv += `Annual Savings,$17400\n`;
    csv += `ROI on Optimization,320%\n`;
    csv += `Instances Analyzed,156\n`;
    csv += `Issues Detected,12\n\n`;

    csv += 'RECOMMENDATIONS\n';
    csv += '1. Right-size EC2 instances and implement auto-scaling policies\n';
    csv += '2. Implement enhanced monitoring and milestone reviews\n';
    csv += '3. Address high-priority cloud optimizations within 30 days\n\n';

    csv += 'RISK ASSESSMENT\n';
    csv += 'Risk Level,Low\n';
    csv += 'Disruption Level,Minimal\n';
    csv += 'Implementation Timeline,30 days\n';

    return csv;
}

function initializeAdditionalCharts() {
    // Optimization Issues Chart
    const optimizationCtx = document.getElementById('optimizationIssuesChart');
    if (optimizationCtx) {
        charts.optimizationIssues = new Chart(optimizationCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['High Priority', 'Medium Priority', 'Low Priority'],
                datasets: [
                    {
                        label: 'Number of Issues',
                        data: [4, 5, 3],
                        backgroundColor: ['#ef4444', '#f59e0b', '#06b6d4'],
                        borderRadius: 8,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }

    // Savings Projection Chart
    const savingsCtx = document.getElementById('savingsProjectionChart');
    if (savingsCtx) {
        charts.savingsProjection = new Chart(savingsCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'],
                datasets: [
                    {
                        label: 'Cumulative Savings',
                        data: [96, 288, 576, 1356, 1800],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3,
                        pointBackgroundColor: '#10b981',
                    },
                    {
                        label: 'Projected Savings',
                        data: [96, 350, 1050, 1890, 2450],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3,
                        pointBackgroundColor: '#3b82f6',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            },
                        },
                    },
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
            },
        });
    }

    console.log('✅ Additional charts initialized');
}


// ============================================
// REPORT GENERATION FUNCTIONS
// ============================================

function generateReport(type) {
    showToast('📄 Generating ' + type.toUpperCase() + ' report...', 'info');
    
    setTimeout(() => {
        if (type === 'csv') {
            exportReport();
        } else if (type === 'cost') {
            generateCostAnalysisReport();
        } else if (type === 'ec2') {
            generateEC2Report();
        } else if (type === 'savings') {
            generateSavingsReport();
        }
    }, 1000);
}

function generateCostAnalysisReport() {
    const timestamp = new Date().toISOString().split('T')[0];
    const reportData = generateReportData();
    
    let reportContent = 'AWS COST ANALYSIS REPORT\n';
    reportContent += `Generated: ${timestamp}\n`;
    reportContent += `Customer: ${currentUser.name}\n\n`;
    
    reportContent += 'EXECUTIVE SUMMARY\n';
    reportContent += `Current Monthly Spend: $${reportData.currentMonthSpend.toLocaleString()}\n`;
    reportContent += `Optimization Potential: $${reportData.optimizationPotential.toLocaleString()}/month\n`;
    reportContent += `Annual Savings: $${reportData.annualSavings.toLocaleString()}\n\n`;
    
    reportContent += 'SERVICE BREAKDOWN\n';
    reportContent += `EC2 (40.9%): $${reportData.ec2Cost.toLocaleString()}\n`;
    reportContent += `RDS (18.1%): $${reportData.rdsDBCost.toLocaleString()}\n`;
    reportContent += `S3 (14.4%): $${reportData.s3Cost.toLocaleString()}\n`;
    reportContent += `Lambda (11.5%): $${reportData.lambdaCost.toLocaleString()}\n`;
    reportContent += `Data Transfer (9.5%): $${reportData.dataTransferCost.toLocaleString()}\n`;
    reportContent += `Other (5.5%): $${reportData.otherCost.toLocaleString()}\n`;
    
    downloadReport(reportContent, `Cost_Analysis_Report_${timestamp}.txt`);
    showToast('✓ Cost Analysis Report generated!', 'success');
}

function generateEC2Report() {
    const timestamp = new Date().toISOString().split('T')[0];
    
    let reportContent = 'EC2 OPTIMIZATION REPORT\n';
    reportContent += `Generated: ${timestamp}\n`;
    reportContent += `Customer: ${currentUser.name}\n\n`;
    
    reportContent += 'EXECUTIVE SUMMARY\n';
    reportContent += 'Total EC2 Instances: 156\n';
    reportContent += 'Running Instances: 89\n';
    reportContent += 'Underutilized Instances: 4\n';
    reportContent += 'Monthly EC2 Cost: $18,500\n\n';
    
    reportContent += 'UNDERUTILIZED INSTANCES\n';
    reportContent += '1. Instance i-0a1b2c3d4e5f6\n';
    reportContent += '   Type: m5.large | Region: us-east-1\n';
    reportContent += '   CPU Usage: 12% | Cost: $152/month\n';
    reportContent += '   Recommendation: Downsize or schedule shutdown\n';
    reportContent += '   Potential Savings: $120/month\n\n';
    
    reportContent += '2. Instance i-9z8y7x6w5v4u3\n';
    reportContent += '   Type: c5.2xlarge | Region: us-west-2\n';
    reportContent += '   CPU Usage: 8% | Cost: $245/month\n';
    reportContent += '   Recommendation: Switch to t3.large\n';
    reportContent += '   Potential Savings: $210/month\n\n';
    
    reportContent += '3. Instance i-1q2w3e4r5t6y7\n';
    reportContent += '   Type: r5.large | Region: eu-west-1\n';
    reportContent += '   CPU Usage: 18% | Cost: $126/month\n';
    reportContent += '   Recommendation: Migrate to t3.medium\n';
    reportContent += '   Potential Savings: $85/month\n\n';
    
    reportContent += '4. Instance i-7u8i9o0p1a2s3\n';
    reportContent += '   Type: t3.large | Region: ap-southeast-1\n';
    reportContent += '   CPU Usage: 5% | Cost: $76/month\n';
    reportContent += '   Recommendation: Stop during non-business hours\n';
    reportContent += '   Potential Savings: $65/month\n\n';
    
    reportContent += 'TOTAL MONTHLY SAVINGS OPPORTUNITY: $480\n';
    reportContent += 'ANNUAL SAVINGS: $5,760\n';
    
    downloadReport(reportContent, `EC2_Optimization_Report_${timestamp}.txt`);
    showToast('✓ EC2 Optimization Report generated!', 'success');
}

function generateSavingsReport() {
    const timestamp = new Date().toISOString().split('T')[0];
    
    let reportContent = 'AWS SAVINGS ACTION PLAN\n';
    reportContent += `Generated: ${timestamp}\n`;
    reportContent += `Customer: ${currentUser.name}\n\n`;
    
    reportContent += 'OPTIMIZATION ROADMAP\n\n';
    
    reportContent += 'PHASE 1: IMMEDIATE ACTIONS (0-30 Days)\n';
    reportContent += 'Quick wins with minimal effort\n';
    reportContent += '- Remove unused Elastic IPs (3 addresses) - Save $36/month\n';
    reportContent += '- Delete unattached EBS volumes (5 volumes) - Save $65/month\n';
    reportContent += '- Implement automatic shutdown policies - Save $45/month\n';
    reportContent += 'Total Phase 1 Savings: $146/month\n\n';
    
    reportContent += 'PHASE 2: SHORT-TERM OPTIMIZATION (30-90 Days)\n';
    reportContent += 'Strategic optimizations requiring testing\n';
    reportContent += '- Transition S3 data to cheaper storage classes - Save $180/month\n';
    reportContent += '- Implement auto-scaling policies - Save $240/month\n';
    reportContent += '- Right-size EC2 instances - Save $300/month\n';
    reportContent += 'Total Phase 2 Savings: $720/month\n\n';
    
    reportContent += 'PHASE 3: LONG-TERM STRATEGY (90+ Days)\n';
    reportContent += 'Comprehensive optimization for maximum savings\n';
    reportContent += '- Purchase Reserved Instances - Save $400/month\n';
    reportContent += '- Implement Spot Instances - Save $350/month\n';
    reportContent += '- Archive unused data - Save $240/month\n';
    reportContent += 'Total Phase 3 Savings: $990/month\n\n';
    
    reportContent += 'CUMULATIVE SAVINGS\n';
    reportContent += 'Monthly Savings: $1,450\n';
    reportContent += 'Quarterly Savings: $4,350\n';
    reportContent += 'Annual Savings: $17,400\n\n';
    
    reportContent += 'PRIORITY ACTIONS\n';
    reportContent += '1. HIGH: Remove unused Elastic IPs (30 minutes)\n';
    reportContent += '2. HIGH: Delete unattached EBS volumes (1 hour)\n';
    reportContent += '3. MEDIUM: Right-size EC2 instances (8 hours)\n';
    reportContent += '4. MEDIUM: Implement auto-scaling (16 hours)\n';
    reportContent += '5. LOW: Purchase Reserved Instances (4 hours)\n';
    
    downloadReport(reportContent, `Savings_Action_Plan_${timestamp}.txt`);
    showToast('✓ Savings Action Plan generated!', 'success');
}

function downloadReport(content, filename) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add these functions to customer-dashboard-script.js

// ============================================
// AWS TOGGLE FUNCTIONALITY
// ============================================

function setupAWSTabs() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const toggleName = this.getAttribute('data-toggle');
            
            // Remove active class
            toggleBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.toggle-content').forEach(c => c.classList.remove('active'));
            
            // Add active class
            this.classList.add('active');
            const toggleContent = document.getElementById(toggleName);
            if (toggleContent) {
                toggleContent.classList.add('active');
            }
            
            // Resize charts
            setTimeout(() => {
                Object.values(charts).forEach(chart => {
                    if (chart && chart.resize) {
                        chart.resize();
                    }
                });
            }, 100);
        });
    });
}

// ============================================
// ADDITIONAL CHART INITIALIZATION
// ============================================

function initializeAdditionalCharts() {
    // Optimization Issues Chart
    const optimizationCtx = document.getElementById('optimizationIssuesChart');
    if (optimizationCtx) {
        charts.optimizationIssues = new Chart(optimizationCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['High Priority', 'Medium Priority', 'Low Priority'],
                datasets: [
                    {
                        label: 'Number of Issues',
                        data: [4, 5, 3],
                        backgroundColor: ['#ef4444', '#f59e0b', '#06b6d4'],
                        borderRadius: 8,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }

    // Savings Projection Chart
    const savingsCtx = document.getElementById('savingsProjectionChart');
    if (savingsCtx) {
        charts.savingsProjection = new Chart(savingsCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'],
                datasets: [
                    {
                        label: 'Cumulative Savings',
                        data: [96, 288, 576, 1356, 1800],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3,
                        pointBackgroundColor: '#10b981',
                    },
                    {
                        label: 'Projected Savings',
                        data: [96, 350, 1050, 1890, 2450],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3,
                        pointBackgroundColor: '#3b82f6',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            },
                        },
                    },
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
            },
        });
    }

    console.log('✅ Additional charts initialized');
}

// ============================================
// UPDATE NAVIGATION WITH NEW SECTIONS
// ============================================

// Update the setupNavigation function to include new sections
function updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active from all
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            // Get section ID
            const sectionId = this.getAttribute('data-section');
            
            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
            }
            
            // Resize charts
            setTimeout(() => {
                Object.values(charts).forEach(chart => {
                    if (chart && chart.resize) {
                        chart.resize();
                    }
                });
            }, 100);
        });
    });
}

// ============================================
// EXECUTIVE SUMMARY BUTTONS
// ============================================

function setupExecutiveButtons() {
    const modifyInputsBtn = document.getElementById('modifyInputsBtn');
    const exportFullReportBtn = document.getElementById('exportFullReportBtn');
    const startNewAnalysisBtn = document.getElementById('startNewAnalysisBtn');
    
    if (modifyInputsBtn) {
        modifyInputsBtn.addEventListener('click', () => {
            showToast('📝 Opening project inputs editor...', 'info');
        });
    }
    
    if (exportFullReportBtn) {
        exportFullReportBtn.addEventListener('click', () => {
            showToast('📄 Generating comprehensive PDF report...', 'info');
            setTimeout(() => {
                exportFullPDFReport();
            }, 1000);
        });
    }
    
    if (startNewAnalysisBtn) {
        startNewAnalysisBtn.addEventListener('click', () => {
            showToast('🔄 Starting new analysis...', 'info');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        });
    }
}

// ============================================
// EXPORT FULL PDF REPORT
// ============================================

function exportFullPDFReport() {
    const timestamp = new Date().toISOString().split('T')[0];
    const reportData = generateComprehensiveReport();
    
    let reportContent = 'AWS CLOUD OPTIMIZATION - COMPREHENSIVE REPORT\n';
    reportContent += '='.repeat(60) + '\n\n';
    reportContent += `Report Date: ${timestamp}\n`;
    reportContent += `Customer: ${currentUser.name}\n`;
    reportContent += `Email: ${currentUser.email}\n\n`;
    
    reportContent += 'EXECUTIVE SUMMARY\n';
    reportContent += '-'.repeat(60) + '\n';
    reportContent += reportData.summary + '\n\n';
    
    reportContent += 'FINANCIAL IMPACT\n';
    reportContent += '-'.repeat(60) + '\n';
    reportContent += reportData.financialImpact + '\n\n';
    
    reportContent += 'OPTIMIZATION OPPORTUNITIES\n';
    reportContent += '-'.repeat(60) + '\n';
    reportContent += reportData.opportunities + '\n\n';
    
    reportContent += 'IMPLEMENTATION ROADMAP\n';
    reportContent += '-'.repeat(60) + '\n';
    reportContent += reportData.roadmap + '\n\n';
    
    reportContent += 'CURRENT VS OPTIMIZED COMPARISON\n';
    reportContent += '-'.repeat(60) + '\n';
    reportContent += reportData.comparison + '\n\n';
    
    reportContent += 'AI RECOMMENDATIONS\n';
    reportContent += '-'.repeat(60) + '\n';
    reportContent += reportData.recommendations + '\n';
    
    downloadReport(reportContent, `AWS_Optimization_Report_${timestamp}.pdf`);
    showToast('✓ PDF report exported successfully!', 'success');
}

function generateComprehensiveReport() {
    return {
        summary: `Based on comprehensive analysis of your AWS infrastructure, we recommend implementing 
a phased optimization approach. Our analysis identifies $1,450/month in optimization opportunities.
Current Monthly Spend: $45,200
Optimization Potential: $1,450/month
Annual Savings: $17,400
ROI on Optimization: 320%`,
        
        financialImpact: `Current State:
- Total Monthly AWS Spend: $45,200
- EC2 Instances: $18,500 (40.9%)
- Storage Services: $6,500 (14.4%)
- Database Services: $8,200 (18.1%)
- Lambda Functions: $5,200 (11.5%)
- Network & Data Transfer: $4,300 (9.5%)
- Other Services: $2,500 (5.5%)

Optimized State (Monthly):
- Total Monthly AWS Spend: $43,750
- Monthly Savings: $1,450
- Annual Savings: $17,400
- Savings Percentage: 3.2%`,
        
        opportunities: `1. EC2 Instance Optimization
   - Underutilized Instances: 4 found
   - Potential Savings: $480/month
   - Actions: Right-sizing, auto-scaling implementation

2. Storage Optimization
   - Non-optimized S3 Classes: 2TB
   - Unattached EBS Volumes: 5
   - Potential Savings: $245/month
   - Actions: Storage class transitions, volume cleanup

3. Reserved Instance Optimization
   - Underutilized Reserved Instances: 4
   - Potential Savings: $240/month
   - Actions: Conversion to flexible RI, utilization improvement

4. Network Cost Optimization
   - Unused Elastic IPs: 3
   - Optimization Potential: $445/month
   - Actions: IP removal, data transfer optimization`,
        
        roadmap: `Phase 1: Immediate Actions (0-30 Days)
- Identify and remove unused Elastic IPs: $36/month savings
- Delete unattached EBS volumes: $65/month savings
- Implement automatic shutdown policies: $45/month savings
- Total Phase 1 Savings: $146/month

Phase 2: Short-term Optimization (30-90 Days)
- Transition S3 data to cheaper storage classes: $180/month savings
- Implement auto-scaling policies: $240/month savings
- Right-size EC2 instances: $300/month savings
- Total Phase 2 Savings: $720/month

Phase 3: Long-term Strategy (90+ Days)
- Purchase Reserved Instances: $400/month savings
- Implement Spot Instances: $350/month savings
- Archive unused data: $240/month savings
- Total Phase 3 Savings: $990/month

Cumulative Monthly Savings: $1,450
Annual Savings Projection: $17,400`,
        
        comparison: `Service                    Current    Optimized   Monthly Savings   Annual Savings
EC2 Instances              $18,500    $16,800     $1,700              $20,400
RDS Database               $8,200     $7,950      $250                $3,000
S3 Storage                 $6,500     $6,100      $400                $4,800
Lambda Functions           $5,200     $5,050      $150                $1,800
Data Transfer              $4,300     $3,900      $400                $4,800
Other Services             $2,500     $2,950      ($450)              ($5,400)
_______________________________________________________________________________
TOTAL AWS SPEND            $45,200    $43,750     $1,450              $17,400`,
        
        recommendations: `1. Right-Size EC2 Instances
   Priority: High | Effort: Medium | Savings: $480/month
   Action: Review and downsize underutilized instances identified in the analysis.
   
2. Implement Auto-Scaling
   Priority: High | Effort: High | Savings: $240/month
   Action: Configure auto-scaling policies for dynamic workloads.
   
3. Optimize Storage Classes
   Priority: Medium | Effort: Low | Savings: $180/month
   Action: Transition infrequently accessed data to cheaper storage tiers.
   
4. Remove Unused Resources
   Priority: High | Effort: Low | Savings: $101/month
   Action: Delete unused Elastic IPs and unattached volumes immediately.
   
5. Purchase Reserved Instances
   Priority: Medium | Effort: Medium | Savings: $400/month
   Action: Purchase 1-year RIs for predictable workloads.

Recommendation Timeline:
- Weeks 1-2: Execute Phase 1 (Quick wins)
- Weeks 3-12: Execute Phase 2 (Strategic improvements)
- Months 4-12: Execute Phase 3 (Long-term optimizations)

Expected Outcome:
With full implementation, you can achieve annual savings of $17,400 with minimal
risk to your operations. The phased approach ensures stability and allows for
testing and validation of each optimization.`
    };
}

// ============================================
// INITIALIZATION UPDATE
// ============================================

// Update the main DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Customer Dashboard Loading with AWS Optimization...');
    
    setupUserProfile();
    setupNavigation();
    updateNavigation(); // Add this line
    setupButtons();
    setupAWSTabs(); // Add this line
    setupExecutiveButtons(); // Add this line
    initializeCharts();
    initializeAdditionalCharts(); // Add this line
    
    console.log('✅ Customer Dashboard Ready with Full Features!');
});

// ============================================
// TOAST NOTIFICATION
// ============================================

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
}

function formatPercentage(value) {
    return (value * 100).toFixed(2) + '%';
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================

window.addEventListener('resize', () => {
    Object.values(charts).forEach(chart => {
        if (chart && chart.resize) {
            chart.resize();
        }
    });
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + E for Export
    if ((event.ctrlKey || event.metaKey) && event.key === 'e') {
        event.preventDefault();
        exportReport();
    }
    
    // Ctrl/Cmd + R for Refresh
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        refreshData();
    }
});

// ============================================
// INTERACTIVE FEATURES
// ============================================

// Fix button functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-fix')) {
        const issueTitle = e.target.closest('.issue-item').querySelector('h4').textContent;
        const savings = e.target.closest('.issue-item').querySelector('.savings').textContent;
        
        showToast(`✓ ${issueTitle} has been fixed! ${savings}`, 'success');
        
        // Animate button
        e.target.style.background = '#10b981';
        e.target.innerHTML = '<i class="fas fa-check"></i> Fixed!';
        e.target.disabled = true;
        
        setTimeout(() => {
            e.target.style.background = '';
            e.target.innerHTML = '<i class="fas fa-check"></i> Fix Now';
        }, 2000);
    }
});

// ============================================
// CONSOLE LOGGING
// ============================================

console.log('%c🎨 Customer Dashboard Loaded Successfully', 'font-size: 16px; color: #1e40af; font-weight: bold;');
console.log('%cAWS Cloud Cost Analytics Platform', 'font-size: 12px; color: #10b981;');
console.log('%cVersion: 1.0.0 | Customer Dashboard Only', 'font-size: 11px; color: #6b7280;');
console.log('%c💡 Keyboard Shortcuts:', 'font-weight: bold;');
console.log('%cCtrl/Cmd + E = Export Report', 'font-size: 11px;');
console.log('%cCtrl/Cmd + R = Refresh Data', 'font-size: 11px;');

// ============================================
// PERFORMANCE MONITORING
// ============================================

const performanceMetrics = {
    dashboardLoadTime: performance.now(),
    chartsInitializedTime: null,
    totalLoadTime: null
};

window.addEventListener('load', function() {
    performanceMetrics.chartsInitializedTime = performance.now();
    performanceMetrics.totalLoadTime = performanceMetrics.chartsInitializedTime - performanceMetrics.dashboardLoadTime;
    console.log(`📊 Dashboard load time: ${performanceMetrics.totalLoadTime.toFixed(2)}ms`);
});

// ============================================
// DATA AUTO-REFRESH (Optional)
// ============================================

// Uncomment to enable auto-refresh every 30 minutes
// setInterval(() => {
//     console.log('🔄 Auto-refreshing data...');
//     refreshData();
// }, 30 * 60 * 1000);

// ============================================
// SESSION MANAGEMENT
// ============================================

let sessionTimeout = 30 * 60 * 1000; // 30 minutes
let sessionTimer = null;

function resetSessionTimer() {
    clearTimeout(sessionTimer);
    sessionTimer = setTimeout(() => {
        showToast('Session expired. Please login again.', 'warning');
        performLogout();
    }, sessionTimeout);
}

// Reset timer on user activity
document.addEventListener('click', resetSessionTimer);
document.addEventListener('keypress', resetSessionTimer);

// Initialize session timer
resetSessionTimer();

console.log('✅ All dashboard features loaded and ready!');

