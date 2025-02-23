import { redis } from "../redis/client";

interface GetSubscriberInviteCountInput {
	subscriberId: string;
}

export async function getSubscriberInviteCount({
	subscriberId,
}: GetSubscriberInviteCountInput) {
	const count = await redis.zscore("referral:raking", subscriberId);
	return {
		count: count ? Number(count) : 0,
	};
}
