import { Colors } from '../../config';
import './CustomHeader.css';

const CustomHeader = ({
  text,
  size = 'md',
  color = Colors.brunswickGreen,
  isPacifico = false,
  alignLeft = false,
}) => {
  return (
    <h2
      className={`custom-header ${size} ${
        isPacifico ? 'pacifico-regular' : 'source-sans-3-bold'
      } ${alignLeft && 'alignLeft'}`}
      style={{ color }}
    >
      {text}
    </h2>
  );
};

export default CustomHeader;
