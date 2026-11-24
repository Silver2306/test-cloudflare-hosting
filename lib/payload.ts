import type { FormData } from "./validate";

// Placeholder payload (our choice, not last year's): plain JSON of the form data.
export function buildPayload(d: FormData): string {
  return JSON.stringify({
    name: d.name.trim(),
    email: d.email.trim(),
    phone: d.phone.trim(),
    gender: d.gender,
    college: d.college,
  });
}
