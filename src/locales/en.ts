export default {
  header: {
    inicio: "Início",
    payment: "Pagamento", 
    login: "Login",
    settings:"Configuração",
    dashboard: "Dashboard",
  },
  hero: {
    top: "Meu Template",
    main: "Meu template.com",
    sub: "Gerencie, controle e conduza seus objetivos",
    firstButton: "Entrar",
    tools: "Construído usando ótimas ferramentas",
    on: "on",
  },
  features: {
    top: "Features",
    details:
      "This template comes with features like Authentication, API routes, File uploading and more in Next.js App dir.",
    libs: {
      nextjs:
        "App dir, Routing, Layouts, API routes, Server Components, Server actions.",
      tailwindcss:
        "UI components built using Radix UI and styled with Tailwind CSS.",
      postgres: "Using Postgres with Prisma ORM, hosted on Vercel Postgres.",
      lucia: "Authentication and Authorization using LuciaAuth v3.",
      uploadthing: "Upload and preview files effortlessly with UploadThing.",
      reactEmail: "Create emails using React Email and Send with Resend.",
      internationalization:
        "Internationalization support with type-safe Next-International.",
      stripe: "Receive and process payments with Stripe.",
      vercel: "Production and Preview deployments with Vercel.",
    },
    aboutMd: "ChadNext also includes Changelog & About page built using.",
  },
  notFound: {
    title: "Page Not Found!",
  },
} as const;
