import styles from "./styles.module.scss";

export function Skeleton({
  width,
  height,
  borderRadius = 10,
  repeat = 1,
  direction = "column",
}) {
  return (
    <div style={{ display: 'flex', flexDirection: direction, gap: 10 }}>
      {
        Array(repeat)
            .fill(0)
            .map((_, index) => (
                <div
                    key={index}
                    className={styles.skeleton}
                    style={{
                        width,
                        height,
                        borderRadius,
                    }}
                />
            ))
      }
    </div>
  );
}
