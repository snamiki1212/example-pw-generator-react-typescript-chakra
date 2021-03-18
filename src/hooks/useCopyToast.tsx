import React from "react";
import { useToast } from "@chakra-ui/react";

export const useCopyToast = (pw: string) => {
  const toast = useToast();
  const handle = React.useCallback(() => {
    navigator.clipboard
      .writeText(pw)
      .then(() => {
        toast({
          title: "Copied",
          status: "info",
          duration: 1_500,
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Can't copy",
          status: "error",
          duration: 1_500,
        });
      });
  }, [toast, pw]);
  return handle;
};
