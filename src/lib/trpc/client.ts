import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "@/lib/trpc/trpc";

export const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: "http://localhost:3000/api/trpc" })],
  transformer: superjson,
});
