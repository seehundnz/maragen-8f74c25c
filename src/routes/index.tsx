import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/call/$type", params: { type: "mayday" } });
  },
  component: () => null,
});
