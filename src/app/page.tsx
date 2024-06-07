"use client"
import React from 'react';
import ZupassButton from "@/components/zupass/ZupassButton";
import { whitelistedTickets } from "@/config/zupass-config";
import { InfoHoverCard } from '@/components/zupass/InfoHoverCard';
import { RippleLoader } from '@/components/zupass/RippleLoader';
import { useLoadingStore } from "@/store/store";

export default function Home() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <main className="flex min-h-screen flex-col p-10 bg-zupass-bg-dark-primary items-center text-center">
      {isLoading ? (
        <RippleLoader />
      ) : (
        <>
          <div>
            <h1 className="text-zupass-accent-dark text-4xl uppercase">Revalidate ZuPass credentials</h1>
            <h2 className="text-white mt-6"><a href="#">Contact for support</a></h2>
          </div>

          <section className="mt-4 w-full flex flex-col">
            {Object.entries(whitelistedTickets).map(([ticketTypeName, tickets]) => {
              const productNames = tickets.map(ticket => ticket.productName).filter(name => name !== undefined) as string[];
              
              return (
                <div key={ticketTypeName} className="mb-4 flex flex-col gap-6 max-w-3xl w-full mx-auto">
                  {/* Displaying one card for each group */}
                  <div className="rounded-lg border border-solid border-zupass-primary-lite p-2 px-4 gap-4 text-white flex items-center justify-between">
                    <div className='text-start'>
                      <InfoHoverCard 
                        ticketTypeName={ticketTypeName}
                        eventId={tickets[0].eventId} 
                        productNames={productNames} 
                      />
                    </div>
                    <div className="flex items-center flex-col">
                      <ZupassButton eventName={tickets[0].eventName || 'Unknown Event'}>Validate</ZupassButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </>
      )}
    </main>
  );
}
