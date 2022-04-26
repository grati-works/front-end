import Head from "next/head";
import styles from "./activateAccount.module.scss";
import { Input } from "../../../components/Input";
import { Lock } from "react-iconly";
import { Button } from "../../../components/Button";
import { Checkbox } from "@nextui-org/react";
import Link from "next/link";
import { AuthRoutesProvider } from "../../../providers/AuthRoutesProvider";
import { useRouter } from "next/router";

import { validatePassword } from "../../../utils/validator";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";

export default function FinishSignUp() {
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [userData, setUserData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn } = useAuth();
  const router = useRouter();
  const { temporary_password } = router.query;

  async function handleSubmit() {
    if (temporary_password) {
      if (userData.activated) {
        const passwordError = validatePassword(password);

        if (passwordError !== true) {
          setErrors({ ...passwordError });
          return;
        }

        if (password !== confirmPassword) {
          setErrors({ ...errors, confirmPassword: "As senhas não conferem" });
          return;
        }

        if (!checkboxIsChecked) {
          toast.error("Você precisa aceitar os termos de uso");
          return;
        }

        setIsSubmitting(true);

        await signIn(userData.email, temporary_password, false);

        await api
          .put(`/user`, {
            password: temporary_password,
            new_password: password,
          })
          .then((response) => {
            if (response.data.includes("User edited successfuly")) {
              toast.success("Cadastro finalizado com sucesso!");
              setIsSubmitting(false);

              router.push("/auth/signin");
            }
          })
          .catch((error) => {
            console.log(error);
            setIsSubmitting(false);
            toast.error("Erro ao finalizar cadastro");
          });
      } else {
        toast.error("Você precisa ativar sua conta antes de continuar");
      }
    } else {
      toast.error("Token inválido");
    }
  }

  useEffect(() => {
    async function loadUserByToken() {
      const { token } = router.query;
      if (token) {
        await api
          .get(`/user/by-token?token=${token}&type=organization_add_user`)
          .then((response) => {
            setUserData(response.data);
          })
          .catch((error) => {
            console.log(error);
            setIsSubmitting(false);
            router.push("/auth/signin");
            toast.error("Erro ao recuperar dados de finalização de cadastro");
          });
      }
    }

    loadUserByToken();
  }, [router.query]);

  return (
    <div className={styles.containerLogin}>
      <Head>
        <title>Grati | Finalizar Cadastro</title>
        <meta name="description" content="Finalizar Cadastro" />
        <meta property="og:title" content="Finalizar Cadastro" />
        <meta property="og:description" content="Finalizar Cadastro" />
        <meta
          property="og:url"
          content="https://grati.works/auth/finish_signup"
        />
        <meta property="og:type" content="website" />
      </Head>
      <AuthRoutesProvider pageName="Finalizar Cadastro">
        <div className={styles.inputs}>
          <Input
            Icon={Lock}
            placeholder="Senha Temporária"
            required
            password
            value={temporary_password}
            readOnly
          />
          <Input
            Icon={Lock}
            placeholder="Nova Senha"
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
          <Input
            Icon={Lock}
            placeholder="Confirmação de Senha"
            required
            password
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors({});
            }}
            error={errors.confirmPassword}
            color={errors.confirmPassword ? "error" : "primary"}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>
        <Checkbox size="sm" className={styles.checkbox}>
          Li e aceito a <Link href="#">politica de privacidade e proteção</Link>{" "}
          de dados e os <Link href="#">termos de uso</Link>.
        </Checkbox>
        <Button
          isLoading={isSubmitting}
          className={styles.button}
          onClick={handleSubmit}
        >
          Finalizar Cadastro
        </Button>
      </AuthRoutesProvider>
    </div>
  );
}
