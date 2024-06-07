import { ticketTypeNames } from './constants';

export type TicketTypeName = (typeof ticketTypeNames)[number];

export type InputParams = {
  eventName: string;
}

