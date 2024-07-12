import PropTypes from 'prop-types';
import { useState } from 'react';

export default function DropZone({ onDrop }) {
    const [ isDragOver, setIsDragOver ] = useState(false);
    
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
      };
    
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        onDrop(droppedFile);
      };

    const handleDragLeave = () => {
        setIsDragOver(false);
    }

    const borderStyle = isDragOver ? 'border-blue-500 bg-blue-500' : 'border-solid border-gray-300';
    
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <div
        className={`border-2 rounded-lg p-12 ${borderStyle}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave = {handleDragLeave}
      >
        Drag and Drop
      </div>
    </div>
  );
}

DropZone.propTypes = {
    onDrop: PropTypes.func.isRequired,
  };
