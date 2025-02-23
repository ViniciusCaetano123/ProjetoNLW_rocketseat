import { eq } from "drizzle-orm";
import { db } from "../drizzle/cliente";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";
interface SubscribeToEventInput {
	name: string;
	email: string;
	referrerId?: string | null;
}

export async function subscribeToEvent({
	name,
	email,
	referrerId,
}: SubscribeToEventInput) {
	const subscribers = await db
		.select()
		.from(subscriptions)
		.where(eq(subscriptions.email, email));

	if (subscribers.length > 0) {
		return {
			subscribeId: subscribers[0].id,
		};
	}
	const result = await db
		.insert(subscriptions)
		.values({
			name,
			email,
		})
		.returning();
	if (referrerId) {
		await redis.zincrby("referral:raking", 1, referrerId);
	}

	const [subscriber] = result;
	return {
		subscribeId: subscriber.id,
	};
}
