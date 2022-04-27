import Head from "next/head";
import { useState, useEffect } from "react";

import styles from "./paymentSuccess.module.scss";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function PaymentSuccess() {
  const { push } = useRouter();
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(interval);
        push("/");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <>
      <Head>
        <title>Grati | Pagamento realizado com sucesso</title>
      </Head>
      <div className={styles.contentWrapper}>
        <Image src="/images/payment_illustration.svg" />
        <h1>Pagamento realizado com sucesso!</h1>
        <h2>
          Obrigado por contribuir com os serviços da Grati. Fique atento à sua
          caixa de entrada, pois você receberá um e-mail com as informações de
          pagamento.
        </h2>
        <p>
          Você será redirecionado em: <span>{timer}s</span>
        </p>
      </div>
    </>
  );
}
