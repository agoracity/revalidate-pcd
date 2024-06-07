import { ZuAuthArgs, authenticate, zuAuthPopup } from "@pcd/zuauth";
import { TicketTypeName } from "./types";
import { whitelistedTickets } from "@/config/zupass-config";
import { useLoadingStore } from "@/store/store";

async function login(eventName: string | null) {
  const setLoading = useLoadingStore.getState().setLoading;

  const bigIntNonce = 12345n;
  const watermark = bigIntNonce.toString();

  // Ensure the tickets are formatted correctly 
  const config = Object.entries(whitelistedTickets)
    .flatMap(([ticketType, tickets]) =>
      tickets
        .filter(ticket => ticket.eventName === eventName) // Filter by eventName
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
          return null;
        })
        .filter((ticket): ticket is NonNullable<typeof ticket> => ticket !== null)
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
  };

  setLoading(true); // Set loading to true

  try {
    const result = await zuAuthPopup(args);
    if (result.type === "pcd") {
      const pcd = await authenticate(result.pcdStr, watermark, config);
      console.log("Got PCD data: ", pcd.claim.partialTicket);
    }
  } catch (e) {
    console.log("Authentication failed: ", e);
  } finally {
    setLoading(false); // Set loading to false
  }
}

export function useZupass(): {
  login: (eventName: string | null) => Promise<void>;
} {
  return { login };
}
