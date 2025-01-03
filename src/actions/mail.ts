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
  const subject = "Obrigado por usar Stipss!";
  
  try {
    const temp = ThanksTemp({ userName });

    if (!temp) {
      throw new Error("O template de e-mail de boas-vindas está vazio.");
    }

    await resend.emails.send({
      from: `Stipss App <noreply@stipss.shop>`, // Use um e-mail válido
      to: toMail,
      subject,
      headers: {
        "X-Entity-Ref-ID": nanoid(),
      },
      react: temp,
      text: `Olá ${userName}, obrigado por usar Stipss!`,
    });

    console.log("E-mail de boas-vindas enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar o e-mail de boas-vindas:", error);
  }
};

export const sendOTP = async ({ toMail, code, userName }: SendOTPProps) => {
  const subject = "Stipss - Código de verificação";

  try {
    const temp = VerificationTemp({ userName, code });

    if (!temp) {
      throw new Error("O template de e-mail de OTP está vazio.");
    }

    await resend.emails.send({
      from: `Stipss App <noreply@stipss.shop>`, // Use um e-mail válido
      to: toMail,
      subject,
      headers: {
        "X-Entity-Ref-ID": nanoid(),
      },
      react: temp,
      text: `Olá ${userName}, seu código OTP é: ${code}`,
    });

    console.log("E-mail de OTP enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar o e-mail de OTP:", error);
  }
};
