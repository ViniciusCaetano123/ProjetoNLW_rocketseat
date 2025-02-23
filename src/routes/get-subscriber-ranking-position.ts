import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getSubscriberRankingPosition } from "../functions/get-subscriber-ranking-position";

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod = async (
	app,
) => {
	app.get(
		"/subscribers/:subscriberId/ranking/position",
		{
			schema: {
				summary: "Get the subscriber's ranking position",
				tags: ["referral"],
				description: "",
				params: z.object({
					subscriberId: z.string(),
				}),
				response: {
					200: z.object({
						position: z.number().nullable(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { subscriberId } = request.params;
			const { position } = await getSubscriberRankingPosition({ subscriberId });
			return { position };
		},
	);
};
