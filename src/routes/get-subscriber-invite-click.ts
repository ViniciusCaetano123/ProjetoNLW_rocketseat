import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getSubscriberInviteClick } from "../functions/get-subscriber-invite-click";

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod = async (
	app,
) => {
	app.get(
		"/subscribers/:subscriberId/ranking/clicks",
		{
			schema: {
				summary: "Get the number of clicks on the subscriber's invite link",
				tags: ["referral"],
				description: "",
				params: z.object({
					subscriberId: z.string(),
				}),
				response: {
					200: z.object({
						count: z.number(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { subscriberId } = request.params;
			const { count } = await getSubscriberInviteClick({ subscriberId });
			return { count };
		},
	);
};
