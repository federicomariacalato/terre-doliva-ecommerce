export function simulatePayment(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() >= 0.2;
      if (isSuccess) {
        resolve();
      } else {
        reject(new Error("L' ordine NON è stato inviato"));
      }
    }, 1500);
  });
}
