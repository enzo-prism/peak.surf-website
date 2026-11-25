import { track } from "@vercel/analytics";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { APP_STORE_URL, APP_VERSION } from "@/site";

type AppStoreLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  location: string;
};

const AppStoreLink = forwardRef<HTMLAnchorElement, AppStoreLinkProps>(
  ({ location, onClick, ...props }, ref) => (
    <a
      {...props}
      ref={ref}
      href={APP_STORE_URL}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        try {
          track("App Store Click", {
            location,
            version: APP_VERSION,
          });
        } catch {
          // Tracking is optional and must never interrupt App Store navigation.
        }
      }}
    />
  ),
);

AppStoreLink.displayName = "AppStoreLink";

export default AppStoreLink;
