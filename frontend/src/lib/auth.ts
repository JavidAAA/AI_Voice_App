import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { Polar } from "@polar-sh/sdk";

import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth";
import { env } from '~/env';
import { db } from '~/server/db';

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },

   plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "c0590765-eac9-4c0b-99d2-fc8f98920eba",
              slug: "small",
            },
            {
              productId: "78276150-2dd9-437b-8fe9-8671df481b66",
              slug: "medium",
            },
            {
              productId: "0f81ee54-c80a-4907-9592-073b0b606af4",
              slug: "large",
            },
          ],
          successUrl: "/dashboard",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;

            if (!externalCustomerId) {
              console.error("No external customer ID found.");
              throw new Error("No external customer id found.");
            }

            const productId = order.data.productId;

            let creditsToAdd = 0;

            switch (productId) {
              case "c0590765-eac9-4c0b-99d2-fc8f98920eba":
                creditsToAdd = 50;
                break;
              case "78276150-2dd9-437b-8fe9-8671df481b66":
                creditsToAdd = 200;
                break;
              case "0f81ee54-c80a-4907-9592-073b0b606af4":
                creditsToAdd = 400;
                break;
            }

            await db.user.update({
              where: { id: externalCustomerId },
              data: {
                credits: {
                  increment: creditsToAdd,
                },
              },
            });
          },
        }),
      ],
    }),
  ],
});
