"use client";

import { useEffect, useState } from "react";
import { products } from "@/lib/products";
import { CONTACT } from "@/lib/site";

const ROLES = ["Homeowner", "Builder / Contractor", "Dealer / Distributor", "Other"];
const NOT_SURE = "Not sure yet";

const EMPTY = { name: "", phone: "", email: "", city: "", role: ROLES[0], product: NOT_SURE, message: "" };

/**
 * There is no mail server behind the site yet, so sending opens the visitor's
 * email app with the message already written, addressed to SBM GOLD.
 */
export default function ContactForm({ topic }: { topic?: "partner" }) {
  const [form, setForm] = useState(
    topic === "partner" ? { ...EMPTY, role: "Dealer / Distributor" } : EMPTY,
  );
  const [isPartner, setIsPartner] = useState(topic === "partner");
  const [sent, setSent] = useState(false);

  // Links from product pages and partner buttons pre-fill the form
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = products.find((p) => p.slug === params.get("product"));
    const partner = topic === "partner" || params.get("topic") === "partner";
    setIsPartner(partner);
    setForm((prev) => ({
      ...prev,
      product: product ? product.name : prev.product,
      role: partner ? "Dealer / Distributor" : prev.role,
    }));
  }, [topic]);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `${isPartner ? "Partner inquiry" : "Website inquiry"}: ${form.product} (${form.name})`;
    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      ...(form.email ? [`Email: ${form.email}`] : []),
      ...(form.city ? [`City: ${form.city}`] : []),
      `I am a: ${form.role}`,
      `Product: ${form.product}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="contact_form" onSubmit={handleSubmit}>
      <div className="contact_form--grid">
        <label className="field">
          <span>
            Name <em aria-hidden="true">*</em>
          </span>
          <input name="name" type="text" autoComplete="name" required value={form.name} onChange={update} />
        </label>
        <label className="field">
          <span>
            Phone <em aria-hidden="true">*</em>
          </span>
          <input name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={update} />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={update} />
        </label>
        <label className="field">
          <span>City</span>
          <input name="city" type="text" autoComplete="address-level2" value={form.city} onChange={update} />
        </label>
        <label className="field">
          <span>I am a</span>
          <select name="role" value={form.role} onChange={update}>
            {ROLES.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Product</span>
          <select name="product" value={form.product} onChange={update}>
            <option>{NOT_SURE}</option>
            {products.map((p) => (
              <option key={p.slug}>{p.name}</option>
            ))}
          </select>
        </label>
        <label className="field field-full">
          <span>
            Message <em aria-hidden="true">*</em>
          </span>
          <textarea name="message" rows={5} required value={form.message} onChange={update} />
        </label>
      </div>

      <button type="submit" className="contact_form--submit">
        Send Inquiry
      </button>
      <p className="contact_form--note" role="status">
        {sent ? (
          <>
            Your email app should now be open with your message ready to send. If it didn&rsquo;t open, write to us at{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
            <a href={CONTACT.tollFreeHref}>{CONTACT.tollFree}</a>.
          </>
        ) : (
          "Sending opens your email app with this message ready to go."
        )}
      </p>
    </form>
  );
}
