import React, { useState } from 'react';
import '../css/dropdown.css';
import 'font-awesome/css/font-awesome.min.css';

export default function DropDown() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('YOLO'); // Default to CNN
  const [isOpen, setIsOpen] = useState(false);

  const algorithms = ['YOLO', 'CNN', 'RNN', 'RCNN'];

  const handleSelection = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setIsOpen(false); // Close the dropdown
  };

  const toggleDropdown = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <legend>Dropdown</legend>
      <details open={isOpen}>
        <summary onClick={toggleDropdown}>
          Select your Machine Learning Algorithm: {selectedAlgorithm} 
          <i className="fa fa-caret-down" aria-hidden="true"></i>
        </summary>
        <div>
          {algorithms.map((algorithm) => (
            <label key={algorithm}>
              <input 
                type="radio" 
                name="radio" 
                checked={selectedAlgorithm === algorithm}
                onChange={() => handleSelection(algorithm)}
              />
              <span>{algorithm}</span>
            </label>
          ))}
          <div className="fade" />
        </div>
      </details>
    </div>
  );
}