import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";

const IntrnetConnectionProvider = ({ children }) => {
  const toast = useToast();
  const toastIdRef = useRef();
  const dispatch = useDispatch();

  function close() {
    toast.closeAll(toastIdRef.current);
  }

  function addToast() {
    toastIdRef.current = toast({
      title: "you'r offline",
      discrption: "Please make sure you have internet conaction",
      status: "warning",
      duration: null,
      isClosable: true,
      // icon:<BsWifiOff size={20}/>
    });
  }
  const setOnline = () => {
    dispatch(networkMode(true))
    close()
  };


  const setOffline = () => {
    dispatch(networkMode(false))

    addToast();
  };
  useEffect(() => {


    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);



  return children;
};

export default IntrnetConnectionProvider;
