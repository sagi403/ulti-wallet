import { Form } from "react-bootstrap";

const FormFieldPartial = ({
  label,
  type,
  controlId,
  placeholder,
  value,
  onChange,
  messages,
}) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isInvalid={messages}
      />

      {messages &&
        messages.map((msg, idx) => (
          <Form.Control.Feedback type="invalid" key={idx}>
            {msg}
          </Form.Control.Feedback>
        ))}
    </Form.Group>
  );
};

export default FormFieldPartial;
