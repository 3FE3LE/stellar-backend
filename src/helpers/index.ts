import { RoomType, Rule, RuleType } from '@prisma/client';

export const getRuleValues = (arr: Rule[]): Record<string, number> => {
  return arr.reduce(
    (acc, rule) => {
      // Usamos RuleType[rule.ruleType] para obtener el nombre de la enum como clave
      acc[RuleType[rule.ruleType]] = rule.value;
      return acc;
    },
    {} as Record<string, number>,
  );
};
interface PriceCalculationParams {
  roomType: RoomType;
  checkInDate: Date;
  checkOutDate: Date;
  availabilityPercentage: number; // Availability as a percentage, e.g., 80 for 80%
  rules: Record<RuleType, number>;
}

export function calculateTotalPrice({
  roomType,
  checkInDate,
  checkOutDate,
  availabilityPercentage,
  rules,
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
      currentRate += currentRate * (rules.WEEKEND_INCREASE / 100); // 25% increase on weekends by default
    }

    totalPrice += currentRate;
  }

  // Apply rental days discount
  if (rentalDays >= 4 && rentalDays <= 6) {
    totalPrice -= rentalDays * rules.RENTAL_DAYS_DISCOUNT_LVL1; // $4 per day discount by default
  } else if (rentalDays >= 7 && rentalDays <= 9) {
    totalPrice -= rentalDays * rules.RENTAL_DAYS_DISCOUNT_LVL2; // $8 per day discount by default
  } else if (rentalDays >= 10) {
    totalPrice -= rentalDays * 12; // $12 per day discount
  }

  // Apply availability price increase
  if (availabilityPercentage < 20) {
    totalPrice += totalPrice * 0.15; // 15% increase
  } else if (availabilityPercentage >= 20 && availabilityPercentage < 40) {
    totalPrice += totalPrice * (rules.AVAILABILITY_INCREASE_LVL3 / 100); // 10% increase by default
  } else if (availabilityPercentage >= 40 && availabilityPercentage < 60) {
    totalPrice += totalPrice * (rules.AVAILABILITY_INCREASE_LVL2 / 100); // 5% increase by default
  } else if (availabilityPercentage >= 60 && availabilityPercentage < 80) {
    totalPrice += totalPrice * (rules.AVAILABILITY_INCREASE_LVL1 / 100); // 2% increase by default
  }

  return Math.round(totalPrice * 100) / 100; // Round to two decimal places
}
