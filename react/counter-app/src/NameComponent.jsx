import PropTypes from "prop-types";

// Componente funcional que recibe props
export const NameComponent = (props) => {
  return (
    <>
      <p>{props.name}</p>
      <p>{props.lastName}</p>
      <p>{props.age}</p>
    </>
  );
};

/// PropTypes validation, son muy importantes para validar los tipos de datos que se pasan a los componentes
NameComponent.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

// Default props, son los valores por defecto que se le asignan a las props
NameComponent.defaultProps = {
  name: "John",
  lastName: "Doe",
  age: 18,
};
