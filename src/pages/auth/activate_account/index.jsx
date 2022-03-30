import Head from "next/head";
import styles from "./activateAccount.module.scss";
import { Input } from "../../../components/Input";
import { Lock } from "react-iconly";
import { Button } from "../../../components/Button";
import { Checkbox } from "@nextui-org/react";
import Link from "next/link";
import { AuthRoutesProvider } from "../../../providers/AuthRoutesProvider";
import { useRouter } from "next/router";

export default function ActivateAccount() {
  const router = useRouter();
  const { token, temporary_password } = router.query;

  function handleSubmit() {
    console.log("SUBMIT Recover password");
  }

  return (
    <div className={styles.containerLogin}>
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
      <AuthRoutesProvider pageName="Ativação de conta">
        <div className={styles.inputs}>
          <Input
            Icon={Lock}
            placeholder="Senha Temporária"
            required
            password
            value={temporary_password}
          />
          <Input Icon={Lock} placeholder="Senha" required password />
          <Input
            Icon={Lock}
            placeholder="Confirmação de Senha"
            required
            password
          />
        </div>
        <Checkbox size="sm" className={styles.checkbox}>
          Li e aceito a <Link href="#">politica de privacidade e proteção</Link>{" "}
          de dados e os <Link href="#">termos de uso</Link>.
        </Checkbox>
        <Button className={styles.button}>Ativar conta</Button>
      </AuthRoutesProvider>
    </div>
  );
}
