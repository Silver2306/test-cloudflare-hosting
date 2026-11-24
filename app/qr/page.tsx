import QrForm from "./QrForm";

export const metadata = { title: "QR Generator" };

export default function QrPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">QR code generator</h1>
      <p className="mt-2 mb-6 text-zinc-600 dark:text-zinc-400">
        Fill in your details and generate a QR code. Everything happens in your
        browser; nothing is sent to a server.
      </p>
      <QrForm />
    </>
  );
}
