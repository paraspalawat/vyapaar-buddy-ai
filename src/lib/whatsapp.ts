// WhatsApp sharing utilities

export function createWhatsAppShareLink(message: string, phoneNumber?: string): string {
  const encodedMessage = encodeURIComponent(message);
  
  if (phoneNumber) {
    // Remove any non-digit characters and ensure it starts with country code
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  }
  
  // Share to anyone (opens WhatsApp with pre-filled message)
  return `https://wa.me/?text=${encodedMessage}`;
}

export function createWhatsAppBroadcastLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  // Opens WhatsApp web with the message pre-filled
  return `https://web.whatsapp.com/send?text=${encodedMessage}`;
}

export function openWhatsAppShare(message: string) {
  const link = createWhatsAppShareLink(message);
  window.open(link, '_blank');
}

export function formatCampaignMessage(
  template: {
    name: string;
    preview: string;
  },
  shopName: string,
  customMessage?: string
): string {
  const message = customMessage || template.preview;
  return `${message}\n\n📍 ${shopName}\n\n_Sent via Bharat Vyapaar AI_`;
}

// Template messages for common campaign types
export const campaignTemplates = {
  festival: (shopName: string, discount: string = '20%') => 
    `🎉 *Festival Sale at ${shopName}!*\n\nGet *${discount} OFF* on all products!\n\nLimited time offer - Shop now!\n\n📍 Visit us today!`,
  
  daily: (shopName: string, product: string = 'all items') =>
    `🛒 *Today's Special at ${shopName}*\n\nFresh ${product} at lowest prices!\n\nOrder now before stock runs out!\n\n📞 WhatsApp us to order`,
  
  newArrival: (shopName: string, product: string = 'products') =>
    `✨ *New Arrivals at ${shopName}!*\n\nCheck out our latest ${product}!\n\nPremium quality, best prices.\n\n🛍️ Visit us today!`,
  
  discount: (shopName: string, discount: string = '30%') =>
    `💰 *Limited Time Offer!*\n\nUp to *${discount} OFF* at ${shopName}!\n\nHurry, while stocks last!\n\n📱 Order on WhatsApp`,
};
