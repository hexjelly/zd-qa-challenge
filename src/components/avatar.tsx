export type AvatarProps = {
	image: string;
	name: string;
	email: string;
};

export function Avatar({ email, image, name }: AvatarProps) {
	return (
		<div className="flex items-center gap-3">
			<img
				className="w-8 h-8 rounded-full object-cover"
				src={image}
				alt={name}
				onError={(e) => {
					(e.target as HTMLImageElement).src = "/placeholder-avatar.svg";
				}}
			/>
			<div className="text-sm">
				<div className="font-medium">{name}</div>
				<div className="text-sm text-ds-subtle">{email}</div>
			</div>
		</div>
	);
}
