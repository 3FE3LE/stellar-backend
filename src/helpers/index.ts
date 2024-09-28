import { RoomType } from '@prisma/client';

interface PriceCalculationParams {
  roomType: RoomType;
  checkInDate: Date;
  checkOutDate: Date;
  availabilityPercentage: number; // Availability as a percentage, e.g., 80 for 80%
}

export function calculateTotalPrice({
  roomType,
  checkInDate,
  checkOutDate,
  availabilityPercentage,
}: PriceCalculationParams): number {
  const baseRate = roomType.basePrice;
  let totalPrice = 0;

  // Helper to check if a date is weekend
  const isWeekend = (date: Date): boolean => {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    return day === 0 || day === 6;
  };

  // Calculate number of days
  const dayInMilliseconds = 1000 * 60 * 60 * 24;
  const rentalDays = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / dayInMilliseconds,
  );

  // Apply base rate and weekend increase
  for (let i = 0; i < rentalDays; i++) {
    const currentDate = new Date(checkInDate);
    currentDate.setDate(checkInDate.getDate() + i);
    let currentRate = baseRate;

    if (isWeekend(currentDate)) {
      currentRate += currentRate * 0.25; // 25% increase on weekends
    }

    totalPrice += currentRate;
  }

  // Apply rental days discount
  if (rentalDays >= 4 && rentalDays <= 6) {
    totalPrice -= rentalDays * 4; // $4 per day discount
  } else if (rentalDays >= 7 && rentalDays <= 9) {
    totalPrice -= rentalDays * 8; // $8 per day discount
  } else if (rentalDays >= 10) {
    totalPrice -= rentalDays * 12; // $12 per day discount
  }

  // Apply availability price increase
  if (availabilityPercentage < 20) {
    totalPrice += totalPrice * 0.15; // 15% increase
  } else if (availabilityPercentage >= 20 && availabilityPercentage < 40) {
    totalPrice += totalPrice * 0.1; // 10% increase
  } else if (availabilityPercentage >= 40 && availabilityPercentage < 60) {
    totalPrice += totalPrice * 0.05; // 5% increase
  } else if (availabilityPercentage >= 60 && availabilityPercentage < 80) {
    totalPrice += totalPrice * 0.02; // 2% increase
  }

  return Math.round(totalPrice * 100) / 100; // Round to two decimal places
}
