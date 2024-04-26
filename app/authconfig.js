export const authConfig = {
  providers:[],
  pages: {
    signIn: "/login",
  },
  callbacks: {
      // async redirect(url, baseUrl) {
      //     if (url === "/api/auth/signin") {
      //       // Redirect to the dashboard
      //       console.log("jjjj");
      //       return Response.redirect(new URL("/dashboard", request.nextUrl));
      //     }
      //     return baseUrl;
      //   },
    authorized({ auth, request }) {
      
      const isLoggedIn = auth?.user;
      console.log({isLoggedIn});
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      console.log({isOnDashboard});
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      return true;
    },
  },
};