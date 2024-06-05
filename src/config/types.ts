import { ticketTypeNames } from './constants';

export type TicketTypeName = (typeof ticketTypeNames)[number];

export type InputParams = {
  sso: string;
  sig: string;
  nonce: string;
  return_sso_url: string;
}

