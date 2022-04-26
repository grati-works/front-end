import { useState } from "react";
import Head from "next/head";
import styles from "./recoverPassword.module.scss";
import { Input } from "../../../components/Input";
import { Lock } from "react-iconly";
import { Button } from "../../../components/Button";
import { AuthRoutesProvider } from "../../../providers/AuthRoutesProvider";
import { useRouter } from "next/router";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

import { validatePassword } from "../../../utils/validator";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { token } = router.query;

  async function handleSubmit() {
    const passwordError = validatePassword(password);

    if (passwordError !== true) {
      setErrors({ ...passwordError });
      return;
    }

    setIsSubmitting(true);

    await api
      .post(`/password/reset?token=${token}`, {
        password,
      })
      .then((response) => {
        if (response.status === 202) {
          toast.success("Senha alterada com sucesso!");
          setIsSubmitting(false);

          router.push("/auth/signin");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
        toast.error("Erro ao resetar senha");
      });
  }

  return (
    <div className={styles.containerLogin}>
      <Head>
        <title>Grati | Alterar senha</title>
      </Head>
      <AuthRoutesProvider pageName="Recuperar senha">
        <div className={styles.inputs}>
          <Input
            Icon={Lock}
            placeholder="Nova senha"
            required
            password
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({});
            }}
            error={errors.password}
            color={errors.password ? "error" : "primary"}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>
        <Button
          isLoading={isSubmitting}
          className={styles.button}
          onPress={handleSubmit}
        >
          Alterar senha
        </Button>
      </AuthRoutesProvider>
    </div>
  );
}
