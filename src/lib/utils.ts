import {ROUTE_PATHS} from "@/routes/route.config"

export const getRoutePath = (path: keyof typeof ROUTE_PATHS) => {
    return ROUTE_PATHS[path] ?? "#";
}