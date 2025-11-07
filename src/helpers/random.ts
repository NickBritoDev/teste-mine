/* eslint-disable @typescript-eslint/no-explicit-any */
export const getRandomNumber = (min: number, max: number): any => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
