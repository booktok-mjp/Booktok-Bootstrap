import './CustomHeader.css';

const CustomHeader = ({ text, size = 'md', color = '#fff' }) => {
  return (
    <h2 className={`custom-header ${size}`} style={{ color }}>
      {text}
    </h2>
  );
};

export default CustomHeader;
