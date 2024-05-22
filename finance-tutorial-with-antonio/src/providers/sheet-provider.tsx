"use client";
import React from "react";
import NewAccountSheet from "@/features/accounts/components/new-account-sheet";
import EditAccountSheet from "@/features/accounts/components/edit-account-sheet";
import { useMountedState } from "react-use";

/**
 * Provider for all the sheets in the app.
 */
const SheetProvider = () => {
  // client side only
  const isMounted = useMountedState();
  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
};

export default SheetProvider;
