"use client";

import {
  Hydrate as HydrationBoundary,
  HydrateProps,
} from "@tanstack/react-query";
import React from "react";

export default function Hydrate(props: HydrateProps) {
  return <HydrationBoundary {...props} />;
}
