import { useEffect } from "react";
import { useAuth, useSigninCheck } from "reactfire";

const AuthRedirectListener: React.FCC<{
  whenSignedOut?: string;
}> = ({ children, whenSignedOut }) => {
  const auth = useAuth();
  const { status } = useSigninCheck();

  useEffect(() => {
    // this should run once and only on success
    if (status !== "success") {
      return;
    }

    // keep this running for the whole session
    // unless the component was unmounted, for example, on log-outs
    const listener = auth.onAuthStateChanged((user) => {
      const shouldLogOut = !user && whenSignedOut;

      // log user out if user is falsy
      // and if the consumer provided a route to redirect the user
      if (shouldLogOut) {
        clearFirestoreCache();

        const currentPath = window.location.pathname;
        const isNotCurrentPage = currentPath !== whenSignedOut;

        const navigateToSignOutPage = () => {
          window.location.assign(whenSignedOut);
        };

        // we then redirect the user to the page
        // specified in the props of the component
        if (isNotCurrentPage) {
          navigateToSignOutPage();
        }
      }
    });

    // destroy listener on un-mounts
    return () => listener();
  }, [auth, status, whenSignedOut]);

  return <>{children}</>;
};

export default function GuardedPage({
  children,
  whenSignedOut,
}: React.PropsWithChildren<{
  whenSignedOut?: string;
}>) {
  const shouldActivateListener = isBrowser();

  // we only activate the listener if
  // we are rendering in the browser
  if (!shouldActivateListener) {
    return <>{children}</>;
  }

  return (
    <AuthRedirectListener whenSignedOut={whenSignedOut}>
      {children}
    </AuthRedirectListener>
  );
}
