import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
	type ZodTypeProvider,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { acessInviteLinkRoute } from "./routes/acess-invite-link";
import { getRankingRoute } from "./routes/get-ranking";
import { getSubscriberInviteClicksRoute } from "./routes/get-subscriber-invite-click";
import { getSubscriberInviteCountRoute } from "./routes/get-subscriber-invite-count";
import { getSubscriberRankingPositionRoute } from "./routes/get-subscriber-ranking-position";
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: true,
});
app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "NWL Connect",
			version: "0.0.1",
		},
	},
	transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});
app.register(subscribeToEventRoute);
app.register(acessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInviteCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);
app.listen({ port: env.PORT }).then(() => {
	console.log("HTTP server running!");
});
