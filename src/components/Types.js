const Types = ({ types }) => {
  return (
    <ul className="types">
      {types.map(({ type }) => (
        <li
          key={`type-${type.name}`}
          className={`types__item types__item--${type.name}`}
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
};

export default Types;
