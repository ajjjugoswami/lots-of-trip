import { siteConfig } from "@/content/site";

export function buildWhatsAppLink(subject?: string) {
  const message = subject
    ? `Hi Lots of Trip! I'd like to know more about ${subject}.`
    : "Hi Lots of Trip! I'd like help planning a trip to the mountains.";
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
