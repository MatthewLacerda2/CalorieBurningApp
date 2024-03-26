import React, { ReactNode, useState } from 'react';
import './Expandable.css';

interface ExpandableProps {
  headline: string;
  content: string[];
  children?: ReactNode[];
}

const Expandable: React.FC<ExpandableProps> = ({ headline, content, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="expandable-container">
      <div className="expandable-header" onClick={toggleExpanded}>
        <div className="arrow">{expanded ? '▼' : '▶'}</div>
        <h2>{headline}</h2>
      </div>
      {expanded && (
        <div className="expandable-content">
          {content.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      )}
      {children}
    </div>
  );
};

export default Expandable;
