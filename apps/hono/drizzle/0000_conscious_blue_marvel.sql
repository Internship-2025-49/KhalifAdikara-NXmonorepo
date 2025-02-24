CREATE TABLE `auth` (
	`key` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`phone` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
