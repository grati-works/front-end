import Head from "next/head";

import styles from "./paymentSuccess.module.scss";

export default function PaymentSuccess() {
  return (
    <>
      <Head>
        <title>Grati | Pagamento realizado com sucesso</title>
      </Head>
      <div className={styles.contentWrapper}>
        <h1>Pagamento realizado com sucesso!</h1>
        <p>
          Obrigado por contribuir com os serviços da Grati. Fique atento à sua
          caixa de entrada, pois você receberá um e-mail com as informações de
          pagamento.
        </p>
      </div>
    </>
  );
}
