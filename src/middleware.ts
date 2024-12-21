import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr", "pt"], // Idiomas disponíveis
  defaultLocale: "pt",         // Idioma padrão
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redireciona para "/pt" se o usuário estiver na raiz ("/")
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/pt";
    return NextResponse.redirect(url);
  }

  // Aplica a lógica de internacionalização para outras rotas
  return I18nMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
