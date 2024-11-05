import './CustomGrid.css';

const CustomGrid = ({ items }) => {
  return (
    <div className="custom-grid">
      {items && items.map((item) => <div key={item.id}>{item}</div>)}
    </div>
  );
};

export default CustomGrid;
