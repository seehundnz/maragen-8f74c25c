import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { sitemapStaticPaths, sitemapXML, sitemapPathForLocation, isSitemapRouteIncluded, type SitemapEntry } from "@/lib/sitemap";
import { CALL_TYPES } from "@/lib/types";

const BASE_URL = "https://app.maragen.de";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        const callRouteId = "/call/$type";
        if (isSitemapRouteIncluded(router.routesById[callRouteId])) {
          for (const type of CALL_TYPES) {
            const location = router.buildLocation({
              to: "/call/$type",
              params: { type },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, callRouteId);
            if (path) entries.push({ path });
          }
        }

        if (entries.length === 0)
          return new Response(null, { status: 404, headers: { "Cache-Control": "no-store" } });
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
