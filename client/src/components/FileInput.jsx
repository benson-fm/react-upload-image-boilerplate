import PropTypes from 'prop-types';

export default function FileInput({ onFileChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileChange(file);
  };

  return <input type="file" onChange={handleFileChange} />;
}

FileInput.propTypes = {
  onFileChange: PropTypes.func.isRequired,
};
