"use client";

import React from "react";
import { MotionConfig } from "framer-motion";

export function RespectMotionPreferences({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
