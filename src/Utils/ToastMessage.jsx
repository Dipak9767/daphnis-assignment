import { useToast } from "@chakra-ui/react"

export const ToastMessage = () => {
  const toast = useToast();
  const toastMessage = (msg) => {
    let message;
    let status;
    if (msg.status === 200) {
      message = msg.message;
      status = 'success';
    } else {
      message = msg.message;
      status = 'error';
    }
    toast({
      title: status,
      description: message,
      status: status,
      duration: 1000,
      isClosable: true,
    })
  }
  return { toastMessage };
}