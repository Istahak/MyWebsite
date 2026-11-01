"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import {
  Backdrop,
  PageHeader,
  PageShell,
  Tile,
  TileLabel,
} from "@/components/ui/Tile";

// `invert` marks black logos that need flipping on dark backgrounds.
const profiles = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/md-istahak-islam/",
    logo: "/icons/tech/linkedin.svg",
    note: "Professional networking and career discussions",
    invert: false,
  },
  {
    name: "GitHub",
    href: "https://github.com/Istahak",
    logo: "/icons/tech/github.svg",
    note: "Check out my code and open source contributions",
    invert: true,
  },
  {
    name: "Codeforces",
    href: "https://codeforces.com/profile/Istahak16",
    logo: "/icons/Codeforces.colored.svg",
    note: "Competitive programming discussions and mentoring",
    invert: false,
  },
];

const responseTimes = [
  { label: "Job Inquiries", time: "Within 24 hours" },
  { label: "General Questions", time: "1-2 business days" },
  { label: "Collaboration", time: "Within 48 hours" },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500";
const labelClass =
  "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        setError(
          "Please fill in all required fields (Name, Email, and Message)."
        );
        setIsSubmitting(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address.");
        setIsSubmitting(false);
        return;
      }

      // Send via Formspree
      const response = await fetch("https://formspree.io/f/xyzpqklg", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio Contact",
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError(
        `Failed to send message: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Please try contacting me directly at istahakislam@gmail.com`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <PageShell width="max-w-xl">
        <Tile className="items-center p-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/15">
            <svg
              className="h-7 w-7 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Message Sent Successfully!
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Thank you for reaching out! Your message has been sent directly to
            istahakislam@gmail.com. I&apos;ll get back to you as soon as possible.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Send Another Message
          </button>
        </Tile>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader label="Contact" title="Get In Touch" icon="mail">
        I&apos;m always open to discussing new opportunities, collaborations, or
        just having a chat about technology and competitive programming.
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Tile className="lg:col-span-2 lg:p-8">
          <TileLabel icon="send">Send a message</TileLabel>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Let&apos;s Connect
          </h2>
          <p className="mb-6 mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
            Whether you&apos;re a recruiter looking for a passionate developer, a
            fellow programmer wanting to collaborate, or someone interested in
            competitive programming, I&apos;d love to hear from you!
          </p>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/30 dark:bg-red-500/10">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3 min-w-0">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Error sending message
                  </h3>
                  <p className="mt-1 break-words text-sm text-red-700 dark:text-red-300">
                    {error}
                  </p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    type="button"
                    onClick={() => setError(null)}
                    aria-label="Dismiss error"
                    className="inline-flex text-red-400 hover:text-red-600 dark:text-red-300 dark:hover:text-red-100"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className={labelClass}>
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select a subject</option>
                <option value="job">Job Opportunity</option>
                <option value="collaboration">Collaboration</option>
                <option value="mentoring">Mentoring/Learning</option>
                <option value="general">General Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                placeholder="Tell me about your inquiry, project, or opportunity..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Icon name="send" className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            * Required fields. I typically respond within 24-48 hours.
          </p>
        </Tile>

        <div className="space-y-4">
          <Tile tint="sky">
            <Backdrop pattern="dots" glow="bg-sky-400/20 dark:bg-sky-500/15" />
            <TileLabel icon="mail">Email</TileLabel>
            <a
              href="mailto:istahakislam@gmail.com"
              className="mt-3 break-all text-lg font-semibold tracking-tight text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              istahakislam@gmail.com
            </a>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Best for job opportunities and formal inquiries
            </p>
          </Tile>

          <Tile>
            <TileLabel icon="globe">Elsewhere</TileLabel>
            <ul className="mt-3 space-y-1">
              {profiles.map((profile) => (
                <li key={profile.name}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mx-2 flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <Image
                      src={profile.logo}
                      alt=""
                      width={20}
                      height={20}
                      className={`h-5 w-5 shrink-0 ${profile.invert ? "dark:invert" : ""}`}
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                        {profile.name}
                        <span className="ml-1 text-gray-400">↗</span>
                      </span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">
                        {profile.note}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile>
            <TileLabel icon="clock">Response time</TileLabel>
            <dl className="mt-3 space-y-2 text-sm">
              {responseTimes.map((row) => (
                <div key={row.label} className="flex justify-between gap-4">
                  <dt className="text-gray-600 dark:text-gray-300">{row.label}</dt>
                  <dd className="text-right font-medium text-gray-900 dark:text-white">
                    {row.time}
                  </dd>
                </div>
              ))}
            </dl>
          </Tile>
        </div>
      </div>
    </PageShell>
  );
}
