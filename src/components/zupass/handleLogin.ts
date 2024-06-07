import { ZuAuthArgs, authenticate, zuAuthPopup } from "@pcd/zuauth";
import { InputParams, TicketTypeName } from "./types";
import { whitelistedTickets } from "@/config/zupass-config";

async function login(inputParams: InputParams | null) {

  const bigIntNonce = 12345n
  const watermark = bigIntNonce.toString();

  // Ensure the tickets are formatted correctly
  const config = Object.entries(whitelistedTickets).flatMap(
    ([ticketType, tickets]) =>
      tickets
        .map((ticket) => {
          if (ticket.eventId && ticket.productId) {
            return {
              pcdType: "eddsa-ticket-pcd" as const,
              ticketType: ticketType as TicketTypeName,
              eventId: ticket.eventId,
              productId: ticket.productId,
              eventName: ticket.eventName || "",
              productName: ticket.productName || "",
              publicKey: ticket.publicKey
            };
          }
          console.error("Invalid ticket format:", ticket);
          return null;
        })
        .filter(
          (ticket): ticket is NonNullable<typeof ticket> => ticket !== null
        )
  );

  const args: ZuAuthArgs = {
    fieldsToReveal: {
      revealAttendeeEmail: true,
      revealAttendeeName: true,
      revealEventId: true,
      revealProductId: true
    },
    watermark,
    config,
    proofTitle: "Sign-In with Zupass",
    proofDescription: "**Select a valid ticket to hop into the zuzaverse.**"
  };

  const result = await zuAuthPopup(args);
  if (result.type === "pcd") {
    try {
      const pcd = await authenticate(result.pcdStr, watermark, config);
      console.log("Got PCD data: ", pcd.claim.partialTicket);
    } catch (e) {
      console.log("Authentication failed: ", e);
    }
  }
}

export function useZupass(): {
  login: (params: InputParams | null) => Promise<void>;
} {
  return { login };
}
