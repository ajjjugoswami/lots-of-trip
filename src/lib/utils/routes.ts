const OVERLAY_ROUTE_PATTERNS = [/^\/$/, /^\/destinations\/[^/]+$/];

export const isOverlayRoute = (pathname: string) => OVERLAY_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname));
