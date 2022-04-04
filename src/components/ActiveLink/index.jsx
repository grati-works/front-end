import Link from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement } from 'react';
import { Tooltip } from '@nextui-org/react';

export function ActiveLink({ children, activeClassname, tooltip, placement = "right", ...rest }) {
    const { asPath } = useRouter();

    const className = asPath.split('/')[1] === rest.href.split('/')[1] ? activeClassname : '';

    return (
        <>
            {
                tooltip ?
                    <Tooltip content={tooltip} placement={placement}>
                        <Link href={rest.href} {...rest}>
                            {cloneElement(children, {
                                className,
                            })}
                        </Link>
                    </Tooltip>
                    :
                    <Link href={rest.href} {...rest}>
                        {cloneElement(children, {
                            className,
                        })}
                    </Link>
            }
        </>
    );
}