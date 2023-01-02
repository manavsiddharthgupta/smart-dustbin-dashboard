const CoverageComponent = (props) => {
  return (
    <li onClick={props.onClick} className={props.className}>
      {props.children}
    </li>
  );
};
export default CoverageComponent;
