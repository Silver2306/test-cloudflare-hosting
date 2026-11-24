export type FormData = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  college: string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;

// Basic email check: something@something.tld, no spaces.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Exactly 10 digits.
export const PHONE_RE = /^\d{10}$/;

export function validateForm(d: FormData): FormErrors {
  const e: FormErrors = {};
  const name = d.name.trim();
  if (name.length < 5 || name.split(/\s+/).length < 2)
    e.name = "Enter your full name (at least two words, 5+ characters).";
  if (!EMAIL_RE.test(d.email.trim())) e.email = "Enter a valid email address.";
  if (!PHONE_RE.test(d.phone.trim())) e.phone = "Phone must be exactly 10 digits.";
  if (!d.gender) e.gender = "Select a gender.";
  if (!d.college) e.college = "Select your college.";
  return e;
}
