import {
  forgetPasswordSnippet,
  PassKeySnippet,
  remeberMeSnippet,
} from "./templ";

export const commentMap: Record<string, string> = {
  socialProviders: `socialProviders: {}`,
  forgetPassword: forgetPasswordSnippet,
  comment: '<div className="comment-placeholder"></div>',
  rememberMe: remeberMeSnippet,
  empty: `// newLine`,
  newLine: `
 \n
 \n
  `,
  passKey: PassKeySnippet,
  github: `
      github: {
           clientId: process.env.GITHUB_CLIENT_ID!,
           clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      },
  `,
  google: `
      google: {
           clientId: process.env.GOOGLE_CLIENT_ID!,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
  `,
  facebook: `
      facebook: {
           clientId: process.env.FACEBOOK_CLIENT_ID!,
           clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      },
  `,
  twitch: `
      twitch: {
           clientId: process.env.TWITCH_CLIENT_ID!,
           clientSecret: process.env.TWITCH_CLIENT_SECRET!,
       },
  `,
  twitter: `
      twitter: {
           clientId: process.env.TWITTER_CLIENT_ID!,
           clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      },
    `,
  apple: `
        apple: {
             clientId: process.env.APPLE_CLIENT_ID!,
             clientSecret: process.env.APPLE_CLIENT_SECRET!,
         },
    `,
  microsoft: `
      microsoft: {
            clientId: process.env.MICROSOFT_CLIENT_ID!,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      },
      `,
  discord: `
       discord: {
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      },
      `,
};
export const routeMap = {
  forgetPassword: "/app/forget-password/page.tsx",
  resetassword: "/app/reset-password/page.tsx",
};
