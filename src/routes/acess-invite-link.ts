import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { env } from "../env";
import { acessInviteLink } from "../functions/acess-invite-link";

export const acessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/invites/:subscriberId",
		{
			schema: {
				summary: "Acess invite link and redirects user to the event",
				tags: ["referral"],
				description: "",
				params: z.object({
					subscriberId: z.string(),
				}),
				response: {
					302: z.null(),
				},
			},
		},
		async (request, reply) => {
			const { subscriberId } = request.params;
			await acessInviteLink({ subscriberId });
			const redirectUrl = new URL(env.FRONTEND_URL);
			redirectUrl.searchParams.set("referrer", subscriberId);
			//301 redirect permanente - brower faz cache
			//302 redirect temporario - browser nao faz cache
			return reply.redirect(redirectUrl.toString(), 302);
		},
	);
};
