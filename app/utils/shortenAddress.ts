import { Address } from 'wagmi';

export function shortenAddress(address: Address): string {
  const start = address.slice(0, 4);
  const end = address.slice(-3);
  return `${start}...${end}`;
}