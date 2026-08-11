import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const GOLD = "#D9822B";
const GRAPHITE = "#2A2D31";
const IVORY = "#FAF8F4";
const MUTED = "#6B7280";
const BORDER = "#E7E2D8";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml({
  firstName,
  lastName,
  email,
  company,
  subject,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}) {
  const safe = {
    firstName: escapeHtml(firstName),
    lastName: escapeHtml(lastName),
    email: escapeHtml(email),
    company: company ? escapeHtml(company) : null,
    subject: escapeHtml(subject),
    message: escapeHtml(message).replace(/\n/g, "<br/>"),
  };

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${MUTED};letter-spacing:0.06em;text-transform:uppercase;width:130px;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${GRAPHITE};vertical-align:top;">
        ${value}
      </td>
    </tr>`;

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Inquiry</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F3F1EC;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F1EC;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

            <!-- Header -->
            <tr>
              <td style="background-color:${GRAPHITE};padding:32px 40px;">
                <p style="margin:0;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:${GOLD};font-weight:600;">
                  Strategy &bull; Capital &bull; Transformation
                </p>
                <h1 style="margin:8px 0 0;font-size:22px;color:${IVORY};font-weight:700;letter-spacing:0.04em;">
                  VISWAAS
                </h1>
              </td>
            </tr>

            <!-- Gold accent line -->
            <tr>
              <td style="height:3px;background:linear-gradient(90deg, ${GOLD}, #B7964A);"></td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px 40px 8px;">
                <p style="margin:0 0 4px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${GOLD};font-weight:700;">
                  New Website Inquiry
                </p>
                <h2 style="margin:4px 0 24px;font-size:20px;color:${GRAPHITE};font-weight:700;">
                  ${safe.firstName} ${safe.lastName} wants to talk
                </h2>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                  ${row("Name", `${safe.firstName} ${safe.lastName}`)}
                  ${row("Email", `<a href="mailto:${safe.email}" style="color:${GRAPHITE};text-decoration:underline;">${safe.email}</a>`)}
                  ${row("Subject", safe.subject)}
                  ${safe.company ? row("Company", safe.company) : ""}
                </table>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:8px 40px 36px;">
                <p style="margin:0 0 10px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};font-weight:600;">
                  Message
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF8F4;border-left:3px solid ${GOLD};border-radius:8px;">
                  <tr>
                    <td style="padding:18px 20px;font-size:15px;line-height:1.6;color:${GRAPHITE};">
                      ${safe.message}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding:0 40px 40px;">
                <a href="mailto:${safe.email}" style="display:inline-block;background-color:${GOLD};color:#1A1C20;text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:999px;">
                  Reply to ${safe.firstName} &#8594;
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#F9F7F2;padding:20px 40px;border-top:1px solid ${BORDER};">
                <p style="margin:0;font-size:12px;color:${MUTED};">
                  This inquiry was submitted through the VISWAAS website contact form.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildEmailText({
  firstName,
  lastName,
  email,
  company,
  subject,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}) {
  return [
    "NEW WEBSITE INQUIRY — VISWAAS",
    "",
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    company ? `Company: ${company}` : null,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, company, subject, message } =
      await req.json();

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Viswaas Consulting Group <onboarding@resend.dev>",
      to: ["vcg@viswaas.com"],
      subject: `${subject} — Inquiry from ${firstName} ${lastName}`,
      html: buildEmailHtml({ firstName, lastName, email, company, subject, message }),
      text: buildEmailText({ firstName, lastName, email, company, subject, message }),
    });

    if (error) {
      console.error("Resend Error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to send email",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Server Error:", err);

    return NextResponse.json(
      {
        success: false,
        error: String(err),
      },
      { status: 500 }
    );
  }
}