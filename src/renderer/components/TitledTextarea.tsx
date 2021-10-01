
import React from "react";

export default function TitledTextarea(props: any) {
  
  const {
    value,
    title,
    readOnly,
    className,
    onChange,
  } = props;

  return (
    <div className={`titled-textarea ${className}`}>
      <span style={{fontSize: "16px"}}>{title}</span>
      <textarea
        value={value}
        onChange={ev => onChange(ev.target.value)}
        style={{width: "100%"}}
        readOnly={readOnly}
      ></textarea>
    </div>
  );
}
