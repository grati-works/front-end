import Head from "next/head";
import styles from "./landingPage.module.scss";
import { Button } from "../components/Button";
import Link from "next/link";
import { stripe, getStripeJs } from "../services/stripe";
import { useAuth } from "../hooks/useAuth";
import Router from "next/router";
import { api } from "../services/api";
import { useState } from "react";

export default function Home({ products }) {
  const { user } = useAuth();
  const [planDuration, setPlanDuration] = useState("monthly");

  async function handleSubscribe(price_id) {
    if (!user) {
      Router.push("/auth/signin");
      return;
    }

    try {
      const response = await api.post("payment", {
        price_id,
      });

      const { id: sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  return (
    <>
      <Head>
        <title>Grati</title>
        <meta
          name="description"
          content="Adote feedbacks em sua organização!"
        />
        <meta property="og:title" content="Grati" />
        <meta
          property="og:description"
          content="Adote feedbacks em sua organização!"
        />
        <meta property="og:url" content="https://grati.works/" />
        <meta property="og:type" content="website" />
      </Head>
      <main className={styles.landingPageWrapper}>
        <img
          src="/images/circle.png"
          alt="circle1"
          className={styles.circle1}
        />
        <img
          src="/images/circle.png"
          alt="circle2"
          className={styles.circle2}
        />
        <img
          src="/images/circle.png"
          alt="circle3"
          className={styles.circle3}
        />

        <div className={styles.mainSectionContainer}>
          <h1>
            Adote <span>feedbacks</span> em sua organização
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci dui
            sed amet elementum, nunc augue mauris gravida ultrices.
          </p>
          <div className={styles.adquireButtons}>
            <Link href="">
              <img src="/images/app_store.png" alt="appStore" />
            </Link>
            <Link href="">
              <img src="/images/google_play.png" alt="googlePlay" />
            </Link>
          </div>
          <img
            src="/images/mockups.png"
            alt="Aplicativos mobile"
            className={styles.mockups}
          />
        </div>

        <div id="about" className={styles.aboutSectionContainer}>
          <h2>Sobre nós</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor sem
            odio ut viverra mi quam. Vitae fames porttitor arcu tempor vulputate
            proin. Vitae erat a, vitae a amet vestibulum. Diam a etiam ipsum
            quis auctor massa. Lacinia at amet facilisi mattis massa placerat.
            Adipiscing id libero, placerat egestas. Sit amet, morbi viverra in
            cras amet non quam. Habitant maecenas mattis fermentum id. Pretium
            pretium maecenas maecenas elit facilisi. Turpis suscipit interdum
            proin curabitur vulputate. Placerat duis nunc molestie dui mi.
            Velit, aliquam cum faucibus at maecenas at auctor ut in. Neque urna
            cum ultrices vitae odio etiam quam sed nunc. Felis rhoncus at
            gravida condimentum viverra quis id bibendum sollicitudin.
          </p>
        </div>

        <div className={styles.plansSectionContainer}>
          <h2>Planos</h2>
          <p className={styles.plansSectionContainer2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor sem
            odio ut viverra mi quam.
          </p>
          <div className={styles.planFilter}>
            <button
              className={planDuration === "monthly" ? styles.active : ""}
              onClick={() => setPlanDuration("monthly")}
            >
              Planos Mensais
            </button>
            <button
              className={planDuration === "semesterly" ? styles.active : ""}
              onClick={() => setPlanDuration("semesterly")}
            >
              Planos Semestrais
            </button>
            <button
              className={planDuration === "yearly" ? styles.active : ""}
              onClick={() => setPlanDuration("yearly")}
            >
              Planos Anuais
            </button>
          </div>
          <div className={styles.planList}>
            {products[planDuration].map((product) => (
              <div id="plans" className={styles.plan}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className={styles.planPrice}>
                  {product.amount}
                  <span>/mês</span>
                </div>
                <Button onClick={() => handleSubscribe(product.priceId)}>
                  Adquirir plano
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const prices = await stripe.prices.list({
    active: true,
  });
  const test = await stripe.products.list({
    active: true,
  });

  const products = prices.data
    .sort((a, b) => a.unit_amount - b.unit_amount)
    .map((price) => {
      const product = test.data.find((product) => product.id == price.product);
      return {
        priceId: price.id,
        amount: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        name: product.name,
        description: product.description,
      };
    });

  const groupedProducts = products.reduce(
    (acc, product) => {
      if (product.name.includes("Mensal")) {
        acc.monthly.push(product);
      } else if (product.name.includes("Semestral")) {
        acc.semesterly.push(product);
      } else {
        acc.yearly.push(product);
      }
      return acc;
    },
    { monthly: [], semesterly: [], yearly: [] }
  );

  return {
    props: {
      products: groupedProducts,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
