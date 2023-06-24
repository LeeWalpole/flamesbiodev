const listener = auth.onAuthStateChanged((user) => {
  // make sure the user provided a URL where to
  // redirect the users after they sign out
  const shouldLogOut = !user && whenSignedOut;

  // log user out if user is falsy
  // and if the consumer provided a route to redirect the user
  if (shouldLogOut) {
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
