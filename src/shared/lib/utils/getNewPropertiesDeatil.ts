import { TPropertyDetail, TPropertyDetailDTO } from '@/shared/model/types'

export function getNewProperties(
  current: string[],
  options: TPropertyDetailDTO[]
): string[] {
  const existing = new Set(options.map(opt => opt.property));
  return current.filter(prop => !existing.has(prop));
}