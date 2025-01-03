import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://stipss.vercel.app/pt/";

interface VerificationTemplateProps {
  userName: string;
  code: string;
}

const VerificationTemp: React.FC<Readonly<VerificationTemplateProps>> = ({
  userName = "X",
  code = "46590",
}) => (
  <Html>
    <Head />
    <Preview>Verifique seu e-mail</Preview>
    <Tailwind>
      <Body className="bg-gray-100">
        <Container className="m-10 mx-auto bg-white p-6">
          <Text className="mb-4 text-lg">
            Tudo bem? {userName.split(" ")[0]}
          </Text>
          <Text className="mb-2 text-center text-xl font-bold text-orange-600">
            Uhuu, seu código chegou! 🎉
          </Text>
          <Text className="text-center text-base font-semibold">
            Aqui está o seu código de verificação.
          </Text>
          <Section className="mt-4 text-center">
            <div className="inline-block px-6 py-3 text-xl font-bold tracking-[10px] text-slate-900">
              {code}
            </div>
            <Text className="mt-2.5 text-sm">
              Este código expira em 3 minutos e só pode ser usado uma vez.
            </Text>
          </Section>
          <Text className="mt-8 text-base">
            Best,
            <br />
            <span className="font-bold">Stipss</span>
          </Text>
          <Section className="mt-4 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
            <Text className="mb-2">
              Precisa de ajuda? Acesse nossa central de suporte.
            </Text>
            <Text>
              🌐{" "}
              <a
                href="https://stipss.vercel.app/pt/"
                className="text-blue-600 underline"
              >
                stipss.vercel.app
              </a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default VerificationTemp;
