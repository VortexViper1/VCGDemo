import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, company, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "VISWAS CONSULTING GROUP<onboarding@resend.dev>",
      to: ["satyaganesh2617@gmail.com"],
      subject: `New Inquiry from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "-"}</p>

        <hr/>

        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);

      return NextResponse.json(
        {
          success: false,
          error,
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