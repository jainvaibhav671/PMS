"use client";
import { FormEvent } from "react";

export function Form({
  handleSubmit,
}: {
  handleSubmit: (e: FormData) => void;
}) {
  return (
    <form id="signup" action={handleSubmit}>
      {/* <InputGroup name="name" type="text" label="Name" /> */}
      <InputGroup name="email" type="email" label="Email" />

      <InputGroup name="password" type="password" label="Password" />

      <button type="submit">Join Now</button>
    </form>
  );
}
export function InputGroup({
  name,
  type,
  label,
}: {
  name: string;
  type: string;
  label: string;
}) {
  return (
    <div className="input">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} />
    </div>
  );
}
