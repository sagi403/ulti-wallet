import { Form } from "react-bootstrap";

const FormFieldPartial = ({
  label,
  type,
  controlId,
  placeholder,
  value,
  onChange,
  message,
}) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isInvalid={message}
      />
      <Form.Control.Feedback type="invalid">{message}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormFieldPartial;
