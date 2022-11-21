import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const siteRouter = router({
  getSite: protectedProcedure.query(async ({ ctx }) => {
    const site = await ctx.prisma.site.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        pages: true,
      },
    });

    return site;
  }),
  create: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const site = await ctx.prisma.site.create({
        data: {
          name: input,
          userId: ctx.session.user.id,
        },
        include: {
          pages: true,
        },
      });

      const pages = await ctx.prisma.page.create({
        data: {
          name: "Landing Page",
          siteId: site.id,
        },
      });

      const siteWithPages = { ...site, pages: [...site.pages, pages] };

      return siteWithPages;
    }),
});
