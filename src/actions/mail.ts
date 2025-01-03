"use server";

import ThanksTemp from "emails/thanks";
import VerificationTemp from "emails/verification";
import { nanoid } from "nanoid";
import { resend } from "@/lib/server/resend";
import { type SendOTPProps, type SendWelcomeEmailProps } from "@/types";

export const sendWelcomeEmail = async ({
  toMail,
  userName,
}: SendWelcomeEmailProps) => {
  const subject = "Obrigado por usar Stips!";
  const temp = ThanksTemp({ userName });

  await resend.emails.send({
    from: `Stipss App <stipss.shop>`,
    to: toMail,
    subject: subject,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
    react: temp,
    text: "",
  });
};

export const sendOTP = async ({ toMail, code, userName }: SendOTPProps) => {
  const subject = "OTP para Stipss";
  const temp = VerificationTemp({ userName, code });

  await resend.emails.send({
    from: `Stipss App <stipss.shop>`,
    to: toMail,
    subject: subject,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
    react: temp,
    text: "",
  });
};
