import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ThanksTemplateProps {
  userName: string;
}

const ThanksTemp: React.FC<Readonly<ThanksTemplateProps>> = ({ userName }) => (
  <Html>
    <Head />
    <Preview>Bem-vindo ao Stipss.</Preview>
    <Tailwind>
      <Body className="bg-gray-100">
        <Container className="mx-auto my-10 bg-white">
          <Section className="m-6">
            <Text className="mx-10 text-lg font-bold">Olá {userName} 👋 ,</Text>
            <Text className="mx-10 text-base">
              Agora você pode construir e gerenciar sua coleção de links de
              forma simples e organizada. Categorize, compartilhe e acesse seus
              links favoritos sempre que precisar, tudo em um só lugar.
              Experimente e descubra como o Stipss pode facilitar sua vida! 🌐✨
            </Text>
            <Text className="mx-10 text-base font-light">Melhor,</Text>
            <Text className="mx-10 text-base font-bold">Stipss</Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ThanksTemp;
