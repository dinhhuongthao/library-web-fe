import React from 'react';
import {
	List,
	ListItem,
	Divider,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Typography,
	Rating,
} from '@mui/material';

const Comment = ({ comments }) => {
	// comments = [
	// 	{
	// 		id: 1,
	// 		username: 'dht',
	// 		bookcode: 1,
	// 		body: 'good',
	// 		rating: 5,
	// 	},
	// 	{
	// 		id: 2,
	// 		username: 'dht',
	// 		bookcode: 1,
	// 		body: 'bad',
	// 		rating: 1,
	// 	},
	// ];

	return (
		<List>
			{comments
				.map((comment) => {
					console.log('Comment', comment);
					return (
						<React.Fragment key={comment.id}>
							<ListItem key={comment.id} alignItems="flex-start">
								<ListItemAvatar>
									{/* <Avatar alt="avatar" src={Faker.image.avatar()} /> */}
								</ListItemAvatar>
								<ListItemText
									primary={<Typography>{comment.username}</Typography>}
									secondary={comment.body}
								/>
								<Rating name="read-only" value={comment.rating} readOnly />
							</ListItem>
							<Divider />
						</React.Fragment>
					);
				})
				.reverse()}
		</List>
	);
};

export default Comment;
