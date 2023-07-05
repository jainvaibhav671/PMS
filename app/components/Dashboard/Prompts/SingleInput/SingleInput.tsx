import "./SingleInput.css";
export default function SingleInput({
  type,
  name,
  onSubmit,
}: {
  type: string;
  name: string;
  onSubmit: (value: FormData) => void;
}) {
  const inputs = type
    .split(" ")
    .map((t, key) => <input key={key} type={t} name={`${name}-${t}`} />);

  return (
    <form id="single-input" action={onSubmit}>
      {inputs}
      <div>
        <button className="primary-button">Submit</button>
      </div>
    </form>
  );
}
