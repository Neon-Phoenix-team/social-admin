// src/shared/lib/withAdminGuard.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useReactiveVar } from '@apollo/client/react';
import { isAdminVar } from '@/shared/api/client';

export function withAdminGuard<P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> {
    const ProtectedComponent: React.FC<P> = (props) => {
        const router = useRouter();
        const isAdmin = useReactiveVar(isAdminVar);

        useEffect(() => {
            if (!isAdmin) {
                router.replace('/');
            }
        }, [isAdmin, router]);

        if (!isAdmin) return null;

        return <WrappedComponent {...props} />;
    };

    ProtectedComponent.displayName = `withAdminGuard(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ProtectedComponent;
}
