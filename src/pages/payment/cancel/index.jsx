import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PaymentCancel() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
    toast.info("Pagamento cancelado!");
  }, []);
  
  return (
    <>
      <Head>
        <title>Grati | Pagamento cancelado</title>
      </Head>
    </>
  );
}
