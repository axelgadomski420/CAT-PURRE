import axios from 'axios';

class PaymentService {
  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL;
  }

  // 💳 STRIPE Payment
  async createStripePayment(amount, currency = 'PLN') {
    const response = await axios.post(`${this.apiUrl}/api/payments/stripe/create`, {
      amount,
      currency
    });
    return response.data;
  }

  // 🇵🇱 BLIK Payment (Polski system)
  async createBlikPayment(amount, blikCode) {
    const response = await axios.post(`${this.apiUrl}/api/payments/blik/create`, {
      amount,
      code: blikCode
    });
    return response.data;
  }

  // 🏦 Przelew tradycyjny
  async createBankTransfer(amount, catId) {
    const response = await axios.post(`${this.apiUrl}/api/payments/transfer/create`, {
      amount,
      catId
    });
    return response.data;
  }

  // 💰 Crypto Payment (BTC, ETH)
  async createCryptoPayment(amount, cryptocurrency) {
    const response = await axios.post(`${this.apiUrl}/api/payments/crypto/create`, {
      amount,
      currency: cryptocurrency
    });
    return response.data;
  }

  // 📊 Raty - PayU Installments
  async createInstallmentPayment(amount, installments) {
    const response = await axios.post(`${this.apiUrl}/api/payments/installments/create`, {
      amount,
      installments
    });
    return response.data;
  }

  // 🔒 Escrow - środki w depozycie
  async createEscrowPayment(amount, catId, buyerId, sellerId) {
    const response = await axios.post(`${this.apiUrl}/api/payments/escrow/create`, {
      amount,
      catId,
      buyerId,
      sellerId
    });
    return response.data;
  }

  // ✅ Potwierdzenie płatności
  async confirmPayment(paymentId) {
    const response = await axios.post(`${this.apiUrl}/api/payments/confirm`, {
      paymentId
    });
    return response.data;
  }

  // 🔄 Zwrot pieniędzy
  async refundPayment(paymentId, reason) {
    const response = await axios.post(`${this.apiUrl}/api/payments/refund`, {
      paymentId,
      reason
    });
    return response.data;
  }

  // 📊 Historia płatności
  async getPaymentHistory(userId) {
    const response = await axios.get(`${this.apiUrl}/api/payments/history/${userId}`);
    return response.data;
  }
}

export default new PaymentService();
