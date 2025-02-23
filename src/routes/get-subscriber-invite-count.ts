import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getSubscriberInviteCount } from "../functions/get-subscriber-invite-count";

export const getSubscriberInviteCountRoute: FastifyPluginAsyncZod = async (
	app,
) => {
	app.get(
		"/subscribers/:subscriberId/ranking/count",
		{
			schema: {
				summary: "Get the number of clicks on the subscriber's count link",
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
			const { count } = await getSubscriberInviteCount({ subscriberId });
			return { count };
		},
	);
};
