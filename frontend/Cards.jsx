import React from 'react';

function Cards() {
  const cards = [
    {
      title: 'Project Risk Level',
      description:
        'The current project risk level is classified as medium. This indicates that some operational or resource related challenges may arise during execution. Proper monitoring and proactive planning can help reduce the impact of these risks.',
      icon: '⚠️',
      color: '#4A90E2'
    },
    {
      title: 'Delay Probability',
      description:
        'The probability of project delay is estimated at around 40 percent. This could occur due to resource constraints, technical challenges, or coordination issues between teams. Early risk mitigation and improved planning can help keep the project on schedule.',
      icon: '⏱️',
      color: '#50C878'
    },
    {
      title: 'Profit Forecast',
      description:
        'The projected profit for the project is estimated at approximately 18 percent. This indicates a positive return if the project is completed within planned cost and time constraints. Efficient resource management can further improve profitability.',
      icon: '💰',
      color: '#FF6B6B'
    },
    {
      title: 'Cloud Resource Waste',
      description:
        'Some cloud resources appear to be underutilized, including idle instances and unused storage capacity. These inefficiencies may increase operational costs unnecessarily. Monitoring usage patterns and optimizing resource allocation can reduce cloud waste.',
      icon: '☁️',
      color: '#9B59B6'
    },
    {
      title: 'Executive Summary',
      description:
        'Overall, the project shows moderate risk but maintains a healthy profit potential. Some delay risks and cloud inefficiencies are present but can be managed with better planning and monitoring. With proper resource optimization, the project can achieve its expected outcomes successfully.',
      icon: '📋',
      color: '#F39C12'
    }
  ];

  return (
    <div className="cards-grid">
      {cards.map((card, index) => (
        <div key={index} className="metric-card">
          <div className="card-header">
            <div className="card-icon" style={{ backgroundColor: card.color }}>
              {card.icon}
            </div>
            <div className="card-title">{card.title}</div>
          </div>
          <div className="card-description">{card.description}</div>
        </div>
      ))}
    </div>
  );
}

export default Cards;