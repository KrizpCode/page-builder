import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const siteRouter = router({
  getByUserId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const site = await ctx.prisma.site.findFirst({
        where: {
          userId: input,
        },
      });

      return site;
    }),
});
