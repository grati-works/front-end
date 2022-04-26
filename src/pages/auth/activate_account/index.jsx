import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";

export default function ActivateAccount() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    async function activateAccount() {
      await api
        .post(`/account/activate?token=${token}`)
        .then((response) => {
          if (response.data.includes("Account activated successfully")) {
            router.push("/auth/signin");
            toast.success("Conta ativada com sucesso!");
          }
        })
        .catch((error) => {
          console.log(error);
          router.push("/auth/signin");
          toast.error("Erro ao ativar conta");
        });
    }

    activateAccount();
  }, []);

  return (
    <div>
      <Head>
        <title>Grati | Ativação de conta</title>
        <meta name="description" content="Ativar conta" />
        <meta property="og:title" content="Ativação de conta" />
        <meta property="og:description" content="Ativar conta" />
        <meta
          property="og:url"
          content="https://grati.works/auth/activate_account"
        />
        <meta property="og:type" content="website" />
      </Head>
    </div>
  );
}
