import { getRequestConfig } from "next-intl/server";
import { locale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: string | undefined = await requestLocale;

  if (!locale || !routing.locales.includes(locale as locale)) {
    locale = routing.defaultLocale;
  }

  const messagesModule = await import(`../messages/${locale}.json`);
  const messages = messagesModule.default;

  return {
    locale,
    messages
  };
});
