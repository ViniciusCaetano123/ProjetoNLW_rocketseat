import { redis } from "../redis/client";

interface AcessInviteLinkInput {
	subscriberId: string;
}

export async function acessInviteLink({ subscriberId }: AcessInviteLinkInput) {
	await redis.hincrby("referral:access-count", subscriberId, 1);
}
