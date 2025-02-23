import { redis } from "../redis/client";

interface GetSubscriberInviteClickInput {
	subscriberId: string;
}

export async function getSubscriberInviteClick({
	subscriberId,
}: GetSubscriberInviteClickInput) {
	const count = await redis.hget("referral:access-count", subscriberId);
	return {
		count: count ? Number(count) : 0,
	};
}
