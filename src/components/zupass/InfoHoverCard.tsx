import { CalendarIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface InfoHoverCardProps {
  ticketTypeName: string;
  eventId: string;
  productNames: string[];
}

export function InfoHoverCard({ ticketTypeName, eventId, productNames }: InfoHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <p className='font-bold flex items-center justify-center gap-1 h-6 rounded-md px-1.5 border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.05)] text-white cursor-pointer'>
          {ticketTypeName}
        </p>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Event ID</h4>
            <p className="text-sm">{eventId}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Attendees</h4>
            <ul className="list-disc list-inside">
              {productNames.map((name) => (
                <li key={name} className="text-sm">{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
