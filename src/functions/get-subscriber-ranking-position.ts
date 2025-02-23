import { redis } from "../redis/client";

interface GetSubscriberRankingPositionInput {
	subscriberId: string;
}

export async function getSubscriberRankingPosition({
	subscriberId,
}: GetSubscriberRankingPositionInput) {
	const rank = await redis.zrevrank("referral:raking", subscriberId);

	if (rank === null) {
		return { position: null };
	}
	return {
		position: rank + 1,
	};
}
