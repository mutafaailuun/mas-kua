export const useWhatsApp = () => {
  const phoneNumber = "6287785587322"; // Ganti dengan nomor WhatsApp KUA yang sebenarnya

  const sendMessage = (message = "") => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}${
      message ? `?text=${encodedMessage}` : ""
    }`;
    window.open(whatsappUrl, "_blank");
  };

  const sendServiceInquiry = (service) => {
    const message = `Assalamualaikum, saya ingin bertanya tentang ${service}. Mohon informasinya.`;
    sendMessage(message);
  };

  return {
    sendMessage,
    sendServiceInquiry,
  };
};
