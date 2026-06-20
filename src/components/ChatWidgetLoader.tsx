
    "use client";

    import { useEffect } from "react";

    interface ChatWidgetLoaderProps {
      provider?: "livechat";
    }

    export function ChatWidgetLoader({ provider = "livechat" }: ChatWidgetLoaderProps) {
      useEffect(() => {
        if (provider !== "livechat") return;
        const license = process.env.NEXT_PUBLIC_LIVECHAT_LICENSE_ID;
        if (!license || typeof window === "undefined") return;
        if (document.getElementById("livechat-script")) return;

        const s = document.createElement("script");
        s.id = "livechat-script";
        s.async = true;
        s.src = `https://cdn.livechatinc.com/tracking.js`;
        s.onload = () => {
          // @ts-expect-error LC_API is loaded from an external script
          if (window.LC_API) {
            // @ts-expect-error LC_API is loaded from an external script
            window.LC_API.on_after_load = function() {};
          }
        };
        document.body.appendChild(s);
        // @ts-expect-error __lc is a global from an external script
        window.__lc = window.__lc || {};
        // @ts-expect-error __lc is a global from an external script
        window.__lc.license = Number(license);

        return () => {
          s.remove();
        };
      }, [provider]);

      return null;
    }
  
