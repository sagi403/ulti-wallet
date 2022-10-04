import { Form } from "react-bootstrap";

const FormFieldPartial = ({ label, type, placeholder, value, onChange }) => {
  return (
    <Form.Group className="mb-3" controlId={`formBasic${value}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default FormFieldPartial;
