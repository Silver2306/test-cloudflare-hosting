"use client";

import { useState } from "react";
import QRCode from "qrcode";

const empty = { name: "", email: "", phone: "", college: "", gender: "", year: "" };

const field =
  "mt-1 w-full rounded border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-700";

export default function QrForm() {
  const [form, setForm] = useState(empty);
  const [qr, setQr] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof empty) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const text = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      `College: ${form.college}`,
      form.year && `Year: ${form.year}`,
      form.gender && `Gender: ${form.gender}`,
    ]
      .filter(Boolean)
      .join("\n");
    try {
      setQr(await QRCode.toDataURL(text, { width: 320, margin: 2 }));
    } catch {
      setError("Too much text for a QR code. Shorten your answers.");
      setQr(null);
    }
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm">
          Name *
          <input required className={field} value={form.name} onChange={set("name")} />
        </label>
        <label className="block text-sm">
          Email *
          <input required type="email" className={field} value={form.email} onChange={set("email")} />
        </label>
        <label className="block text-sm">
          Phone
          <input type="tel" className={field} value={form.phone} onChange={set("phone")} />
        </label>
        <label className="block text-sm">
          College *
          <input required className={field} value={form.college} onChange={set("college")} />
        </label>
        <label className="block text-sm">
          Year of study
          <input className={field} value={form.year} onChange={set("year")} />
        </label>
        <label className="block text-sm">
          Gender
          <select className={field} value={form.gender} onChange={set("gender")}>
            <option value="">Prefer not to say</option>
            <option>Female</option>
            <option>Male</option>
            <option>Non-binary</option>
            <option>Other</option>
          </select>
        </label>
        <div className="flex gap-3">
          <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Generate QR
          </button>
          <button
            type="button"
            className="rounded border border-zinc-300 px-4 py-2 dark:border-zinc-700"
            onClick={() => {
              setForm(empty);
              setQr(null);
              setError(null);
            }}
          >
            Reset
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center justify-start gap-3">
        {error && <p className="text-sm text-red-600">{error}</p>}
        {qr ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qr} alt="Generated QR code" width={320} height={320} className="rounded bg-white" />
            <a href={qr} download="qr-code.png" className="text-sm text-blue-600 hover:underline">
              Download PNG
            </a>
          </>
        ) : (
          <p className="text-sm text-zinc-500">Your QR code will appear here.</p>
        )}
      </div>
    </div>
  );
}
