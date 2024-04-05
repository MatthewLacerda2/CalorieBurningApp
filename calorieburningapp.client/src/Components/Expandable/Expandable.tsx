import React, { ReactNode, useState } from "react";
import "./Expandable.css";

interface ExpandableProps {
  headline: string;
  content: string[];
  children?: ReactNode[];
}

const Expandable: React.FC<ExpandableProps> = ({
  headline,
  content,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="expandable-container" style={{ textAlign: "left" }}>
      <div
        className="expandable-header"
        onClick={toggleExpanded}
        style={{ display: "flex" }}>
        <div className="arrow">{expanded ? "▼" : "▶"}</div>
        <h2>{headline.charAt(0).toUpperCase() + headline.slice(1)}</h2>
      </div>
      {expanded && (
        <div className="expandable-content" style={{ marginLeft: "10px" }}>
          {content.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      )}
      {expanded && children}
    </div>
  );
};

export default Expandable;
