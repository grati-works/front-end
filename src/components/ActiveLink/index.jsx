import Link from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement } from 'react';

export function ActiveLink({ children, activeClassname, ...rest }) {
    const { asPath } = useRouter();

    const className = asPath === rest.href ? activeClassname : '';

    return (
        <Link href={rest.href} {...rest}>
            {cloneElement(children, {
                className,
            })}
        </Link>
    );
}