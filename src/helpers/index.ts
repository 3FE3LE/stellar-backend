export function calculateTotalPrice(
  roomBasePrice: number,
  checkIn: Date,
  checkOut: Date,
  availablePercentage: number,
): number {
  let totalPrice = 0;
  const dayInMillis = 24 * 60 * 60 * 1000;
  const days = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / dayInMillis,
  );

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(checkIn.getTime() + i * dayInMillis);
    let dailyPrice = roomBasePrice;

    // Incremento de precio si es fin de semana
    if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
      // Sábado o Domingo
      dailyPrice *= 1.25;
    }

    // Descuentos por duración de la estancia
    if (days >= 4 && days <= 6) {
      dailyPrice -= 4;
    } else if (days >= 7 && days <= 9) {
      dailyPrice -= 8;
    } else if (days >= 10) {
      dailyPrice -= 12;
    }

    // Incremento por disponibilidad
    if (availablePercentage >= 20 && availablePercentage < 40) {
      dailyPrice *= 1.1;
    } else if (availablePercentage >= 40 && availablePercentage < 60) {
      dailyPrice *= 1.05;
    } else if (availablePercentage >= 60 && availablePercentage < 80) {
      dailyPrice *= 1.02;
    }

    totalPrice += dailyPrice;
  }

  return totalPrice;
}
