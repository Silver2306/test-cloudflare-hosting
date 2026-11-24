"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { COLLEGES, GENDERS } from "@/content/options";
import { validateForm, type FormData, type FormErrors } from "@/lib/validate";
import { buildPayload } from "@/lib/payload";

const empty: FormData = { name: "", email: "", phone: "", gender: "", college: "" };

const field =
  "mt-1 w-full rounded border border-zinc-300 bg-transparent px-3 py-3 dark:border-zinc-700";

export default function QrForm() {
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [qr, setQr] = useState<string | null>(null);

  const set =
    (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm({ ...form, [k]: e.target.value });
      setQr(null); // editing hides the QR; generate again
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateForm(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setQr(null);
      return;
    }
    setQr(await QRCode.toDataURL(buildPayload(form), { width: 320, margin: 2, errorCorrectionLevel: "H" }));
  }

  const err = (k: keyof FormData) =>
    errors[k] && <span className="mt-1 block text-red-600">{errors[k]}</span>;

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <label className="block text-sm">
          Name
          <input className={field} autoComplete="name" value={form.name} onChange={set("name")} />
          {err("name")}
        </label>
        <label className="block text-sm">
          Email
          <input type="email" autoComplete="email" className={field} value={form.email} onChange={set("email")} />
          {err("email")}
        </label>
        <label className="block text-sm">
          Phone
          <input type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} className={field} value={form.phone} onChange={set("phone")} />
          {err("phone")}
        </label>
        <label className="block text-sm">
          Gender
          <select className={field} value={form.gender} onChange={set("gender")}>
            <option value="">Select…</option>
            {GENDERS.map((g) => <option key={g}>{g}</option>)}
          </select>
          {err("gender")}
        </label>
        <label className="block text-sm">
          College
          <select className={field} value={form.college} onChange={set("college")}>
            <option value="">Select…</option>
            {COLLEGES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {err("college")}
        </label>
        <button className="rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700">
          Generate QR
        </button>
      </form>

      <div className="flex flex-col items-center justify-start gap-3">
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
