export const TargetIcon = () => {
  const style = {
    fill: 'currentColor',
    stroke: 'none',
    maxWidth: '18px',
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={style}>
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
};

export default TargetIcon;
